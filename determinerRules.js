const DETERMINER_LEXICON = Object.freeze({

  /*
   * Bestimmte Artikel
   */

  der:{
    type:"definite",
    gender:"masculine",
    number:"singular",
    cases:[
      "nominative"
    ]
  },

  die:{
    type:"definite",
    gender:"feminine",
    number:"singular",
    cases:[
      "nominative",
      "accusative"
    ]
  },

  das:{
    type:"definite",
    gender:"neuter",
    number:"singular",
    cases:[
      "nominative",
      "accusative"
    ]
  },


  den:{
    type:"definite",
    gender:"masculine",
    number:"singular",
    cases:[
      "accusative"
    ]
  },


  dem:{
    type:"definite",
    gender:"masculine",
    number:"singular",
    cases:[
      "dative"
    ]
  },


  des:{
    type:"definite",
    gender:"masculine",
    number:"singular",
    cases:[
      "genitive"
    ]
  },


  /*
   * Unbestimmte Artikel
   */


  ein:{
    type:"indefinite",
    gender:"masculine",
    number:"singular",
    cases:[
      "nominative"
    ]
  },


  eine:{
    type:"indefinite",
    gender:"feminine",
    number:"singular",
    cases:[
      "nominative",
      "accusative"
    ]
  },


  einen:{
    type:"indefinite",
    gender:"masculine",
    number:"singular",
    cases:[
      "accusative"
    ]
  },


  einem:{
    type:"indefinite",
    gender:"masculine",
    number:"singular",
    cases:[
      "dative"
    ]
  },


  einer:{
    type:"indefinite",
    gender:"feminine",
    number:"singular",
    cases:[
      "dative",
      "genitive"
    ]
  },


  eines:{
    type:"indefinite",
    gender:"neuter",
    number:"singular",
    cases:[
      "genitive"
    ]
  },


  /*
   * Possessivartikel
   */


  mein:{
    type:"possessive",
    person:"first",
    number:"singular",
    features:{
      gender:"masculine",
      possibleCases:[
        "nominative"
      ]
    }
  },


  meine:{
    type:"possessive",
    person:"first",
    number:"singular",
    features:{
      gender:"feminine",
      possibleCases:[
        "nominative",
        "accusative"
      ]
    }
  },


  meinen:{
    type:"possessive",
    person:"first",
    number:"singular",
    features:{
      gender:"masculine",
      possibleCases:[
        "accusative"
      ]
    }
  },


  meinem:{
    type:"possessive",
    person:"first",
    number:"singular",
    features:{
      gender:"masculine",
      possibleCases:[
        "dative"
      ]
    }
  },


  meiner:{
    type:"possessive",
    person:"first",
    number:"singular",
    features:{
      gender:"feminine",
      possibleCases:[
        "dative",
        "genitive"
      ]
    }
  }


});



function analyzeDeterminer(
  word
){

  const normalized =
    word.toLowerCase();



  if(
    !DETERMINER_LEXICON[
      normalized
    ]
  ){

    return null;

  }



  return {

    value:
      word,

    lemma:
      normalized,

    ...DETERMINER_LEXICON[
      normalized
    ]

  };

}