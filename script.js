document.addEventListener(
  "DOMContentLoaded",
  () => {

    const translations = {

      de: {

        subtitle:
          "Diagnostische Analyse für deutsche Lernertexte",

        inputTitle:
          "Text eingeben",

        inputInstruction:
          "Füge deinen unveränderten deutschen Text in das Feld ein.",

        placeholder:
          "Füge deinen Text hier ein …",

        analyseButton:
          "Text analysieren",

        analysing:
          "Analyse läuft …",

        resultTitle:
          "Empfohlene Themen zum Wiederholen",

        noText:
          "Bitte füge zuerst einen Text ein.",

        noDiagnosis:
          "Für diesen Text wurde noch kein konkretes Wiederholungsthema erkannt.",

        noDiagnosisNote:
          "Das bedeutet nicht, dass alle Bereiche sicher sind. Für eine Empfehlung müssen genügend sprachliche Hinweise vorhanden sein.",

        whyTitle:
          "Warum dieses Thema?",

        reviewTitle:
          "Das solltest du wiederholen",

        observedTitle:
          "Beobachtet im Text",

        observedLabel:
          "Beobachtet",

        expectedLabel:
          "Erwartete Form",

        wordSingular:
          "Wort",

        wordPlural:
          "Wörter"

      },


      zh: {

        subtitle:
          "德语学习者作文的诊断性分析工具",

        inputTitle:
          "输入作文",

        inputInstruction:
          "请将未经修改的德语原文粘贴到输入框中。",

        placeholder:
          "请在此处粘贴德语作文……",

        analyseButton:
          "开始分析",

        analysing:
          "正在分析……",

        resultTitle:
          "建议复习的主题",

        noText:
          "请先输入一篇德语作文。",

        noDiagnosis:
          "目前还没有识别出明确需要复习的主题。",

        noDiagnosisNote:
          "这并不表示所有语法领域都已经掌握。系统需要足够的语言线索才能提出学习建议。",

        whyTitle:
          "为什么建议这个主题？",

        reviewTitle:
          "建议复习",

        observedTitle:
          "文本中的观察",

        observedLabel:
          "观察到",

        expectedLabel:
          "建议形式",

        wordSingular:
          "个词",

        wordPlural:
          "个词"

      }

    };


    let currentLanguage =
      "de";


    let lastAnalysis =
      null;


    let lastDiagnoses =
      [];



    const btnDeutsch =
      document.getElementById(
        "btnDeutsch"
      );


    const btnChinesisch =
      document.getElementById(
        "btnChinesisch"
      );


    const subtitle =
      document.getElementById(
        "subtitle"
      );


    const inputTitle =
      document.getElementById(
        "inputTitle"
      );


    const inputInstruction =
      document.getElementById(
        "inputInstruction"
      );


    const studentText =
      document.getElementById(
        "studentText"
      );


    const wordCounter =
      document.getElementById(
        "wordCounter"
      );


    const analyseButton =
      document.getElementById(
        "analyseButton"
      );


    const resultSection =
      document.getElementById(
        "resultSection"
      );


    const resultTitle =
      document.getElementById(
        "resultTitle"
      );


    const resultMessage =
      document.getElementById(
        "resultMessage"
      );
          function countWords(text) {

      const matches =
        text.match(
          /\p{L}+(?:['’-]\p{L}+)*|\d+/gu
        );


      return matches
        ? matches.length
        : 0;

    }



    function updateWordCounter() {

      const count =
        countWords(
          studentText.value
        );


      const language =
        translations[
          currentLanguage
        ];


      if (
        currentLanguage === "de"
      ) {

        const label =
          count === 1
            ? language.wordSingular
            : language.wordPlural;


        wordCounter.textContent =
          `${count} ${label}`;


        return;

      }


      wordCounter.textContent =
        `${count} ${language.wordPlural}`;

    }




    function renderReviewList(
      items
    ) {

      if (
        !Array.isArray(items) ||
        items.length === 0
      ) {

        return "";

      }


      return `

        <ul>

          ${
            items
              .map(
                item =>
                  `<li>${item}</li>`
              )
              .join("")
          }

        </ul>

      `;

    }




    function renderEvidence(
      evidence
    ) {

      const language =
        translations[
          currentLanguage
        ];


      if (
        !Array.isArray(evidence) ||
        evidence.length === 0
      ) {

        return "";

      }



      const uniqueEvidence =
        [];


      const seen =
        new Set();



      evidence.forEach(
        observation => {

          const details =
            observation.details || {};



          const observed =
            details.textFragment ||
            observation.token ||
            "";



          const expected =
            details.expectedForm ||
            "";



          const explanation =
            details.explanation &&
            details.explanation[
              currentLanguage
            ]
              ? details.explanation[
                  currentLanguage
                ]
              : "";



          const key =
            [
              observed,
              expected,
              explanation
            ].join("::");



          if (
            seen.has(key)
          ) {

            return;

          }


          seen.add(key);



          uniqueEvidence.push({

            observed,

            expected,

            explanation

          });

        }

      );



      const evidenceItems =
        uniqueEvidence
          .map(
            item => `

              <li class="evidence-item">


                <div class="observed-block">

                  <span class="evidence-label">

                    ${language.observedLabel}

                  </span>


                  <code class="observed-form">

                    ${item.observed}

                  </code>


                </div>



                ${
                  item.expected

                    ? `

                    <div class="expected-block">

                      <span class="expected-label">

                        ${language.expectedLabel}

                      </span>


                      <code class="expected-form">

                        ${item.expected}

                      </code>


                    </div>

                    `

                    : ""

                }



                ${
                  item.explanation

                    ? `

                    <p class="evidence-explanation">

                      ${item.explanation}

                    </p>

                    `

                    : ""

                }


              </li>

            `
          )
          .join("");



      if (
        !evidenceItems
      ) {

        return "";

      }



      return `

        <div class="evidence">

          <strong>

            ${language.observedTitle}

          </strong>


          <ul class="evidence-list">

            ${evidenceItems}

          </ul>


        </div>

      `;

    }
        function renderTopicCard(
      result
    ) {

      const language =
        translations[
          currentLanguage
        ];


      const topic =
        result.learningTopic &&
        result.learningTopic[
          currentLanguage
        ]
          ? result.learningTopic[
              currentLanguage
            ]
          : result.id;



      const why =
        result.why &&
        result.why[
          currentLanguage
        ]
          ? result.why[
              currentLanguage
            ]
          : "";



      const review =
        result.review &&
        result.review[
          currentLanguage
        ]
          ? result.review[
              currentLanguage
            ]
          : [];



      return `

        <article class="diagnosis-card">


          <h3>
            ${topic}
          </h3>


          ${renderEvidence(
            result.evidence
          )}



          ${
            why

              ? `

              <div class="topic-reason">

                <strong>
                  ${language.whyTitle}
                </strong>


                <p>
                  ${why}
                </p>


              </div>

              `

              : ""

          }



          <div class="recommendation">

            <strong>
              ${language.reviewTitle}
            </strong>


            ${renderReviewList(
              review
            )}

          </div>


        </article>

      `;

    }




    function renderResults() {

      const language =
        translations[
          currentLanguage
        ];



      resultTitle.textContent =
        language.resultTitle;



      if (
        lastDiagnoses.length === 0
      ) {


        resultMessage.innerHTML = `

          <div class="no-diagnosis">

            <p>

              <strong>

                ${language.noDiagnosis}

              </strong>

            </p>


            <p>

              ${language.noDiagnosisNote}

            </p>


          </div>

        `;


        return;

      }



      resultMessage.innerHTML =
        lastDiagnoses
          .map(
            renderTopicCard
          )
          .join("");

    }




    function changeLanguage(
      languageCode
    ) {


      currentLanguage =
        languageCode;



      const language =
        translations[
          languageCode
        ];



      document.documentElement.lang =
        languageCode === "de"
          ? "de"
          : "zh-CN";



      subtitle.textContent =
        language.subtitle;


      inputTitle.textContent =
        language.inputTitle;


      inputInstruction.textContent =
        language.inputInstruction;


      studentText.placeholder =
        language.placeholder;


      analyseButton.textContent =
        language.analyseButton;



      btnDeutsch.classList.toggle(
        "active",
        languageCode === "de"
      );


      btnChinesisch.classList.toggle(
        "active",
        languageCode === "zh"
      );



      updateWordCounter();



      if (
        lastAnalysis
      ) {

        renderResults();

      }

    }




    function analyseText() {


      const language =
        translations[
          currentLanguage
        ];



      const text =
        studentText.value.trim();



      if (
        text === ""
      ) {


        window.alert(
          language.noText
        );


        studentText.focus();


        return;

      }



      analyseButton.disabled =
        true;



      analyseButton.textContent =
        language.analysing;



      window.setTimeout(

        () => {


          try {


            lastAnalysis =
              parseText(
                text
              );



            lastDiagnoses =
              runDiagnosis(
                lastAnalysis
              );



            /*
             * Debug-Zugriff
             * in der Browser-Konsole
             */

            window.lastAnalysis =
              lastAnalysis;


            window.lastDiagnoses =
              lastDiagnoses;



            console.log(
              "ANALYSIS:",
              lastAnalysis
            );


            console.log(
              "OBSERVATIONS:",
              lastAnalysis.observations
            );


            console.log(
              "LEARNING TOPICS:",
              lastDiagnoses
            );



            resultSection.hidden =
              false;



            renderResults();



            resultSection.scrollIntoView({

              behavior:
                "smooth",

              block:
                "start"

            });



          }

          catch(error) {


            console.error(
              "Fehler bei der GrammatikLupe-Analyse:",
              error
            );



            resultSection.hidden =
              false;



            resultTitle.textContent =
              "Technischer Hinweis";



            resultMessage.textContent =
              "Die Analyse konnte nicht ausgeführt werden. Bitte prüfe die Browser-Konsole.";

          }



          finally {


            analyseButton.disabled =
              false;



            analyseButton.textContent =
              translations[
                currentLanguage
              ].analyseButton;


          }


        },

        100

      );


    }




    btnDeutsch.addEventListener(
      "click",
      () => {

        changeLanguage(
          "de"
        );

      }
    );



    btnChinesisch.addEventListener(
      "click",
      () => {

        changeLanguage(
          "zh"
        );

      }
    );



    studentText.addEventListener(
      "input",
      updateWordCounter
    );



    analyseButton.addEventListener(
      "click",
      analyseText
    );



    changeLanguage(
      "de"
    );


  }
);