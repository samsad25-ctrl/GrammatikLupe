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
    const observable =
      topic.observableThrough.some(
        observationType =>
          observationTypes.has(
            observationType
          )
      );

    if (!observable) {
      return;
    }

    const matchedIndicators =
      topic.indicators.filter(
        indicator =>
          observationTypes.has(
            indicator
          )
      );

    if (
      matchedIndicators.length === 0
    ) {
      return;
    }

    const evidence =
      analysis.observations.filter(
        observation =>
          matchedIndicators.includes(
            observation.type
          )
      );

    candidates.push({
      id: topic.id,
      parent: topic.parent,
      family: topic.family,
      level: topic.level,

      learningTopic:
        topic.learningTopic,

      why:
        topic.why,

      review:
        topic.review,

      priority:
        topic.priority,

      evidenceCount:
        evidence.length,

      evidence
    });
  });

  /*
   * Zuerst:
   * möglichst konkretes Lernthema.
   *
   * Danach:
   * Priorität.
   *
   * Danach:
   * stärkere Evidenz.
   */
  candidates.sort(
    (a, b) => {
      if (a.level !== b.level) {
        return b.level - a.level;
      }

      if (
        a.priority !== b.priority
      ) {
        return (
          b.priority -
          a.priority
        );
      }

      return (
        b.evidenceCount -
        a.evidenceCount
      );
    }
  );

  /*
   * Pro Ast soll möglichst
   * der spezifischste Knoten
   * erscheinen.
   */
  const selected = [];
  const selectedFamilies =
    new Map();

  candidates.forEach(
    candidate => {
      const existing =
        selectedFamilies.get(
          candidate.family
        );

      if (!existing) {
        selected.push(
          candidate
        );

        selectedFamilies.set(
          candidate.family,
          candidate
        );

        return;
      }

      /*
       * Gleich konkrete Themen
       * dürfen nebeneinander
       * vorkommen.
       *
       * Beispiel:
       * Dativpräpositionen +
       * Akkusativpräpositionen.
       */
      if (
        existing.level ===
        candidate.level
      ) {
        selected.push(
          candidate
        );
      }
    }
  );

  /*
   * Nie mehr als drei
   * Wiederholungsthemen.
   */
  return selected.slice(0, 3);
}