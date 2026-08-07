const LEARNING_TOPICS = Object.freeze([
  {
    id: "PREP_FIXED_DATIVE",

    family: "PREPOSITIONS",
    parent: "PREPOSITIONS",
    level: 2,

    learningTopic: {
      de: "Präpositionen mit festem Dativ",
      zh: "固定要求第三格的介词"
    },

    observableThrough: [
      OBS.PREPOSITION_ARTICLE_PATTERN
    ],

    indicators: [
      OBS.FIXED_DATIVE_PREPOSITION_UNCERTAIN
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

    family: "PREPOSITIONS",
    parent: "PREPOSITIONS",
    level: 2,

    learningTopic: {
      de: "Präpositionen mit festem Akkusativ",
      zh: "固定要求第四格的介词"
    },

    observableThrough: [
      OBS.PREPOSITION_ARTICLE_PATTERN
    ],

    indicators: [
      OBS.FIXED_ACCUSATIVE_PREPOSITION_UNCERTAIN
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

  {
    id: "PREP_TWO_WAY_DIRECTION",

    family: "PREPOSITIONS",
    parent: "PREP_TWO_WAY",
    level: 3,

    learningTopic: {
      de:
        "Wechselpräpositionen bei Richtungsangaben",
      zh:
        "表示方向的双向介词"
    },

    observableThrough: [
      OBS.TWO_WAY_PREPOSITION_DIRECTION
    ],

    indicators: [
      OBS.TWO_WAY_DIRECTION_UNCERTAIN
    ],

    why: {
      de:
        "In deinem Text gibt es Hinweise darauf, dass Wechselpräpositionen bei Richtungsangaben noch nicht sicher verwendet werden.",
      zh:
        "你的文本中显示，表示方向时双向介词的使用还不够稳定。"
    },

    review: {
      de: [
        "Wechselpräpositionen",
        "Richtungsangaben",
        "Wohin?",
        "Akkusativ bei Richtungsangaben"
      ],

      zh: [
        "双向介词",
        "方向表达",
        "Wohin?",
        "方向表达中的第四格"
      ]
    },

    priority: 115
  },

  {
    id: "PREP_TWO_WAY_LOCATION",

    family: "PREPOSITIONS",
    parent: "PREP_TWO_WAY",
    level: 3,

    learningTopic: {
      de:
        "Wechselpräpositionen bei Ortsangaben",
      zh:
        "表示位置的双向介词"
    },

    observableThrough: [
      OBS.TWO_WAY_PREPOSITION_LOCATION
    ],

    indicators: [
      OBS.TWO_WAY_LOCATION_UNCERTAIN
    ],

    why: {
      de:
        "In deinem Text gibt es Hinweise darauf, dass Wechselpräpositionen bei Ortsangaben noch nicht sicher verwendet werden.",
      zh:
        "你的文本中显示，表示位置时双向介词的使用还不够稳定。"
    },

    review: {
      de: [
        "Wechselpräpositionen",
        "Ortsangaben",
        "Wo?",
        "Dativ bei Ortsangaben"
      ],

      zh: [
        "双向介词",
        "位置表达",
        "Wo?",
        "位置表达中的第三格"
      ]
    },

    priority: 115
  }
]);