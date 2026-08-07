const LEARNING_TOPICS = Object.freeze([

  // =========================================================
  // PRÄPOSITIONEN
  // =========================================================

  {
    id: "PREP_FIXED_DATIVE",

    parent: "PREPOSITIONS",

    family: "PREPOSITIONS",

    level: 2,

    learningTopic: {
      de: "Präpositionen mit festem Dativ",
      zh: "固定要求第三格的介词"
    },

    observableThrough: [
      "PREPOSITION_ARTICLE_PATTERN",
      "PREPOSITION_NOUN_PATTERN",
      "PREPOSITION_ARTICLE_NOUN_PATTERN"
    ],

    indicators: [
      "FIXED_DATIVE_PREPOSITION_UNCERTAIN"
    ],

    why: {
      de:
        "In deinem Text gibt es Hinweise darauf, dass Präpositionen mit festem Dativ noch nicht sicher verwendet werden.",
      zh:
        "你的文本中显示，固定要求第三格的介词使用还不够稳定。"
    },

    review: {
      de: [
        "mit",
        "bei",
        "nach",
        "von",
        "zu",
        "aus",
        "seit",
        "gegenüber"
      ],

      zh: [
        "mit",
        "bei",
        "nach",
        "von",
        "zu",
        "aus",
        "seit",
        "gegenüber"
      ]
    },

    priority: 90
  },

  {
    id: "PREP_FIXED_ACCUSATIVE",

    parent: "PREPOSITIONS",

    family: "PREPOSITIONS",

    level: 2,

    learningTopic: {
      de: "Präpositionen mit festem Akkusativ",
      zh: "固定要求第四格的介词"
    },

    observableThrough: [
      "PREPOSITION_ARTICLE_PATTERN",
      "PREPOSITION_NOUN_PATTERN",
      "PREPOSITION_ARTICLE_NOUN_PATTERN"
    ],

    indicators: [
      "FIXED_ACCUSATIVE_PREPOSITION_UNCERTAIN"
    ],

    why: {
      de:
        "In deinem Text gibt es Hinweise darauf, dass Präpositionen mit festem Akkusativ noch nicht sicher verwendet werden.",
      zh:
        "你的文本中显示，固定要求第四格的介词使用还不够稳定。"
    },

    review: {
      de: [
        "durch",
        "für",
        "gegen",
        "ohne",
        "um"
      ],

      zh: [
        "durch",
        "für",
        "gegen",
        "ohne",
        "um"
      ]
    },

    priority: 90
  },

  // =========================================================
  // WECHSELPRÄPOSITIONEN
  // =========================================================

  {
    id: "PREP_TWO_WAY",

    parent: "PREPOSITIONS",

    family: "PREPOSITIONS",

    level: 2,

    learningTopic: {
      de: "Wechselpräpositionen",
      zh: "双向介词"
    },

    observableThrough: [
      "TWO_WAY_PREPOSITION_FOUND"
    ],

    indicators: [
      "TWO_WAY_PREPOSITION_UNCERTAIN"
    ],

    why: {
      de:
        "In deinem Text gibt es Hinweise darauf, dass Wechselpräpositionen noch nicht sicher verwendet werden.",
      zh:
        "你的文本中显示，双向介词的使用还不够稳定。"
    },

    review: {
      de: [
        "in",
        "an",
        "auf",
        "über",
        "unter",
        "vor",
        "hinter",
        "neben",
        "zwischen",
        "Ort und Richtung unterscheiden"
      ],

      zh: [
        "in",
        "an",
        "auf",
        "über",
        "unter",
        "vor",
        "hinter",
        "neben",
        "zwischen",
        "区分位置和方向"
      ]
    },

    priority: 100
  },

  {
    id: "PREP_TWO_WAY_LOCATION",

    parent: "PREP_TWO_WAY",

    family: "PREPOSITIONS",

    level: 3,

    learningTopic: {
      de: "Wechselpräpositionen bei Ortsangaben",
      zh: "表示位置的双向介词"
    },

    observableThrough: [
      "TWO_WAY_PREPOSITION_LOCATION"
    ],

    indicators: [
      "TWO_WAY_LOCATION_UNCERTAIN"
    ],

    why: {
      de:
        "In deinem Text gibt es Hinweise darauf, dass Wechselpräpositionen bei Ortsangaben noch nicht sicher verwendet werden.",
      zh:
        "你的文本中显示，表示位置时双向介词的使用还不够稳定。"
    },

    review: {
      de: [
        "Ortsangaben",
        "Wo?",
        "Dativ bei Wechselpräpositionen"
      ],

      zh: [
        "位置表达",
        "Wo?",
        "双向介词与第三格"
      ]
    },

    priority: 110
  },

  {
    id: "PREP_TWO_WAY_DIRECTION",

    parent: "PREP_TWO_WAY",

    family: "PREPOSITIONS",

    level: 3,

    learningTopic: {
      de: "Wechselpräpositionen bei Richtungsangaben",
      zh: "表示方向的双向介词"
    },

    observableThrough: [
      "TWO_WAY_PREPOSITION_DIRECTION"
    ],

    indicators: [
      "TWO_WAY_DIRECTION_UNCERTAIN"
    ],

    why: {
      de:
        "In deinem Text gibt es Hinweise darauf, dass Wechselpräpositionen bei Richtungsangaben noch nicht sicher verwendet werden.",
      zh:
        "你的文本中显示，表示方向时双向介词的使用还不够稳定。"
    },

    review: {
      de: [
        "Richtungsangaben",
        "Wohin?",
        "Akkusativ bei Wechselpräpositionen"
      ],

      zh: [
        "方向表达",
        "Wohin?",
        "双向介词与第四格"
      ]
    },

    priority: 115
  },

  // =========================================================
  // TEMPORALE PRÄPOSITIONEN
  // =========================================================

  {
    id: "PREP_TEMPORAL",

    parent: "PREPOSITIONS",

    family: "PREPOSITIONS",

    level: 2,

    learningTopic: {
      de: "Temporale Präpositionen",
      zh: "时间介词"
    },

    observableThrough: [
      "TEMPORAL_PREPOSITION_FOUND"
    ],

    indicators: [
      "TEMPORAL_PREPOSITION_UNCERTAIN"
    ],

    why: {
      de:
        "In deinem Text gibt es Hinweise darauf, dass temporale Präpositionen noch nicht sicher verwendet werden.",
      zh:
        "你的文本中显示，时间介词的使用还不够稳定。"
    },

    review: {
      de: [
        "Zeitangaben mit Präpositionen"
      ],

      zh: [
        "使用介词表达时间"
      ]
    },

    priority: 80
  },

  {
    id: "PREP_TEMPORAL_DURATION",

    parent: "PREP_TEMPORAL",

    family: "PREPOSITIONS",

    level: 3,

    learningTopic: {
      de: "Temporale Präpositionen – Zeitdauer",
      zh: "时间介词——持续时间"
    },

    observableThrough: [
      "TEMPORAL_DURATION_FOUND"
    ],

    indicators: [
      "TEMPORAL_DURATION_UNCERTAIN"
    ],

    why: {
      de:
        "In deinem Text gibt es Hinweise darauf, dass die Angabe einer Zeitdauer noch nicht sicher ist.",
      zh:
        "你的文本中显示，持续时间的表达还不够稳定。"
    },

    review: {
      de: [
        "Zeitdauer ausdrücken",
        "Wie lange?"
      ],

      zh: [
        "表达持续时间",
        "Wie lange?"
      ]
    },

    priority: 110
  },

  {
    id: "PREP_TEMPORAL_PERIOD",

    parent: "PREP_TEMPORAL",

    family: "PREPOSITIONS",

    level: 3,

    learningTopic: {
      de: "Temporale Präpositionen – Zeitraum",
      zh: "时间介词——时间范围"
    },

    observableThrough: [
      "TEMPORAL_PERIOD_FOUND"
    ],

    indicators: [
      "TEMPORAL_PERIOD_UNCERTAIN"
    ],

    why: {
      de:
        "In deinem Text gibt es Hinweise darauf, dass die Angabe eines Zeitraums noch nicht sicher ist.",
      zh:
        "你的文本中显示，时间范围的表达还不够稳定。"
    },

    review: {
      de: [
        "Zeiträume ausdrücken",
        "Beginn und Ende eines Zeitraums"
      ],

      zh: [
        "表达时间范围",
        "时间范围的开始和结束"
      ]
    },

    priority: 110
  },

  // =========================================================
  // LOKALE PRÄPOSITIONEN
  // =========================================================

  {
    id: "PREP_LOCAL",

    parent: "PREPOSITIONS",

    family: "PREPOSITIONS",

    level: 2,

    learningTopic: {
      de: "Lokale Präpositionen",
      zh: "地点介词"
    },

    observableThrough: [
      "LOCAL_PREPOSITION_FOUND"
    ],

    indicators: [
      "LOCAL_PREPOSITION_UNCERTAIN"
    ],

    why: {
      de:
        "In deinem Text gibt es Hinweise darauf, dass lokale Präpositionen noch nicht sicher verwendet werden.",
      zh:
        "你的文本中显示，地点介词的使用还不够稳定。"
    },

    review: {
      de: [
        "Ort",
        "Richtung",
        "Herkunft"
      ],

      zh: [
        "位置",
        "方向",
        "来源"
      ]
    },

    priority: 85
  },

  // =========================================================
  // KAUSALE PRÄPOSITIONEN
  // =========================================================

  {
    id: "PREP_CAUSAL",

    parent: "PREPOSITIONS",

    family: "PREPOSITIONS",

    level: 2,

    learningTopic: {
      de: "Kausale Präpositionen",
      zh: "原因介词"
    },

    observableThrough: [
      "CAUSAL_PREPOSITION_FOUND"
    ],

    indicators: [
      "CAUSAL_PREPOSITION_UNCERTAIN"
    ],

    why: {
      de:
        "In deinem Text gibt es Hinweise darauf, dass Präpositionen zur Angabe eines Grundes noch nicht sicher verwendet werden.",
      zh:
        "你的文本中显示，表示原因的介词使用还不够稳定。"
    },

    review: {
      de: [
        "Gründe mit Präpositionen ausdrücken"
      ],

      zh: [
        "使用介词表达原因"
      ]
    },

    priority: 85
  },

  // =========================================================
  // MODALE PRÄPOSITIONEN
  // =========================================================

  {
    id: "PREP_MODAL",

    parent: "PREPOSITIONS",

    family: "PREPOSITIONS",

    level: 2,

    learningTopic: {
      de: "Modale Präpositionen",
      zh: "方式介词"
    },

    observableThrough: [
      "MODAL_PREPOSITION_FOUND"
    ],

    indicators: [
      "MODAL_PREPOSITION_UNCERTAIN"
    ],

    why: {
      de:
        "In deinem Text gibt es Hinweise darauf, dass modale Präpositionen noch nicht sicher verwendet werden.",
      zh:
        "你的文本中显示，表示方式的介词使用还不够稳定。"
    },

    review: {
      de: [
        "Art und Weise ausdrücken"
      ],

      zh: [
        "表达方式"
      ]
    },

    priority: 85
  },

  // =========================================================
  // SYNTAX
  // =========================================================

  {
    id: "SYNTAX_SUBORDINATE_VERB_POSITION",

    parent: "SYNTAX",

    family: "SYNTAX",

    level: 2,

    learningTopic: {
      de: "Verbposition im Nebensatz",
      zh: "从句中的动词位置"
    },

    observableThrough: [
      "SUBORDINATE_CLAUSE_FOUND",
      "SUBORDINATING_CONJUNCTION_FOUND"
    ],

    indicators: [
      "SUBORDINATE_VERB_POSITION_UNCERTAIN"
    ],

    why: {
      de:
        "In deinem Text gibt es Hinweise darauf, dass die Verbposition im Nebensatz noch nicht sicher ist.",
      zh:
        "你的文本中显示，从句中的动词位置还不够稳定。"
    },

    review: {
      de: [
        "Nebensätze",
        "Verbposition"
      ],

      zh: [
        "从句",
        "动词位置"
      ]
    },

    priority: 100
  },

  {
    id: "SYNTAX_SENTENCE_BRACKET",

    parent: "SYNTAX",

    family: "SYNTAX",

    level: 2,

    learningTopic: {
      de: "Satzklammer",
      zh: "句框结构"
    },

    observableThrough: [
      "MODAL_VERB_PATTERN",
      "PERFECT_PATTERN",
      "SEPARABLE_VERB_PATTERN"
    ],

    indicators: [
      "SENTENCE_BRACKET_UNCERTAIN"
    ],

    why: {
      de:
        "In deinem Text gibt es Hinweise darauf, dass die Satzklammer noch nicht sicher verwendet wird.",
      zh:
        "你的文本中显示，句框结构的使用还不够稳定。"
    },

    review: {
      de: [
        "Satzklammer",
        "mehrteilige Verbformen"
      ],

      zh: [
        "句框结构",
        "多部分动词形式"
      ]
    },

    priority: 95
  }
]);