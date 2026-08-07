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

  const results = [];

  DIAGNOSIS_MODEL.forEach(card => {
    const isObservable =
      card.observableThrough.some(type =>
        observationTypes.has(type)
      );

    if (!isObservable) {
      return;
    }

    const matchedIndicators =
      card.indicators.filter(indicator =>
        observationTypes.has(indicator)
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

    results.push({
      id: card.id,

      parent: card.parent,

      learningTopic:
        card.learningTopic,

      why:
        card.why,

      review:
        card.review,

      priority:
        card.priority,

      evidence
    });
  });

  results.sort(
    (a, b) =>
      b.priority - a.priority
  );

  const uniqueResults = [];

  results.forEach(result => {
    const alreadyIncluded =
      uniqueResults.some(
        existing =>
          existing.id === result.id
      );

    if (!alreadyIncluded) {
      uniqueResults.push(result);
    }
  });

  return uniqueResults.slice(0, 3);
}