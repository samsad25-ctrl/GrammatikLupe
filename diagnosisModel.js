const DIAGNOSIS_MODEL = Object.freeze([
  {
    id: "PREP_FIXED_DATIVE",

    parent: "PREPOSITIONS",

    title: {
      de: "Präpositionen mit Dativ",
      zh: "要求第三格的介词"
    },

    observableThrough: [
      OBS.PREPOSITION_ARTICLE_PATTERN,
      OBS.PREPOSITION_NOUN_PATTERN,
      OBS.PREPOSITION_ARTICLE_NOUN_PATTERN
    ],

    indicators: [
      OBS.FIXED_DATIVE_PREPOSITION_UNCERTAIN
    ],

    relatedCompetences: [
      "PREPOSITIONS",
      "CASE",
      "GENUS",
      "ARTICLE"
    ],

    priority: 90,

    feedback: {
      de:
        "Bei Präpositionen mit festem Dativ zeigen sich mögliche Unsicherheiten.",
      zh:
        "要求第三格的介词使用可能还不够稳定。"
    },

    recommendation: {
      de:
        "Achte im nächsten Text besonders auf Präpositionen, die immer den Dativ verlangen.",
      zh:
        "下一篇作文请特别注意始终要求第三格的介词。"
    }
  },

  {
    id: "PREP_FIXED_ACCUSATIVE",

    parent: "PREPOSITIONS",

    title: {
      de: "Präpositionen mit Akkusativ",
      zh: "要求第四格的介词"
    },

    observableThrough: [
      OBS.PREPOSITION_ARTICLE_PATTERN,
      OBS.PREPOSITION_NOUN_PATTERN,
      OBS.PREPOSITION_ARTICLE_NOUN_PATTERN
    ],

    indicators: [
      OBS.FIXED_ACCUSATIVE_PREPOSITION_UNCERTAIN
    ],

    relatedCompetences: [
      "PREPOSITIONS",
      "CASE",
      "GENUS",
      "ARTICLE"
    ],

    priority: 90,

    feedback: {
      de:
        "Bei Präpositionen mit festem Akkusativ zeigen sich mögliche Unsicherheiten.",
      zh:
        "要求第四格的介词使用可能还不够稳定。"
    },

    recommendation: {
      de:
        "Achte im nächsten Text besonders auf Präpositionen, die immer den Akkusativ verlangen.",
      zh:
        "下一篇作文请特别注意始终要求第四格的介词。"
    }
  },

  {
    id: "PREP_TWO_WAY",

    parent: "PREPOSITIONS",

    title: {
      de: "Wechselpräpositionen",
      zh: "双向介词"
    },

    observableThrough: [
      OBS.TWO_WAY_PREPOSITION_FOUND
    ],

    indicators: [
      OBS.TWO_WAY_PREPOSITION_UNCERTAIN
    ],

    relatedCompetences: [
      "PREPOSITIONS",
      "CASE",
      "GENUS",
      "LOCAL"
    ],

    priority: 95,

    feedback: {
      de:
        "Bei Wechselpräpositionen zeigen sich mögliche Unsicherheiten bei der Wahl zwischen Dativ und Akkusativ.",
      zh:
        "双向介词在第三格和第四格的选择上可能存在不稳定现象。"
    },

    recommendation: {
      de:
        "Achte bei Wechselpräpositionen besonders darauf, ob ein Ort oder eine Richtung ausgedrückt wird.",
      zh:
        "使用双向介词时，请特别注意表达的是位置还是方向。"
    }
  },

  {
    id: "SUBORDINATE_VERB_POSITION",

    parent: "SYNTAX",

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
      "VERB",
      "SYNTAX",
      "MAIN_CLAUSE",
      "SUBORDINATE_CLAUSE"
    ],

    priority: 85,

    feedback: {
      de:
        "Die Position des finiten Verbs im Nebensatz wirkt möglicherweise noch unsicher.",
      zh:
        "从句中的限定动词位置可能还不够稳定。"
    },

    recommendation: {
      de:
        "Achte im nächsten Text besonders auf die Verbposition in Nebensätzen.",
      zh:
        "下一篇作文请特别注意从句中的动词位置。"
    }
  },

  {
    id: "SENTENCE_BRACKET",

    parent: "SYNTAX",

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
      "VERB",
      "SYNTAX",
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
        "Achte darauf, welche Verbteile zusammengehören und wo sie im Satz stehen.",
      zh:
        "请注意哪些动词成分属于同一结构，以及它们在句中的位置。"
    }
  }
]);