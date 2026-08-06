const DIAGNOSIS_MODEL = Object.freeze([
  {
    id: "CASE_AFTER_PREPOSITION",

    title: {
      de: "Kasus nach Präpositionen",
      zh: "介词后的格"
    },

    observableThrough: [
      OBS.PREPOSITION_ARTICLE_PATTERN,
      OBS.PREPOSITION_NOUN_PATTERN,
      OBS.PREPOSITION_ARTICLE_NOUN_PATTERN
    ],

    indicators: [
      "PREPOSITION_CASE_UNCERTAIN"
    ],

    relatedCompetences: [
      "ARTICLE",
      "GENUS",
      "CASE",
      "PREPOSITION"
    ],

    priority: 90,

    feedback: {
      de:
        "Bei der Verbindung von Präpositionen und Kasus zeigen sich mögliche Unsicherheiten.",
      zh:
        "介词与格的搭配可能还不够稳定。"
    },

    recommendation: {
      de:
        "Achte im nächsten Text besonders darauf, welchen Kasus die Präposition verlangt.",
      zh:
        "下一篇作文请特别注意介词要求使用哪一个格。"
    }
  },

  {
    id: "SUBORDINATE_VERB_POSITION",

    title: {
      de: "Verbposition im Nebensatz",
      zh: "从句中的动词位置"
    },

    observableThrough: [
      OBS.SUBORDINATE_CLAUSE_FOUND,
      OBS.SUBORDINATING_CONJUNCTION_FOUND
    ],

    indicators: [
      "SUBORDINATE_VERB_POSITION_UNCERTAIN"
    ],

    relatedCompetences: [
      "FINITE_VERB",
      "SYNTAX",
      "SUBORDINATE_CLAUSE"
    ],

    priority: 85,

    feedback: {
      de:
        "Die Position des finiten Verbs im Nebensatz wirkt an einzelnen Stellen unsicher.",
      zh:
        "从句中限定动词的位置可能存在不稳定现象。"
    },

    recommendation: {
      de:
        "Achte im nächsten Text darauf, dass das finite Verb im Nebensatz am Ende steht.",
      zh:
        "下一篇作文请注意：从句中的限定动词通常位于句末。"
    }
  },

  {
    id: "SENTENCE_BRACKET",

    title: {
      de: "Satzklammer",
      zh: "句框结构"
    },

    observableThrough: [
      OBS.MODAL_VERB_PATTERN,
      OBS.PERFECT_PATTERN,
      OBS.SEPARABLE_VERB_PATTERN
    ],

    indicators: [
      "SENTENCE_BRACKET_UNCERTAIN"
    ],

    relatedCompetences: [
      "VERB_POSITION",
      "MODAL_VERB",
      "PERFECT",
      "SEPARABLE_VERB"
    ],

    priority: 80,

    feedback: {
      de:
        "Bei mehrteiligen Verbformen zeigen sich mögliche Unsicherheiten in der Satzklammer.",
      zh:
        "多部分动词结构中的句框使用可能还不够稳定。"
    },

    recommendation: {
      de:
        "Achte im nächsten Text darauf, welche Verbteile zusammengehören und wo sie im Satz stehen.",
      zh:
        "下一篇作文请注意哪些动词成分属于同一结构，以及它们在句中的位置。"
    }
  }
]);
