const TWO_WAY_RULES = Object.freeze({
  prepositions: [
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

  /*
   * Vorerst bewusst kleine Listen.
   * Wir erweitern sie später systematisch.
   */
  directionSignals: [
    "gehe",
    "gehst",
    "geht",
    "gehen",
    "ging",
    "gingen",

    "fahre",
    "fährst",
    "fährt",
    "fahren",
    "fuhr",
    "fuhren",

    "laufe",
    "läufst",
    "läuft",
    "laufen",

    "stelle",
    "stellst",
    "stellt",
    "stellen",

    "lege",
    "legst",
    "legt",
    "legen",

    "setze",
    "setzt",
    "setzen"
  ],

  locationSignals: [
    "bin",
    "bist",
    "ist",
    "sind",
    "seid",
    "war",
    "waren",

    "stehe",
    "stehst",
    "steht",
    "stehen",

    "liege",
    "liegst",
    "liegt",
    "liegen",

    "sitze",
    "sitzt",
    "sitzen",

    "bleibe",
    "bleibst",
    "bleibt",
    "bleiben",

    "wohne",
    "wohnst",
    "wohnt",
    "wohnen"
  ],

  /*
   * Formen, die bei einem
   * Richtungshinweis klar
   * nicht nach Akkusativ aussehen.
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
   * Formen, die bei einem
   * Ortshinweis klar
   * nicht nach Dativ aussehen.
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
  ]
});

function getSentenceTokens(
  tokens,
  sentenceIndex,
  text
) {
  return tokens.filter(token =>
    findSentenceIndex(
      text,
      token.characterStart
    ) === sentenceIndex
  );
}

function createTwoWayObservation(
  type,
  prepositionToken,
  determinerToken,
  sentenceIndex,
  contextType
) {
  return {
    type,

    token:
      prepositionToken.value,

    tokenIndex:
      prepositionToken.index,

    characterStart:
      prepositionToken.characterStart,

    characterEnd:
      determinerToken
        ? determinerToken.characterEnd
        : prepositionToken.characterEnd,

    sentenceIndex,

    details: {
      preposition:
        prepositionToken.value,

      determiner:
        determinerToken
          ? determinerToken.value
          : null,

      contextType,

      textFragment:
        determinerToken
          ? `${prepositionToken.value} ${determinerToken.value}`
          : prepositionToken.value
    }
  };
}

function applyTwoWayPrepositionRules(
  text,
  tokens
) {
  const observations = [];

  tokens.forEach((token, index) => {
    if (
      !TWO_WAY_RULES.prepositions.includes(
        token.lower
      )
    ) {
      return;
    }

    const nextToken =
      tokens[index + 1];

    const sentenceIndex =
      findSentenceIndex(
        text,
        token.characterStart
      );

    const sentenceTokens =
      getSentenceTokens(
        tokens,
        sentenceIndex,
        text
      );

    const sentenceWords =
      sentenceTokens.map(
        sentenceToken =>
          sentenceToken.lower
      );

    const hasDirectionSignal =
      sentenceWords.some(word =>
        TWO_WAY_RULES.directionSignals.includes(
          word
        )
      );

    const hasLocationSignal =
      sentenceWords.some(word =>
        TWO_WAY_RULES.locationSignals.includes(
          word
        )
      );

    /*
     * Wechselpräposition erkannt.
     */
    observations.push(
      createTwoWayObservation(
        OBS.TWO_WAY_PREPOSITION_FOUND,
        token,
        nextToken,
        sentenceIndex,
        "unknown"
      )
    );

    /*
     * Richtung
     */
    if (
      hasDirectionSignal &&
      !hasLocationSignal
    ) {
      observations.push(
        createTwoWayObservation(
          OBS.TWO_WAY_PREPOSITION_DIRECTION,
          token,
          nextToken,
          sentenceIndex,
          "direction"
        )
      );

      if (
        nextToken &&
        TWO_WAY_RULES.clearlyNonAccusative.includes(
          nextToken.lower
        )
      ) {
        observations.push(
          createTwoWayObservation(
            OBS.TWO_WAY_DIRECTION_UNCERTAIN,
            token,
            nextToken,
            sentenceIndex,
            "direction"
          )
        );
      }

      return;
    }

    /*
     * Ort
     */
    if (
      hasLocationSignal &&
      !hasDirectionSignal
    ) {
      observations.push(
        createTwoWayObservation(
          OBS.TWO_WAY_PREPOSITION_LOCATION,
          token,
          nextToken,
          sentenceIndex,
          "location"
        )
      );

      if (
        nextToken &&
        TWO_WAY_RULES.clearlyNonDative.includes(
          nextToken.lower
        )
      ) {
        observations.push(
          createTwoWayObservation(
            OBS.TWO_WAY_LOCATION_UNCERTAIN,
            token,
            nextToken,
            sentenceIndex,
            "location"
          )
        );
      }
    }
  });

  return observations;
}