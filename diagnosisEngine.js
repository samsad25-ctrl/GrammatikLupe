function runDiagnosis(analysis) {
  if (
    !analysis ||
    !Array.isArray(analysis.observations)
  ) {
    return [];
  }

  const observationTypes = new Set(
    analysis.observations.map(
      observation => observation.type
    )
  );

  const candidates = [];

  LEARNING_TOPICS.forEach(topic => {
    /*
     * Ist dieser Lernbereich
     * im Text überhaupt beobachtbar?
     */
    const observable =
      topic.observableThrough.some(
        type =>
          observationTypes.has(type)
      );

    if (!observable) {
      return;
    }

    /*
     * Nur Beobachtungen verwenden,
     * die zu diesem Lernknoten gehören.
     */
    const rawEvidence =
      analysis.observations.filter(
        observation =>
          topic.indicators.includes(
            observation.type
          )
      );

    if (rawEvidence.length === 0) {
      return;
    }

    /*
     * Dieselbe Fundstelle soll nicht
     * versehentlich mehrfach zählen.
     */
    const uniqueEvidence = [];

    const seenEvidence =
      new Set();

    rawEvidence.forEach(
      observation => {
        const key = [
          observation.type,
          observation.sentenceIndex,
          observation.characterStart,
          observation.characterEnd
        ].join(":");

        if (
          seenEvidence.has(key)
        ) {
          return;
        }

        seenEvidence.add(key);

        uniqueEvidence.push(
          observation
        );
      }
    );

    /*
     * Evidenz intern gewichten.
     */
    let evidenceScore = 0;

    uniqueEvidence.forEach(
      observation => {
        const weight =
          topic.indicatorWeights?.[
            observation.type
          ] ?? 1;

        evidenceScore += weight;
      }
    );

    /*
     * Ein einzelner schwacher Hinweis
     * muss nicht sofort zu einer
     * Empfehlung führen.
     */
    const minimumEvidence =
      topic.minimumEvidence ?? 1;

    if (
      evidenceScore <
      minimumEvidence
    ) {
      return;
    }

    candidates.push({
      id:
        topic.id,

      family:
        topic.family,

      parent:
        topic.parent,

      level:
        topic.level,

      learningTopic:
        topic.learningTopic,

      why:
        topic.why,

      review:
        topic.review,

      priority:
        topic.priority,

      /*
       * Intern!
       * Wird nicht an Studierende
       * ausgegeben.
       */
      evidenceScore,

      evidence:
        uniqueEvidence
    });
  });

  /*
   * 1. Spezifischstes Lernthema
   * 2. stärkste Evidenz
   * 3. didaktische Priorität
   */
  candidates.sort(
    (a, b) => {
      if (
        a.level !== b.level
      ) {
        return (
          b.level -
          a.level
        );
      }

      if (
        a.evidenceScore !==
        b.evidenceScore
      ) {
        return (
          b.evidenceScore -
          a.evidenceScore
        );
      }

      return (
        b.priority -
        a.priority
      );
    }
  );

  /*
   * Doppelte Themen entfernen.
   */
  const uniqueCandidates = [];

  const seenTopics =
    new Set();

  candidates.forEach(
    candidate => {
      if (
        seenTopics.has(
          candidate.id
        )
      ) {
        return;
      }

      seenTopics.add(
        candidate.id
      );

      uniqueCandidates.push(
        candidate
      );
    }
  );

  /*
   * Maximal drei konkrete
   * Wiederholungsthemen.
   */
  return uniqueCandidates.slice(
    0,
    3
  );
}