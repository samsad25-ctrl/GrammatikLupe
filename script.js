document.addEventListener("DOMContentLoaded", () => {
  const translations = {
    de: {
      subtitle: "Diagnostische Analyse für deutsche Lernertexte",
      inputTitle: "Text eingeben",
      inputInstruction:
        "Füge deinen unveränderten deutschen Text in das Feld ein.",
      placeholder: "Füge deinen Text hier ein …",
      analyseButton: "Text analysieren",
      analysing: "Analyse läuft …",
      resultTitle: "Diagnose",
      noText: "Bitte füge zuerst einen Text ein.",
      finished:
        "Die Texteingabe funktioniert. Die grammatische Diagnostik wird als Nächstes ergänzt.",
      wordSingular: "Wort",
      wordPlural: "Wörter"
    },

    zh: {
      subtitle: "德语学习者作文的诊断性分析工具",
      inputTitle: "输入作文",
      inputInstruction: "请将未经修改的德语原文粘贴到输入框中。",
      placeholder: "请在此处粘贴德语作文……",
      analyseButton: "开始分析",
      analysing: "正在分析……",
      resultTitle: "诊断结果",
      noText: "请先输入一篇德语作文。",
      finished: "文本输入功能正常。下一步将加入语法诊断功能。",
      wordSingular: "个词",
      wordPlural: "个词"
    }
  };

  let currentLanguage = "de";

  const btnDeutsch = document.getElementById("btnDeutsch");
  const btnChinesisch = document.getElementById("btnChinesisch");
  const subtitle = document.getElementById("subtitle");
  const inputTitle = document.getElementById("inputTitle");
  const inputInstruction =
    document.getElementById("inputInstruction");
  const studentText = document.getElementById("studentText");
  const wordCounter = document.getElementById("wordCounter");
  const analyseButton =
    document.getElementById("analyseButton");
  const resultSection =
    document.getElementById("resultSection");
  const resultTitle = document.getElementById("resultTitle");
  const resultMessage =
    document.getElementById("resultMessage");

  function countWords(text) {
    const cleanedText = text.trim();

    if (cleanedText === "") {
      return 0;
    }

    return cleanedText.split(/\s+/).length;
  }

  function updateWordCounter() {
    const numberOfWords = countWords(studentText.value);
    const language = translations[currentLanguage];

    if (currentLanguage === "de") {
      const label =
        numberOfWords === 1
          ? language.wordSingular
          : language.wordPlural;

      wordCounter.textContent = `${numberOfWords} ${label}`;
    } else {
      wordCounter.textContent =
        `${numberOfWords} ${language.wordPlural}`;
    }
  }

  function changeLanguage(languageCode) {
    currentLanguage = languageCode;

    const language = translations[languageCode];

    document.documentElement.lang =
      languageCode === "de" ? "de" : "zh-CN";

    subtitle.textContent = language.subtitle;
    inputTitle.textContent = language.inputTitle;
    inputInstruction.textContent =
      language.inputInstruction;
    studentText.placeholder = language.placeholder;
    analyseButton.textContent = language.analyseButton;
    resultTitle.textContent = language.resultTitle;

    updateWordCounter();
  }

  function analyseText() {
    const language = translations[currentLanguage];
    const text = studentText.value.trim();

    if (text === "") {
      window.alert(language.noText);
      studentText.focus();
      return;
    }

    analyseButton.disabled = true;
    analyseButton.textContent = language.analysing;

    window.setTimeout(() => {
      resultSection.hidden = false;
      resultMessage.textContent = language.finished;

      analyseButton.disabled = false;
      analyseButton.textContent = language.analyseButton;

      resultSection.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }, 700);
  }

  btnDeutsch.addEventListener("click", () => {
    changeLanguage("de");
  });

  btnChinesisch.addEventListener("click", () => {
    changeLanguage("zh");
  });

  studentText.addEventListener("input", updateWordCounter);
  analyseButton.addEventListener("click", analyseText);

  changeLanguage("de");
});
