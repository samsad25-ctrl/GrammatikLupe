const CASE_RULES = Object.freeze({
  dativePrepositions: [
    "aus",
    "bei",
    "mit",
    "nach",
    "seit",
    "von",
    "zu",
    "gegenüber"
  ],

  accusativePrepositions: [
    "durch",
    "für",
    "gegen",
    "ohne",
    "um"
  ],

  twoWayPrepositions: [
    "an",
    "auf",
    "hinter",
    "in",
    "neben",
    "über",
    "unter",
    "vor",
    "zwischen"
  ],

  clearlyNonDativeDeterminers: [
    "die",
    "das",
    "ein",
    "eine",
    "einen",
    "eines",

    "kein",
    "keine",
    "keinen",
    "keines",

    "mein",
    "meine",
    "meinen",
    "meines",

    "dein",
    "deine",
    "deinen",
    "deines",

    "sein",
    "seine",
    "seinen",
    "seines",

    "ihr",
    "ihre",
    "ihren",
    "ihres",

    "unser",
    "unsere",
    "unseren",
    "unseres",

    "euer",
    "eure",
    "euren",
    "eures"
  ],

  clearlyNonAccusativeDeterminers: [
    "der",
    "dem",
    "des",

    "einem",
    "einer",
    "eines",

    "keinem",
    "keiner",
    "keines",

    "meinem",
    "meiner",
    "meines",

    "deinem",
    "deiner",
    "deines",

    "seinem",
    "seiner",
    "seines",

    "ihrem",
    "ihrer",
    "ihres",

    "unserem",
    "unserer",
    "unseres",

    "eurem",
    "eurer",
    "eures"
  ]
});

function createCaseObservation(
  type,
  prepositionToken,
  determinerToken,
  requiredCase,
  sentenceIndex
) {
  return {
    type,

    token: prepositionToken.value,
    tokenIndex: prepositionToken.index,

    characterStart:
      prepositionToken.characterStart,

    characterEnd:
      determinerToken.characterEnd,

    sentenceIndex,

    details: {
      preposition:
        prepositionToken.value,

      determiner:
        determinerToken.value,

      requiredCase,

      textFragment:
        `${prepositionToken.value} ${determinerToken.value}`
    }
  };
}

function applyCaseRules(text, tokens) {
  const observations = [];

  tokens.forEach((token, index) => {
    const nextToken = tokens[index + 1];

    if (!nextToken) {
      return;
    }

    const preposition = token.lower;
    const determiner = nextToken.lower;

    const sentenceIndex =
      findSentenceIndex(
        text,
        token.characterStart
      );

    // Präposition verlangt Dativ
    if (
      CASE_RULES.dativePrepositions.includes(
        preposition
      ) &&
      CASE_RULES.clearlyNonDativeDeterminers.includes(
        determiner
      )
    ) {
      observations.push(
        createCaseObservation(
          OBS.FIXED_DATIVE_PREPOSITION_UNCERTAIN,
          token,
          nextToken,
          "Dativ",
          sentenceIndex
        )
      );

      observations.push(
        createCaseObservation(
          OBS.PREPOSITION_CASE_UNCERTAIN,
          token,
          nextToken,
          "Dativ",
          sentenceIndex
        )
      );
    }

    // Präposition verlangt Akkusativ
    if (
      CASE_RULES.accusativePrepositions.includes(
        preposition
      ) &&
      CASE_RULES.clearlyNonAccusativeDeterminers.includes(
        determiner
      )
    ) {
      observations.push(
        createCaseObservation(
          OBS.FIXED_ACCUSATIVE_PREPOSITION_UNCERTAIN,
          token,
          nextToken,
          "Akkusativ",
          sentenceIndex
        )
      );

      observations.push(
        createCaseObservation(
          OBS.PREPOSITION_CASE_UNCERTAIN,
          token,
          nextToken,
          "Akkusativ",
          sentenceIndex
        )
      );
    }

    // Wechselpräposition zunächst nur erkennen.
    // Noch keine Bewertung von Dativ/Akkusativ.
    if (
      CASE_RULES.twoWayPrepositions.includes(
        preposition
      )
    ) {
      observations.push({
        type:
          OBS.TWO_WAY_PREPOSITION_FOUND,

        token:
          token.value,

        tokenIndex:
          token.index,

        characterStart:
          token.characterStart,

        characterEnd:
          token.characterEnd,

        sentenceIndex,

        details: {
          preposition:
            token.value,

          determiner:
            nextToken.value
        }
      });
    }
  });

  return observations;
}