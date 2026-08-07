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
   * Signale für Bewegung
   * mit Ziel/Richtungsänderung.
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

  /*
   * Signale für Position/Aufenthalt.
   */
  locationSignals: [
    "bin",
    "bist",
    "ist",
    "sind",
    "seid",

    "war",
    "waren",

    "bleibe",
    "bleibst",
    "bleibt",
    "bleiben",

    "sitze",
    "sitzt",
    "sitzen",

    "stehe",
    "stehst",
    "steht",
    "stehen",

    "liege",
    "liegst",
    "liegt",
    "liegen",

    "wohne",
    "wohnst",
    "wohnt",
    "wohnen"
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
  ]
});

function getTokensOfSentence(
  tokens,
  sentenceIndex
) {
  return tokens.filter(
    token =>
      token.sentenceIndex ===
      sentenceIndex
  );
}

function createTwoWayObservation(
  type,
  prepositionToken,
  determinerToken,
  context
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
      determinerToken
        ? determinerToken.characterEnd
        : prepositionToken.characterEnd,

    details: {
      preposition:
        prepositionToken.value,

      determiner:
        determinerToken
          ? determinerToken.value
          : null,

      context,

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

    /*
     * Der nächste Token muss
     * noch im selben Satz liegen.
     */
    const determinerToken =
      nextToken &&
      nextToken.sentenceIndex ===
        token.sentenceIndex
        ? nextToken
        : null;

    const sentenceTokens =
      getTokensOfSentence(
        tokens,
        token.sentenceIndex
      );

    const sentenceWords =
      sentenceTokens.map(
        sentenceToken =>
          sentenceToken.lower
      );

    const hasDirection =
      sentenceWords.some(word =>
        TWO_WAY_RULES.directionSignals.includes(
          word
        )
      );

    const hasLocation =
      sentenceWords.some(word =>
        TWO_WAY_RULES.locationSignals.includes(
          word
        )
      );

    observations.push(
      createTwoWayObservation(
        OBS.TWO_WAY_PREPOSITION_FOUND,
        token,
        determinerToken,
        "unknown"
      )
    );

    /*
     * Nur Richtung:
     * Akkusativ erwartet.
     */
    if (
      hasDirection &&
      !hasLocation
    ) {
      observations.push(
        createTwoWayObservation(
          OBS.TWO_WAY_PREPOSITION_DIRECTION,
          token,
          determinerToken,
          "direction"
        )
      );

      if (
        determinerToken &&
        TWO_WAY_RULES.clearlyNonAccusative.includes(
          determinerToken.lower
        )
      ) {
        observations.push(
          createTwoWayObservation(
            OBS.TWO_WAY_DIRECTION_UNCERTAIN,
            token,
            determinerToken,
            "direction"
          )
        );
      }

      return;
    }

    /*
     * Nur Ort:
     * Dativ erwartet.
     */
    if (
      hasLocation &&
      !hasDirection
    ) {
      observations.push(
        createTwoWayObservation(
          OBS.TWO_WAY_PREPOSITION_LOCATION,
          token,
          determinerToken,
          "location"
        )
      );

      if (
        determinerToken &&
        TWO_WAY_RULES.clearlyNonDative.includes(
          determinerToken.lower
        )
      ) {
        observations.push(
          createTwoWayObservation(
            OBS.TWO_WAY_LOCATION_UNCERTAIN,
            token,
            determinerToken,
            "location"
          )
        );
      }
    }

    /*
     * Wenn beide Signaltypen
     * im Satz vorkommen oder keiner:
     * keine Bewertung.
     *
     * Lieber keine Diagnose
     * als ein Fehlalarm.
     */
  });

  return observations;
}