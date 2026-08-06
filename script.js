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
      resultTitle: "Sprachliche Beobachtungen",
      noText: "Bitte füge zuerst einen Text ein.",
      wordSingular: "Wort",
      wordPlural: "Wörter",
      sentenceSingular: "Satz",
      sentencePlural: "Sätze",
      detected: "Erkannte Strukturen",
      articles: "Artikel",
      pronouns: "Pronomen",
      prepositions: "Präpositionen",
      conjunctions: "Konjunktionen",
      subordinate: "Nebensatzeinleiter",
      none: "keine erkannt",
      notice:
        "Diese Version beschreibt sprachliche Strukturen. Eine Kompetenzdiagnose wird im nächsten Entwicklungsschritt ergänzt."
    },

    zh: {
      subtitle: "德语学习者作文的诊断性分析工具",
      inputTitle: "输入作文",
      inputInstruction: "请将未经修改的德语原文粘贴到输入框中。",
      placeholder: "请在此处粘贴德语作文……",
      analyseButton: "开始分析",
      analysing: "正在分析……",
      resultTitle: "语言结构观察",
      noText: "请先输入一篇德语作文。",
      wordSingular: "个词",
      wordPlural: "个词",
      sentenceSingular: "个句子",
      sentencePlural: "个句子",
      detected: "识别到的语言结构",
      articles: "冠词",
      pronouns: "代词",
      prepositions: "介词",
      conjunctions: "连词",
      subordinate: "从句连接词",
      none: "未识别到",
      notice:
        "当前版本只描述文本中的语言结构。能力诊断将在下一开发阶段加入。"
    }
  };

  const wordGroups = {
    articles: [
      "der", "die", "das", "den", "dem", "des",
      "ein", "eine", "einen", "einem", "einer", "eines",
      "kein", "keine", "keinen", "keinem", "keiner", "keines"
    ],

    pronouns: [
      "ich", "du", "er", "sie", "es", "wir", "ihr",
      "mich", "dich", "ihn", "uns", "euch",
      "mir", "dir", "ihm", "ihnen",
      "mein", "dein", "sein", "unser", "euer"
    ],

    prepositions: [
      "an", "auf", "aus", "bei", "durch", "für",
      "gegen", "hinter", "in", "mit", "nach", "neben",
      "ohne", "über", "um", "unter", "von", "vor",
      "zu", "zwischen", "seit", "während", "wegen"
    ],

    conjunctions: [
      "aber", "denn", "oder", "sondern", "und",
      "deshalb", "darum", "trotzdem", "danach"
    ],

    subordinate: [
      "als", "bevor", "bis", "da", "damit", "dass",
      "falls", "nachdem", "ob", "obwohl", "seitdem",
      "sobald", "solange", "während", "weil", "wenn"
    ]
  };

  let currentLanguage = "de";
  let lastAnalysis = null;

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

  function getWords(text) {
    return text.match(/\p{L}+(?:['’-]\p{L}+)*|\d+/gu) || [];
  }

  function countSentences(text) {
    return text
      .split(/[.!?]+/)
      .map(sentence => sentence.trim())
      .filter(Boolean)
      .length;
  }

  function findWords(words, vocabulary) {
    const lowerCaseWords = words.map(word => word.toLowerCase());

    return [...new Set(
      lowerCaseWords.filter(word => vocabulary.includes(word))
    )];
  }

  function createAnalysis(text) {
    const words = getWords(text);

    return {
      wordCount: words.length,
      sentenceCount: countSentences(text),
      articles: findWords(words, wordGroups.articles),
      pronouns: findWords(words, wordGroups.pronouns),
      prepositions: findWords(words, wordGroups.prepositions),
      conjunctions: findWords(words, wordGroups.conjunctions),
      subordinate: findWords(words, wordGroups.subordinate)
    };
  }

  function formatList(items, language) {
    return items.length > 0
      ? items.join(", ")
      : language.none;
  }

  function renderAnalysis() {
    if (!lastAnalysis) {
      return;
    }

    const language = translations[currentLanguage];
    const analysis = lastAnalysis;

    const wordLabel =
      currentLanguage === "de" && analysis.wordCount === 1
        ? language.wordSingular
        : language.wordPlural;

    const sentenceLabel =
      currentLanguage === "de" && analysis.sentenceCount === 1
        ? language.sentenceSingular
        : language.sentencePlural;

    resultTitle.textContent = language.resultTitle;

    resultMessage.innerHTML = `
      <p>
        <strong>${analysis.wordCount} ${wordLabel}</strong>
        ·
        <strong>${analysis.sentenceCount} ${sentenceLabel}</strong>
      </p>

      <h3>${language.detected}</h3>

      <ul>
        <li>
          <strong>${language.articles}:</strong>
          ${formatList(analysis.articles, language)}
        </li>

        <li>
          <strong>${language.pronouns}:</strong>
          ${formatList(analysis.pronouns, language)}
        </li>

        <li>
          <strong>${language.prepositions}:</strong>
          ${formatList(analysis.prepositions, language)}
        </li>

        <li>
          <strong>${language.conjunctions}:</strong>
          ${formatList(analysis.conjunctions, language)}
        </li>

        <li>
          <strong>${language.subordinate}:</strong>
          ${formatList(analysis.subordinate, language)}
        </li>
      </ul>

      <p><em>${language.notice}</em></p>
    `;
  }

  function updateWordCounter() {
    const numberOfWords = getWords(studentText.value).length;
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

    updateWordCounter();
    renderAnalysis();
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
      lastAnalysis = createAnalysis(text);
      resultSection.hidden = false;
      renderAnalysis();

      analyseButton.disabled = false;
      analyseButton.textContent = language.analyseButton;

      resultSection.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }, 400);
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
