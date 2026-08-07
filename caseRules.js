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

  clearlyNonDative: [
    "die",
    "das",

    "ein",
    "eine",
    "einen",

    "kein",
    "keine",
    "keinen",

    "mein",
    "meine",
    "meinen",

    "dein",
    "deine",
    "deinen",

    "sein",
    "seine",
    "seinen",

    "ihr",
    "ihre",
    "ihren",

    "unser",
    "unsere",
    "unseren",

    "euer",
    "eure",
    "euren"
  ],

  clearlyNonAccusative: [
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

function createFixedCaseObservation(
  type,
  prepositionToken,
  determinerToken,
  requiredCase
) {
  return {
    type,

    token:
      prepositionToken.value,

    tokenIndex:
      prepositionToken.index,

    sentenceIndex:
      prepositionToken.sentenceIndex,

    characterStart:
      prepositionToken.characterStart,

    characterEnd:
      determinerToken.characterEnd,

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

function applyCaseRules(
  text,
  tokens
) {
  const observations = [];

  tokens.forEach((token, index) => {
    const nextToken =
      tokens[index + 1];

    if (!nextToken) {
      return;
    }

    /*
     * Keine Regel über Satzgrenzen.
     */
    if (
      token.sentenceIndex !==
      nextToken.sentenceIndex
    ) {
      return;
    }

    const preposition =
      token.lower;

    const determiner =
      nextToken.lower;

    /*
     * Fester Dativ
     */
    if (
      CASE_RULES.dativePrepositions.includes(
        preposition
      ) &&
      CASE_RULES.clearlyNonDative.includes(
        determiner
      )
    ) {
      observations.push(
        createFixedCaseObservation(
          OBS.FIXED_DATIVE_PREPOSITION_UNCERTAIN,
          token,
          nextToken,
          "Dativ"
        )
      );
    }

    /*
     * Fester Akkusativ
     */
    if (
      CASE_RULES.accusativePrepositions.includes(
        preposition
      ) &&
      CASE_RULES.clearlyNonAccusative.includes(
        determiner
      )
    ) {
      observations.push(
        createFixedCaseObservation(
          OBS.FIXED_ACCUSATIVE_PREPOSITION_UNCERTAIN,
          token,
          nextToken,
          "Akkusativ"
        )
      );
    }
  });

  return observations;
}