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
      topic.observableThrough.some(type =>
        observationTypes.has(type)
      );

    if (!observable) {
      return;
    }

    const matchedIndicators =
      topic.indicators.filter(type =>
        observationTypes.has(type)
      );

    if (matchedIndicators.length === 0) {
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

      family: topic.family,
      parent: topic.parent,
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
   * Möglichst spezifische Themen zuerst.
   */
  candidates.sort((a, b) => {
    if (a.level !== b.level) {
      return b.level - a.level;
    }

    if (a.priority !== b.priority) {
      return b.priority - a.priority;
    }

    return (
      b.evidenceCount -
      a.evidenceCount
    );
  });

  /*
   * Doppelte Themen entfernen.
   */
  const unique = [];

  candidates.forEach(candidate => {
    const exists =
      unique.some(
        item =>
          item.id === candidate.id
      );

    if (!exists) {
      unique.push(candidate);
    }
  });

  /*
   * Höchstens drei konkrete
   * Wiederholungsthemen.
   */
  return unique.slice(0, 3);
}