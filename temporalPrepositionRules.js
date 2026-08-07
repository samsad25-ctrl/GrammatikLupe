const TEMPORAL_RULES = Object.freeze({
  timeWords: [
    "tag",
    "tage",
    "tagen",
    "woche",
    "wochen",
    "monat",
    "monate",
    "monaten",
    "jahr",
    "jahre",
    "jahren",

    "montag",
    "dienstag",
    "mittwoch",
    "donnerstag",
    "freitag",
    "samstag",
    "sonntag",

    "morgen",
    "vormittag",
    "mittag",
    "nachmittag",
    "abend",
    "nacht"
  ],

  /*
   * Zeitdauer
   */
  durationPrepositions: [
    "seit",
    "für"
  ],

  /*
   * seit + Dativ
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
    "unseren"
  ],

  /*
   * für + Akkusativ
   */
  clearlyNonAccusative: [
    "der",
    "dem",
    "des",

    "einem",
    "einer",
    "eines",

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
    "unseres"
  ]
});

function createTemporalObservation(
  type,
  token,
  details = {}
) {
  return {
    type,

    token:
      token.value,

    tokenIndex:
      token.index,

    sentenceIndex:
      token.sentenceIndex,

    characterStart:
      token.characterStart,

    characterEnd:
      token.characterEnd,

    details
  };
}

function isTimeWord(token) {
  if (!token) {
    return false;
  }

  return TEMPORAL_RULES.timeWords.includes(
    token.lower
  );
}

function findNextTimeWord(
  tokens,
  startIndex,
  sentenceIndex,
  distance = 4
) {
  for (
    let offset = 1;
    offset <= distance;
    offset++
  ) {
    const token =
      tokens[startIndex + offset];

    if (!token) {
      break;
    }

    if (
      token.sentenceIndex !==
      sentenceIndex
    ) {
      break;
    }

    if (isTimeWord(token)) {
      return token;
    }
  }

  return null;
}

function applyTemporalPrepositionRules(
  text,
  tokens
) {
  const observations = [];

  tokens.forEach((token, index) => {
    /*
     * =====================================
     * ZEITDAUER
     * =====================================
     */

    if (
      TEMPORAL_RULES
        .durationPrepositions
        .includes(token.lower)
    ) {
      const timeWord =
        findNextTimeWord(
          tokens,
          index,
          token.sentenceIndex
        );

      if (timeWord) {
        observations.push(
          createTemporalObservation(
            OBS.TEMPORAL_PREPOSITION_FOUND,
            token,
            {
              category:
                "duration"
            }
          )
        );

        observations.push(
          createTemporalObservation(
            OBS.TEMPORAL_DURATION_FOUND,
            token,
            {
              timeWord:
                timeWord.value
            }
          )
        );
      }

      const nextToken =
        tokens[index + 1];

      if (
        timeWord &&
        nextToken &&
        nextToken.sentenceIndex ===
          token.sentenceIndex
      ) {
        /*
         * seit + eindeutig
         * nicht-dativische Form
         */
        if (
          token.lower === "seit" &&
          TEMPORAL_RULES
            .clearlyNonDative
            .includes(
              nextToken.lower
            )
        ) {
          observations.push(
            createTemporalObservation(
              OBS.TEMPORAL_DURATION_UNCERTAIN,
              token,
              {
                pattern:
                  "seit + Kasus",

                textFragment:
                  `${token.value} ${nextToken.value}`
              }
            )
          );
        }

        /*
         * für + eindeutig
         * nicht-akkusativische Form
         */
        if (
          token.lower === "für" &&
          TEMPORAL_RULES
            .clearlyNonAccusative
            .includes(
              nextToken.lower
            )
        ) {
          observations.push(
            createTemporalObservation(
              OBS.TEMPORAL_DURATION_UNCERTAIN,
              token,
              {
                pattern:
                  "für + Kasus",

                textFragment:
                  `${token.value} ${nextToken.value}`
              }
            )
          );
        }
      }
    }

    /*
     * =====================================
     * ZEITRAUM: von ... bis ...
     * =====================================
     */

    if (token.lower === "von") {
      const sameSentenceTokens =
        tokens.slice(
          index + 1,
          index + 8
        ).filter(
          nextToken =>
            nextToken.sentenceIndex ===
            token.sentenceIndex
        );

      const bisToken =
        sameSentenceTokens.find(
          nextToken =>
            nextToken.lower === "bis"
        );

      const zuToken =
        sameSentenceTokens.find(
          nextToken =>
            nextToken.lower === "zu"
        );

      const timeWord =
        findNextTimeWord(
          tokens,
          index,
          token.sentenceIndex,
          6
        );

      if (
        bisToken &&
        timeWord
      ) {
        observations.push(
          createTemporalObservation(
            OBS.TEMPORAL_PREPOSITION_FOUND,
            token,
            {
              category:
                "period"
            }
          )
        );

        observations.push(
          createTemporalObservation(
            OBS.TEMPORAL_PERIOD_FOUND,
            token,
            {
              pattern:
                "von ... bis ..."
            }
          )
        );
      }

      /*
       * Lernerform:
       * von Montag zu Freitag
       */
      if (
        zuToken &&
        timeWord
      ) {
        observations.push(
          createTemporalObservation(
            OBS.TEMPORAL_PERIOD_FOUND,
            token,
            {
              pattern:
                "period"
            }
          )
        );

        observations.push(
          createTemporalObservation(
            OBS.TEMPORAL_PERIOD_UNCERTAIN,
            token,
            {
              textFragment:
                "von ... zu ...",

              expectedPattern:
                "von ... bis ..."
            }
          )
        );
      }
    }

    /*
     * =====================================
     * ZEITRAUM: zwischen ... und ...
     * =====================================
     */

    if (
      token.lower ===
      "zwischen"
    ) {
      const sameSentenceTokens =
        tokens.slice(
          index + 1,
          index + 8
        ).filter(
          nextToken =>
            nextToken.sentenceIndex ===
            token.sentenceIndex
        );

      const undToken =
        sameSentenceTokens.find(
          nextToken =>
            nextToken.lower === "und"
        );

      const bisToken =
        sameSentenceTokens.find(
          nextToken =>
            nextToken.lower === "bis"
        );

      const timeWord =
        findNextTimeWord(
          tokens,
          index,
          token.sentenceIndex,
          6
        );

      if (
        undToken &&
        timeWord
      ) {
        observations.push(
          createTemporalObservation(
            OBS.TEMPORAL_PERIOD_FOUND,
            token,
            {
              pattern:
                "zwischen ... und ..."
            }
          )
        );
      }

      /*
       * Lernerform:
       * zwischen Montag bis Freitag
       */
      if (
        bisToken &&
        timeWord
      ) {
        observations.push(
          createTemporalObservation(
            OBS.TEMPORAL_PERIOD_FOUND,
            token
          )
        );

        observations.push(
          createTemporalObservation(
            OBS.TEMPORAL_PERIOD_UNCERTAIN,
            token,
            {
              textFragment:
                "zwischen ... bis ...",

              expectedPattern:
                "zwischen ... und ..."
            }
          )
        );
      }
    }
  });

  return observations;
}