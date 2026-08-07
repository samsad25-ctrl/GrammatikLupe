const PARSER_VOCABULARY =
  Object.freeze({
    articles: [
      "der",
      "die",
      "das",
      "den",
      "dem",
      "des",

      "ein",
      "eine",
      "einen",
      "einem",
      "einer",
      "eines",

      "kein",
      "keine",
      "keinen",
      "keinem",
      "keiner",
      "keines",

      "mein",
      "meine",
      "meinen",
      "meinem",
      "meiner",
      "meines",

      "dein",
      "deine",
      "deinen",
      "deinem",
      "deiner",
      "deines",

      "sein",
      "seine",
      "seinen",
      "seinem",
      "seiner",
      "seines",

      "ihr",
      "ihre",
      "ihren",
      "ihrem",
      "ihrer",
      "ihres",

      "unser",
      "unsere",
      "unseren",
      "unserem",
      "unserer",
      "unseres",

      "euer",
      "eure",
      "euren",
      "eurem",
      "eurer",
      "eures"
    ],

    prepositions: [
      "an",
      "auf",
      "aus",
      "bei",
      "durch",
      "für",
      "gegen",
      "gegenüber",
      "hinter",
      "in",
      "mit",
      "nach",
      "neben",
      "ohne",
      "seit",
      "über",
      "um",
      "unter",
      "von",
      "vor",
      "zu",
      "zwischen"
    ],

    conjunctions: [
      "aber",
      "denn",
      "oder",
      "sondern",
      "und"
    ],

    subordinatingConjunctions: [
      "als",
      "bevor",
      "bis",
      "da",
      "damit",
      "dass",
      "falls",
      "nachdem",
      "ob",
      "obwohl",
      "seitdem",
      "sobald",
      "solange",
      "während",
      "weil",
      "wenn"
    ]
  });

function tokenizeText(text) {
  const matches = [
    ...text.matchAll(
      /\p{L}+(?:['’-]\p{L}+)*|\d+|[.,!?;:]/gu
    )
  ];

  let sentenceIndex = 0;

  return matches.map(
    (match, index) => {
      const value =
        match[0];

      const token = {
        value,

        lower:
          value.toLowerCase(),

        index,

        sentenceIndex,

        characterStart:
          match.index,

        characterEnd:
          match.index +
          value.length
      };

      if (
        value === "." ||
        value === "!" ||
        value === "?"
      ) {
        sentenceIndex++;
      }

      return token;
    }
  );
}

function splitIntoSentences(text) {
  return text
    .split(
      /(?<=[.!?])\s+/u
    )
    .map(
      sentence =>
        sentence.trim()
    )
    .filter(Boolean);
}

function createObservation(
  type,
  token,
  details = {}
) {
  return {
    type,

    token:
      token
        ? token.value
        : null,

    tokenIndex:
      token
        ? token.index
        : null,

    sentenceIndex:
      token
        ? token.sentenceIndex
        : null,

    characterStart:
      token
        ? token.characterStart
        : null,

    characterEnd:
      token
        ? token.characterEnd
        : null,

    details
  };
}

function parseText(text) {
  const tokens =
    tokenizeText(text);

  const sentences =
    splitIntoSentences(text);

  const observations = [];

  /*
   * Grundbeobachtungen
   */
  tokens.forEach(token => {
    if (
      /^[\p{L}\d]/u.test(
        token.value
      )
    ) {
      observations.push(
        createObservation(
          OBS.WORD_FOUND,
          token
        )
      );
    }

    if (
      PARSER_VOCABULARY.articles.includes(
        token.lower
      )
    ) {
      observations.push(
        createObservation(
          OBS.ARTICLE_FOUND,
          token
        )
      );
    }

    if (
      PARSER_VOCABULARY.prepositions.includes(
        token.lower
      )
    ) {
      observations.push(
        createObservation(
          OBS.PREPOSITION_FOUND,
          token
        )
      );
    }

    if (
      PARSER_VOCABULARY.conjunctions.includes(
        token.lower
      )
    ) {
      observations.push(
        createObservation(
          OBS.CONJUNCTION_FOUND,
          token
        )
      );
    }

    if (
      PARSER_VOCABULARY
        .subordinatingConjunctions
        .includes(
          token.lower
        )
    ) {
      observations.push(
        createObservation(
          OBS.SUBORDINATING_CONJUNCTION_FOUND,
          token
        )
      );

      observations.push(
        createObservation(
          OBS.SUBORDINATE_CLAUSE_FOUND,
          token
        )
      );
    }
  });

  /*
   * Präposition + Artikel
   */
  tokens.forEach(
    (token, index) => {
      const nextToken =
        tokens[index + 1];

      const tokenAfterNext =
        tokens[index + 2];

      if (!nextToken) {
        return;
      }

      if (
        token.sentenceIndex !==
        nextToken.sentenceIndex
      ) {
        return;
      }

      if (
        PARSER_VOCABULARY
          .prepositions
          .includes(
            token.lower
          ) &&
        PARSER_VOCABULARY
          .articles
          .includes(
            nextToken.lower
          )
      ) {
        observations.push(
          createObservation(
            OBS.PREPOSITION_ARTICLE_PATTERN,
            token,
            {
              values: [
                token.value,
                nextToken.value
              ]
            }
          )
        );
      }

      /*
       * Präposition + Artikel +
       * wahrscheinlich grossgeschriebenes Nomen
       */
      if (
        tokenAfterNext &&
        token.sentenceIndex ===
          tokenAfterNext.sentenceIndex &&
        PARSER_VOCABULARY
          .prepositions
          .includes(
            token.lower
          ) &&
        PARSER_VOCABULARY
          .articles
          .includes(
            nextToken.lower
          ) &&
        /^[A-ZÄÖÜ]/u.test(
          tokenAfterNext.value
        )
      ) {
        observations.push(
          createObservation(
            OBS.PREPOSITION_ARTICLE_NOUN_PATTERN,
            token,
            {
              values: [
                token.value,
                nextToken.value,
                tokenAfterNext.value
              ]
            }
          )
        );
      }
    }
  );

  /*
   * Regelmodule
   */
  const caseObservations =
    applyCaseRules(
      text,
      tokens
    );

  observations.push(
    ...caseObservations
  );

  const twoWayObservations =
    applyTwoWayPrepositionRules(
      text,
      tokens
    );

  observations.push(
    ...twoWayObservations
  );

  return {
    text,

    tokens,

    observations,

    statistics: {
      wordCount:
        tokens.filter(
          token =>
            /^[\p{L}\d]/u.test(
              token.value
            )
        ).length,

      sentenceCount:
        sentences.length,

      observationCount:
        observations.length
    },

    structures: {
      sentences
    }
  };
}