function runDiagnosis(analysis) {
  if (
    !analysis ||
    !Array.isArray(analysis.observations)
  ) {
    return [];
  }

  const observationTypes = new Set(
    analysis.observations.map(observation => observation.type)
  );

  const results = [];

  DIAGNOSIS_MODEL.forEach(card => {
    const isObservable = card.observableThrough.some(type =>
      observationTypes.has(type)
    );

    if (!isObservable) {
      return;
    }

    const matchedIndicators = card.indicators.filter(indicator =>
      observationTypes.has(indicator)
    );

    if (matchedIndicators.length === 0) {
      return;
    }

    const evidence = analysis.observations.filter(observation =>
      matchedIndicators.includes(observation.type)
    );

    results.push({
      id: card.id,
      title: card.title,
      feedback: card.feedback,
      recommendation: card.recommendation,
      priority: card.priority,
      evidence
    });
  });

  results.sort((a, b) => b.priority - a.priority);

  return results.slice(0, 3);
}
