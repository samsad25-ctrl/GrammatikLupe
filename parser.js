const PARSER_VOCABULARY = Object.freeze({
  articles: [
    "der", "die", "das", "den", "dem", "des",
    "ein", "eine", "einen", "einem", "einer", "eines",
    "kein", "keine", "keinen", "keinem", "keiner", "keines"
  ],

  pronouns: [
    "ich", "du", "er", "sie", "es", "wir", "ihr",
    "mich", "dich", "ihn", "uns", "euch",
    "mir", "dir", "ihm", "ihnen"
  ],

  prepositions: [
    "an", "auf", "aus", "bei", "durch", "für",
    "gegen", "hinter", "in", "mit", "nach", "neben",
    "ohne", "über", "um", "unter", "von", "vor",
    "zu", "zwischen", "seit", "während", "wegen"
  ],

  conjunctions: [
    "aber", "denn", "oder", "sondern", "und",
    "deshalb", "darum", "trotzdem", "danach"
  ],

  subordinatingConjunctions: [
    "als", "bevor", "bis", "da", "damit", "dass",
    "falls", "nachdem", "ob", "obwohl", "seitdem",
    "sobald", "solange", "während", "weil", "wenn"
  ]
});

function tokenizeText(text) {
  const matches = [
    ...text.matchAll(/\p{L}+(?:['’-]\p{L}+)*|\d+|[.,!?;:]/gu)
  ];

  return matches.map((match, index) => ({
    value: match[0],
    lower: match[0].toLowerCase(),
    index,
    characterStart: match.index,
    characterEnd: match.index + match[0].length
  }));
}

function splitIntoSentences(text) {
  return text
    .split(/(?<=[.!?])\s+/)
    .map(sentence => sentence.trim())
    .filter(Boolean);
}

function createObservation(type, token, sentenceIndex, details = {}) {
  return {
    type,
    token: token?.value ?? null,
    tokenIndex: token?.index ?? null,
    characterStart: token?.characterStart ?? null,
    characterEnd: token?.characterEnd ?? null,
    sentenceIndex,
    details
  };
}

function findSentenceIndex(text, characterPosition) {
  const precedingText = text.slice(0, characterPosition);

  return (
    precedingText.match(/[.!?]+(?:\s+|$)/g)?.length ?? 0
  );
}

function parseText(text) {
  const tokens = tokenizeText(text);
  const sentences = splitIntoSentences(text);
  const observations = [];

  tokens.forEach(token => {
    const sentenceIndex = findSentenceIndex(
      text,
      token.characterStart
    );

    observations.push(
      createObservation(
        OBS.WORD_FOUND,
        token,
        sentenceIndex
      )
    );

    if (PARSER_VOCABULARY.articles.includes(token.lower)) {
      observations.push(
        createObservation(
          OBS.ARTICLE_FOUND,
          token,
          sentenceIndex
        )
      );
    }

    if (PARSER_VOCABULARY.pronouns.includes(token.lower)) {
      observations.push(
        createObservation(
          OBS.PRONOUN_FOUND,
          token,
          sentenceIndex
        )
      );
    }

    if (PARSER_VOCABULARY.prepositions.includes(token.lower)) {
      observations.push(
        createObservation(
          OBS.PREPOSITION_FOUND,
          token,
          sentenceIndex
        )
      );
    }

    if (PARSER_VOCABULARY.conjunctions.includes(token.lower)) {
      observations.push(
        createObservation(
          OBS.CONJUNCTION_FOUND,
          token,
          sentenceIndex
        )
      );
    }

    if (
      PARSER_VOCABULARY.subordinatingConjunctions.includes(
        token.lower
      )
    ) {
      observations.push(
        createObservation(
          OBS.SUBORDINATING_CONJUNCTION_FOUND,
          token,
          sentenceIndex
        )
      );

      observations.push(
        createObservation(
          OBS.SUBORDINATE_CLAUSE_FOUND,
          token,
          sentenceIndex
        )
      );
    }
  });

  tokens.forEach((token, index) => {
    const nextToken = tokens[index + 1];
    const tokenAfterNext = tokens[index + 2];

    if (
      PARSER_VOCABULARY.prepositions.includes(token.lower) &&
      nextToken &&
      PARSER_VOCABULARY.articles.includes(nextToken.lower)
    ) {
      observations.push(
        createObservation(
          OBS.PREPOSITION_ARTICLE_PATTERN,
          token,
          findSentenceIndex(text, token.characterStart),
          {
            values: [token.value, nextToken.value],
            startTokenIndex: token.index,
            endTokenIndex: nextToken.index
          }
        )
      );
    }

    if (
      PARSER_VOCABULARY.prepositions.includes(token.lower) &&
      nextToken &&
      PARSER_VOCABULARY.articles.includes(nextToken.lower) &&
      tokenAfterNext &&
      /^[A-ZÄÖÜ]/u.test(tokenAfterNext.value)
    ) {
      observations.push(
        createObservation(
          OBS.PREPOSITION_ARTICLE_NOUN_PATTERN,
          token,
          findSentenceIndex(text, token.characterStart),
          {
            values: [
              token.value,
              nextToken.value,
              tokenAfterNext.value
            ],
            startTokenIndex: token.index,
            endTokenIndex: tokenAfterNext.index
          }
        )
      );
    }
  });

  return {
    text,
    tokens,
    observations,

    statistics: {
      wordCount: tokens.filter(token =>
        /^[\p{L}\d]/u.test(token.value)
      ).length,

      sentenceCount: sentences.length,

      observationCount: observations.length
    },

    structures: {
      sentences
    }
  };
}
