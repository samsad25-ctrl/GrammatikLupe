const DETERMINER_LEXICON = Object.freeze({

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


  mein:{
    type:"possessive",
    person:"first",
    gender:"masculine",
    number:"singular",
    cases:[
      "nominative"
    ]
  },


  meine:{
    type:"possessive",
    person:"first",
    gender:"feminine",
    number:"singular",
    cases:[
      "nominative",
      "accusative"
    ]
  },


  meinen:{
    type:"possessive",
    person:"first",
    gender:"masculine",
    number:"singular",
    cases:[
      "accusative"
    ]
  },


  meinem:{
    type:"possessive",
    person:"first",
    gender:"masculine",
    number:"singular",
    cases:[
      "dative"
    ]
  },


  meiner:{
    type:"possessive",
    person:"first",
    gender:"feminine",
    number:"singular",
    cases:[
      "dative",
      "genitive"
    ]
  }

});



function analyzeDeterminer(
  word
){

  const normalized =
    word.toLowerCase();


  const entry =
    DETERMINER_LEXICON[
      normalized
    ];


  if(!entry){

    return null;

  }


  return {

    value:
      word,

    morphology:
      entry

  };

}