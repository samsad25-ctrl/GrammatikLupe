function parseNominalGroups(tokens) {

  const groups = [];

  let id = 1;


  tokens.forEach(
    (token, index) => {


      /*
       * Nur Determiner können
       * eine Nominalgruppe eröffnen
       */

      if (
        !PARSER_ARTICLES.includes(
          token.lower
        )
      ) {

        return;

      }



      const next =
        tokens[index + 1];


      const nextNext =
        tokens[index + 2];



      if (!next) {

        return;

      }



      const determiner =
        analyzeDeterminer(
          token.value
        );



      /*
       * Artikel + Nomen
       *
       * Beispiel:
       * die Stadt
       * meine Schwester
       */

      if (
        isLikelyNoun(next)
      ) {


        const nounInfo =
          analyzeWord(
            next.value
          );



        groups.push({

          id,


          text:
            `${token.value} ${next.value}`,


          start:
            token.index,


          end:
            next.index,


          sentenceIndex:
            token.sentenceIndex,



          /*
           * alte Struktur
           * bleibt erhalten
           */

          article: {

            value:
              token.value,

            type:
              detectArticleType(
                token.value
              )

          },



          /*
           * neue Grammatikschicht
           */

          determiner: {

            value:
              token.value,

            morphology:
              determiner

          },



          adjectives: [],



          noun: {

            value:
              next.value,

            morphology:
              nounInfo
                ? nounInfo.morphology
                : null

          },



          modifiers: []

        });



        id++;


        return;

      }



      /*
       * Artikel + Adjektiv + Nomen
       *
       * Beispiel:
       * die kleine Stadt
       */

      if (

        nextNext &&

        isLikelyAdjective(next) &&

        isLikelyNoun(nextNext)

      ) {


        const nounInfo =
          analyzeWord(
            nextNext.value
          );



        groups.push({

          id,


          text:
            `${token.value} ${next.value} ${nextNext.value}`,



          start:
            token.index,


          end:
            nextNext.index,



          sentenceIndex:
            token.sentenceIndex,



          article: {

            value:
              token.value,


            type:
              detectArticleType(
                token.value
              )

          },



          determiner: {

            value:
              token.value,


            morphology:
              determiner

          },



          adjectives: [

            next.value

          ],



          noun: {

            value:
              nextNext.value,


            morphology:
              nounInfo
                ? nounInfo.morphology
                : null

          },



          modifiers: []

        });



        id++;


      }


    }

  );


  return groups;

}





const PARSER_ARTICLES = [

  "der",
  "die",
  "das",

  "den",
  "dem",
  "des",

  "ein",
  "eine",
  "einen",
  "einem",
  "einer",
  "eines",

  "kein",
  "keine",
  "keinen",
  "keinem",
  "keiner",
  "keines",


  "mein",
  "meine",
  "meinen",
  "meinem",
  "meiner",
  "meines",


  "dein",
  "deine",
  "deinen",
  "deinem",
  "deiner",
  "deines",


  "sein",
  "seine",
  "seinen",
  "seinem",
  "seiner",
  "seines",


  "ihr",
  "ihre",
  "ihren",
  "ihrem",
  "ihrer",
  "ihres",


  "unser",
  "unsere",
  "unseren",
  "unserem",
  "unserer",
  "unseres",


  "euer",
  "eure",
  "euren",
  "eurem",
  "eurer",
  "eures"

];





function isLikelyNoun(token) {

  if (!token) {

    return false;

  }


  return /^[A-ZÄÖÜ]/u.test(
    token.value
  );

}





function isLikelyAdjective(token) {

  if (!token) {

    return false;

  }


  return /(e|en|er|es|em)$/u.test(
    token.lower
  );

}





function detectArticleType(
  value
) {

  const lower =
    value.toLowerCase();



  if (

    [

      "mein",
      "meine",
      "meinen",
      "meinem",
      "meiner",
      "meines",

      "dein",
      "deine",
      "deinen",
      "deinem",
      "deiner",
      "deines",

      "sein",
      "seine",
      "seinen",
      "seinem",
      "seiner",
      "seines",

      "ihr",
      "ihre",
      "ihren",
      "ihrem",
      "ihrer",
      "ihres",

      "unser",
      "unsere",
      "unseren",
      "unserem",
      "unserer",
      "unseres",

      "euer",
      "eure",
      "euren",
      "eurem",
      "eurer",
      "eures"

    ].includes(lower)

  ) {

    return "possessive";

  }



  if (

    [

      "ein",
      "eine",
      "einen",
      "einem",
      "einer",
      "eines"

    ].includes(lower)

  ) {

    return "indefinite";

  }



  return "definite";

}