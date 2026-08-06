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
  prepositionToken,
  determinerToken,
  requiredCase,
  sentenceIndex
) {
  return {
    type: OBS.PREPOSITION_CASE_UNCERTAIN,
    token: prepositionToken.value,
    tokenIndex: prepositionToken.index,
    characterStart: prepositionToken.characterStart,
    characterEnd: determinerToken.characterEnd,
    sentenceIndex,

    details: {
      preposition: prepositionToken.value,
      determiner: determinerToken.value,
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

    const sentenceIndex = findSentenceIndex(
      text,
      token.characterStart
    );

    if (
      CASE_RULES.dativePrepositions.includes(preposition) &&
      CASE_RULES.clearlyNonDativeDeterminers.includes(determiner)
    ) {
      observations.push(
        createCaseObservation(
          token,
          nextToken,
          "Dativ",
          sentenceIndex
        )
      );
    }

    if (
      CASE_RULES.accusativePrepositions.includes(preposition) &&
      CASE_RULES.clearlyNonAccusativeDeterminers.includes(
        determiner
      )
    ) {
      observations.push(
        createCaseObservation(
          token,
          nextToken,
          "Akkusativ",
          sentenceIndex
        )
      );
    }
  });

  return observations;
}
