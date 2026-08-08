const CASE_RULES = Object.freeze({

  dativePrepositions: [

    "aus",
    "bei",
    "mit",
    "nach",
    "seit",
    "von",
    "zu",
    "gegenüber"

  ],


  accusativePrepositions: [

    "durch",
    "für",
    "gegen",
    "ohne",
    "um"

  ],


  genitivePrepositions: [

    "wegen",
    "trotz",
    "während"

  ],


  twoWayPrepositions: [

    "an",
    "auf",
    "hinter",
    "in",
    "neben",
    "über",
    "unter",
    "vor",
    "zwischen"

  ]

});





/*
============================================================
KASUS ERMITTLUNG
============================================================
*/


function getRequiredCase(
  preposition
){

  const lower =
    preposition.toLowerCase();


  if(
    CASE_RULES
      .dativePrepositions
      .includes(lower)
  ){

    return "Dativ";

  }



  if(
    CASE_RULES
      .accusativePrepositions
      .includes(lower)
  ){

    return "Akkusativ";

  }



  if(
    CASE_RULES
      .genitivePrepositions
      .includes(lower)
  ){

    return "Genitiv";

  }


  return null;

}





/*
============================================================
DETERMINER MORPHOLOGIE
============================================================
*/


function getDeterminerMorphology(
  token
){

  if(!token){

    return null;

  }



  const result =
    analyzeDeterminer(
      token.value
    );



  if(!result){

    return null;

  }



  return result.morphology;

}





function determinerAllowsCase(
  morphology,
  requiredCase
){

  if(
    !morphology
  ){

    return false;

  }



  if(
    !Array.isArray(
      morphology.cases
    )
  ){

    return false;

  }



  return morphology.cases.includes(

    requiredCase.toLowerCase()

  );

}





/*
============================================================
ERWARTETE FORM
============================================================
*/


function getExpectedDeterminer(
  determiner,
  requiredCase
){

  const lower =
    determiner.toLowerCase();



  const dative = {


    "die":
      "der",

    "das":
      "dem",


    "ein":
      "einem",

    "eine":
      "einer",


    "kein":
      "keinem",

    "keine":
      "keiner",



    "mein":
      "meinem",

    "meine":
      "meiner",

    "meinen":
      "meinem",



    "dein":
      "deinem",

    "deine":
      "deiner",

    "deinen":
      "deinem",



    "sein":
      "seinem",

    "seine":
      "seiner",

    "seinen":
      "seinem",



    "ihr":
      "ihrem",

    "ihre":
      "ihrer",

    "ihren":
      "ihrem",



    "unser":
      "unserem",

    "unsere":
      "unserer",



    "euer":
      "eurem",

    "eure":
      "eurer"


  };





  const accusative = {


    "der":
      "den",


    "ein":
      "einen",


    "kein":
      "keinen",


    "mein":
      "meinen",


    "dein":
      "deinen",


    "sein":
      "seinen",


    "ihr":
      "ihren",


    "unser":
      "unseren",


    "euer":
      "euren"


  };





  if(
    requiredCase === "Dativ"
  ){

    return (
      dative[lower]
      ||
      null
    );

  }





  if(
    requiredCase === "Akkusativ"
  ){

    return (
      accusative[lower]
      ||
      null
    );

  }



  return null;

}
/*
============================================================
OBSERVATION ERZEUGEN
============================================================
*/


function createCaseObservation({

  prepositionToken,

  determinerToken,

  nounToken,

  requiredCase

}) {


  const expectedDeterminer =
    getExpectedDeterminer(

      determinerToken.value,

      requiredCase

    );



  const fragmentParts = [

    prepositionToken.value,

    determinerToken.value

  ];



  if(nounToken){

    fragmentParts.push(
      nounToken.value
    );

  }



  const textFragment =
    fragmentParts.join(" ");




  let expectedForm =
    null;



  if(expectedDeterminer){


    const expectedParts = [

      prepositionToken.value,

      expectedDeterminer

    ];



    if(nounToken){

      expectedParts.push(
        nounToken.value
      );

    }



    expectedForm =
      expectedParts.join(" ");

  }




  return {

    type:

      requiredCase === "Dativ"

        ? OBS.FIXED_DATIVE_PREPOSITION_UNCERTAIN

        : OBS.FIXED_ACCUSATIVE_PREPOSITION_UNCERTAIN,



    token:
      prepositionToken.value,



    tokenIndex:
      prepositionToken.index,



    sentenceIndex:
      prepositionToken.sentenceIndex,



    characterStart:
      prepositionToken.characterStart,



    characterEnd:

      nounToken

        ? nounToken.characterEnd

        : determinerToken.characterEnd,



    details: {


      preposition:
        prepositionToken.value,


      determiner:
        determinerToken.value,


      noun:

        nounToken

          ? nounToken.value

          : null,



      requiredCase,



      textFragment,



      expectedForm,



      explanation: {


        de:

          `Die Präposition «${prepositionToken.value}» verlangt hier den ${requiredCase}.`,



        zh:

          `介词“${prepositionToken.value}”在这里要求${requiredCase}。`

      }

    }

  };

}





/*
============================================================
HAUPTREGEL
============================================================
*/


function applyCaseRules(
  text,
  tokens
){

  const observations = [];



  tokens.forEach(
    (token,index)=>{


      const determinerToken =
        tokens[index + 1];



      const nounToken =
        tokens[index + 2];



      if(!determinerToken){

        return;

      }




      /*
       * Keine Prüfung über Satzgrenzen
       */

      if(

        token.sentenceIndex !==

        determinerToken.sentenceIndex

      ){

        return;

      }




      const requiredCase =
        getRequiredCase(
          token.lower
        );



      if(!requiredCase){

        return;

      }




      const determinerMorphology =
        getDeterminerMorphology(
          determinerToken
        );



      if(!determinerMorphology){

        return;

      }




      /*
       * Prüfen:
       *
       * Kann der Determiner
       * diesen Kasus?
       */


      const valid =
        determinerAllowsCase(

          determinerMorphology,

          requiredCase

        );




      if(!valid){


        observations.push(

          createCaseObservation({

            prepositionToken:
              token,


            determinerToken:
              determinerToken,


            nounToken:
              nounToken,


            requiredCase

          })

        );


      }



    }

  );



  return observations;

}