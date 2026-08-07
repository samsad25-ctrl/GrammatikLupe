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

  /*
   * Diese Formen sind im Dativ
   * eindeutig auffällig.
   */
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

  /*
   * Diese Formen sind im Akkusativ
   * eindeutig auffällig.
   */
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
  ],

  /*
   * Sehr einfache Nominalgruppen-Heuristik.
   * Für den MVP nutzen wir Grossschreibung
   * als Hinweis auf ein Nomen.
   */
  nounPattern:
    /^[A-ZÄÖÜ][\p{L}’-]*$/u
});


/*
 * ============================================================
 * HILFSFUNKTIONEN
 * ============================================================
 */

function isLikelyNoun(token) {
  if (!token) {
    return false;
  }

  return CASE_RULES.nounPattern.test(
    token.value
  );
}


function getNounAfterDeterminer(
  tokens,
  determinerIndex
) {
  const nextToken =
    tokens[determinerIndex + 1];

  if (!nextToken) {
    return null;
  }

  /*
   * Keine Suche über Satzgrenzen.
   */
  if (
    nextToken.sentenceIndex !==
    tokens[determinerIndex].sentenceIndex
  ) {
    return null;
  }

  if (
    isLikelyNoun(nextToken)
  ) {
    return nextToken;
  }

  return null;
}


/*
 * Sehr kleine Flexionshilfe.
 *
 * Diese Funktion ist absichtlich
 * noch KEIN vollständiger
 * Morphologie-Generator.
 *
 * Sie deckt nur die häufigsten
 * Determinierer ab, die wir für
 * den ersten MVP brauchen.
 */

function getExpectedDeterminer(
  determiner,
  requiredCase
) {
  const lower =
    determiner.toLowerCase();

  const dativeMap = {
    "die": "der",
    "das": "dem",

    "ein": "einem",
    "eine": "einer",
    "einen": "einem",

    "kein": "keinem",
    "keine": "keiner",
    "keinen": "keinem",

    "mein": "meinem",
    "meine": "meiner",
    "meinen": "meinem",

    "dein": "deinem",
    "deine": "deiner",
    "deinen": "deinem",

    "sein": "seinem",
    "seine": "seiner",
    "seinen": "seinem",

    "ihr": "ihrem",
    "ihre": "ihrer",
    "ihren": "ihrem",

    "unser": "unserem",
    "unsere": "unserer",
    "unseren": "unserem",

    "euer": "eurem",
    "eure": "eurer",
    "euren": "eurem"
  };

  const accusativeMap = {
    "der": "den",
    "dem": "den",
    "des": "den",

    "einem": "einen",
    "einer": "eine",
    "eines": "ein",

    "keinem": "keinen",
    "keiner": "keine",
    "keines": "kein",

    "meinem": "meinen",
    "meiner": "meine",
    "meines": "mein",

    "deinem": "deinen",
    "deiner": "deine",
    "deines": "dein",

    "seinem": "seinen",
    "seiner": "seine",
    "seines": "sein",

    "ihrem": "ihren",
    "ihrer": "ihre",
    "ihres": "ihr",

    "unserem": "unseren",
    "unserer": "unsere",
    "unseres": "unser",

    "eurem": "euren",
    "eurer": "eure",
    "eures": "euer"
  };

  if (
    requiredCase === "Dativ"
  ) {
    return (
      dativeMap[lower] ||
      null
    );
  }

  if (
    requiredCase === "Akkusativ"
  ) {
    return (
      accusativeMap[lower] ||
      null
    );
  }

  return null;
}


/*
 * ============================================================
 * OBSERVATION ERZEUGEN
 * ============================================================
 */

function createFixedCaseObservation({
  type,
  prepositionToken,
  determinerToken,
  nounToken,
  requiredCase
}) {
  const observedParts = [
    prepositionToken.value,
    determinerToken.value
  ];

  if (nounToken) {
    observedParts.push(
      nounToken.value
    );
  }

  const textFragment =
    observedParts.join(" ");

  const expectedDeterminer =
    getExpectedDeterminer(
      determinerToken.value,
      requiredCase
    );

  let expectedForm =
    null;

  if (expectedDeterminer) {
    const expectedParts = [
      prepositionToken.value,
      expectedDeterminer
    ];

    if (nounToken) {
      expectedParts.push(
        nounToken.value
      );
    }

    expectedForm =
      expectedParts.join(" ");
  }

  const explanation = {
    de:
      requiredCase === "Dativ"
        ? `Die Präposition «${prepositionToken.value}» verlangt hier den Dativ.`
        : `Die Präposition «${prepositionToken.value}» verlangt hier den Akkusativ.`,

    zh:
      requiredCase === "Dativ"
        ? `介词“${prepositionToken.value}”在这里要求第三格。`
        : `介词“${prepositionToken.value}”在这里要求第四格。`
  };

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
      nounToken
        ? nounToken.characterEnd
        : determinerToken.characterEnd,

    details: {
      preposition:
        prepositionToken.value,

      determiner:
        determinerToken.value,

      noun:
        nounToken
          ? nounToken.value
          : null,

      requiredCase,

      textFragment,

      expectedForm,

      explanation
    }
  };
}


/*
 * ============================================================
 * HAUPTREGEL
 * ============================================================
 */

function applyCaseRules(
  text,
  tokens
) {
  const observations = [];

  tokens.forEach(
    (token, index) => {
      const nextToken =
        tokens[index + 1];

      if (!nextToken) {
        return;
      }

      /*
       * Keine Analyse über Satzgrenzen.
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

      const nounToken =
        getNounAfterDeterminer(
          tokens,
          index + 1
        );

      /*
       * ==========================================
       * Präpositionen mit festem Dativ
       * ==========================================
       */

      if (
        CASE_RULES
          .dativePrepositions
          .includes(
            preposition
          ) &&
        CASE_RULES
          .clearlyNonDative
          .includes(
            determiner
          )
      ) {
        observations.push(
          createFixedCaseObservation({
            type:
              OBS
                .FIXED_DATIVE_PREPOSITION_UNCERTAIN,

            prepositionToken:
              token,

            determinerToken:
              nextToken,

            nounToken,

            requiredCase:
              "Dativ"
          })
        );
      }

      /*
       * ==========================================
       * Präpositionen mit festem Akkusativ
       * ==========================================
       */

      if (
        CASE_RULES
          .accusativePrepositions
          .includes(
            preposition
          ) &&
        CASE_RULES
          .clearlyNonAccusative
          .includes(
            determiner
          )
      ) {
        observations.push(
          createFixedCaseObservation({
            type:
              OBS
                .FIXED_ACCUSATIVE_PREPOSITION_UNCERTAIN,

            prepositionToken:
              token,

            determinerToken:
              nextToken,

            nounToken,

            requiredCase:
              "Akkusativ"
          })
        );
      }
    }
  );

  return observations;
}