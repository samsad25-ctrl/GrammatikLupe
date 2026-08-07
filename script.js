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
        !Array.isArray(items)
      ) {
        return "";
      }

      return `
        <ul>
          ${items
            .map(
              item =>
                `<li>${item}</li>`
            )
            .join("")}
        </ul>
      `;
    }

function renderTopicCard(
  result
) {
  const language =
    translations[
      currentLanguage
    ];

  const examples =
    (result.evidence || [])
      .map(observation => {
        if (
          observation.details &&
          observation.details.textFragment
        ) {
          return observation.details.textFragment;
        }

        return observation.token;
      })
      .filter(Boolean);

  const uniqueExamples =
    [...new Set(examples)];

  const examplesHtml =
    uniqueExamples.length > 0
      ? `
        <div class="evidence">

          <strong>
            ${
              currentLanguage === "de"
                ? "Beobachtet im Text"
                : "文本中的例子"
            }
          </strong>

          <ul>
            ${uniqueExamples
              .map(
                example =>
                  `<li><code>${example}</code></li>`
              )
              .join("")}
          </ul>

        </div>
      `
      : "";

  return `
    <article class="diagnosis-card">

      <h3>
        ${
          result.learningTopic[
            currentLanguage
          ]
        }
      </h3>

      ${examplesHtml}

      <div class="topic-reason">

        <strong>
          ${language.whyTitle}
        </strong>

        <p>
          ${
            result.why[
              currentLanguage
            ]
          }
        </p>

      </div>

      <div class="recommendation">

        <strong>
          ${language.reviewTitle}
        </strong>

        ${renderReviewList(
          result.review[
            currentLanguage
          ]
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

      if (lastAnalysis) {
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

      if (text === "") {
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
              parseText(text);

            lastDiagnoses =
              runDiagnosis(
                lastAnalysis
              );

            /*
             * Debug bleibt vorerst aktiv.
             */
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

            resultSection
              .scrollIntoView({
                behavior:
                  "smooth",

                block:
                  "start"
              });
          } catch (error) {
            console.error(
              "Fehler bei der GrammatikLupe-Analyse:",
              error
            );

            resultSection.hidden =
              false;

            resultTitle.textContent =
              currentLanguage ===
              "de"
                ? "Technischer Hinweis"
                : "技术提示";

            resultMessage.textContent =
              currentLanguage ===
              "de"
                ? "Die Analyse konnte nicht ausgeführt werden. Bitte prüfe die Browser-Konsole."
                : "分析无法运行。请检查浏览器控制台。";
          } finally {
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
        changeLanguage("de");
      }
    );

    btnChinesisch.addEventListener(
      "click",
      () => {
        changeLanguage("zh");
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

    changeLanguage("de");
  }
);