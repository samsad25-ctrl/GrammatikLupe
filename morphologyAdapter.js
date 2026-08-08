const NOUN_LEXICON = Object.freeze({

  schwester: {
    lemma: "Schwester",
    pos: "NOUN",
    gender: "feminine",
    singular: "Schwester",
    plural: "Schwestern"
  },

  bruder: {
    lemma: "Bruder",
    pos: "NOUN",
    gender: "masculine",
    singular: "Bruder",
    plural: "Brüder"
  },

  buch: {
    lemma: "Buch",
    pos: "NOUN",
    gender: "neuter",
    singular: "Buch",
    plural: "Bücher"
  },

  freund: {
    lemma: "Freund",
    pos: "NOUN",
    gender: "masculine",
    singular: "Freund",
    plural: "Freunde"
  },

  freundin: {
    lemma: "Freundin",
    pos: "NOUN",
    gender: "feminine",
    singular: "Freundin",
    plural: "Freundinnen"
  },

  haus: {
    lemma: "Haus",
    pos: "NOUN",
    gender: "neuter",
    singular: "Haus",
    plural: "Häuser"
  }

});



function analyzeWord(
  word
) {

  const normalized =
    word.toLowerCase();



  const noun =
    NOUN_LEXICON[
      normalized
    ];



  if (noun) {

    return {

      value:
        word,

      morphology: {

        lemma:
          noun.lemma,

        pos:
          noun.pos,

        gender:
          noun.gender,

        number:
          "singular",

        singularForm:
          noun.singular,

        pluralForm:
          noun.plural

      }

    };

  }



  return {

    value:
      word,

    morphology: {

      lemma:
        normalized,

      pos:
        "UNKNOWN"

    }

  };

}