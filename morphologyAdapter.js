const TEST_MORPHOLOGY = {

  "Schwester": {
    lemma: "Schwester",
    pos: "NOUN",
    gender: "fem",
    number: "singular",
    plural: "Schwestern"
  },

  "Stadt": {
    lemma: "Stadt",
    pos: "NOUN",
    gender: "fem",
    number: "singular",
    plural: "Städte"
  },

  "Freund": {
    lemma: "Freund",
    pos: "NOUN",
    gender: "mask",
    number: "singular",
    plural: "Freunde"
  },

  "Buch": {
    lemma: "Buch",
    pos: "NOUN",
    gender: "neut",
    number: "singular",
    plural: "Bücher"
  }

};


function analyzeWord(word) {

  return (
    TEST_MORPHOLOGY[word]
    ||
    null
  );

}