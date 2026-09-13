// ---------------------------------------------------------
// Ungefärlig omvandling hund-år -> människo-år.
//
// Detta är en vanlig tumregel (inte en exakt vetenskaplig
// formel): hundens första år motsvarar ~15 människoår, år två
// lägger på ytterligare ~9 (mindre för jättehundar), och varje
// år därefter räknas olika beroende på hundens storlek.
// ---------------------------------------------------------

const HUMAN_AGE_AT_YEAR_2 = { small: 24, medium: 24, large: 24, giant: 22 };
const HUMAN_YEARS_PER_DOG_YEAR_AFTER_2 = { small: 4, medium: 5, large: 6, giant: 7 };

function calculateHumanAge(dogYears, size) {
  if (dogYears <= 0) return 0;

  if (dogYears <= 1) {
    // Linjär interpolation mellan 0 och 15 för första året
    return 15 * dogYears;
  }

  const ageAtYear2 = HUMAN_AGE_AT_YEAR_2[size];

  if (dogYears <= 2) {
    // Linjär interpolation mellan år 1 (15) och år 2 (t.ex. 24)
    return 15 + (ageAtYear2 - 15) * (dogYears - 1);
  }

  const perYearAfter = HUMAN_YEARS_PER_DOG_YEAR_AFTER_2[size];
  return ageAtYear2 + perYearAfter * (dogYears - 2);
}

function describeStage(humanAge, t) {
  if (humanAge < 13) return t.stagePuppy;
  if (humanAge < 20) return t.stageTeen;
  if (humanAge < 40) return t.stageYoungAdult;
  if (humanAge < 60) return t.stageMiddle;
  return t.stageSenior;
}

// ---------------------------------------------------------
// Översättningar. Viktenheterna följer respektive lands
// etablerade standard: kg för Sverige/Storbritannien/
// Tyskland/Frankrike, pund (lbs) för USA.
// ---------------------------------------------------------

const translations = {
  sv: {
    flag: "🇸🇪",
    title: "🐶 Hundålder-kalkylator",
    subtitle: "Räkna ut din hunds ålder i \"människoår\"",
    ageLabel: "Hundens ålder (år)",
    agePlaceholder: "t.ex. 3",
    sizeLabel: "Hundens storlek",
    sizeSmall: "Liten (upp till 10 kg)",
    sizeMedium: "Mellan (10–25 kg)",
    sizeLarge: "Stor (25–40 kg)",
    sizeGiant: "Jätte (över 40 kg)",
    submit: "Beräkna",
    error: "Ange en giltig ålder (0 eller högre).",
    resultSuffix: "människoår",
    stagePuppy: "Fortfarande i valp-/barnstadiet!",
    stageTeen: "Ungefär som en tonåring.",
    stageYoungAdult: "Ung vuxen, i sina bästa år.",
    stageMiddle: "Medelålders, lugn och trygg.",
    stageSenior: "En senior med livserfarenhet.",
  },
  "en-GB": {
    flag: "🇬🇧",
    title: "🐶 Dog Age Calculator",
    subtitle: "Work out your dog's age in \"human years\"",
    ageLabel: "Dog's age (years)",
    agePlaceholder: "e.g. 3",
    sizeLabel: "Dog's size",
    sizeSmall: "Small (up to 10 kg)",
    sizeMedium: "Medium (10–25 kg)",
    sizeLarge: "Large (25–40 kg)",
    sizeGiant: "Giant (over 40 kg)",
    submit: "Calculate",
    error: "Please enter a valid age (0 or higher).",
    resultSuffix: "human years",
    stagePuppy: "Still in the puppy/childhood stage!",
    stageTeen: "About like a teenager.",
    stageYoungAdult: "Young adult, in their prime.",
    stageMiddle: "Middle-aged, calm and settled.",
    stageSenior: "A senior with plenty of life experience.",
  },
  "en-US": {
    flag: "🇺🇸",
    title: "🐶 Dog Age Calculator",
    subtitle: "Work out your dog's age in \"human years\"",
    ageLabel: "Dog's age (years)",
    agePlaceholder: "e.g. 3",
    sizeLabel: "Dog's size",
    sizeSmall: "Small (up to 22 lbs)",
    sizeMedium: "Medium (22–55 lbs)",
    sizeLarge: "Large (55–88 lbs)",
    sizeGiant: "Giant (over 88 lbs)",
    submit: "Calculate",
    error: "Please enter a valid age (0 or higher).",
    resultSuffix: "human years",
    stagePuppy: "Still in the puppy/childhood stage!",
    stageTeen: "About like a teenager.",
    stageYoungAdult: "Young adult, in their prime.",
    stageMiddle: "Middle-aged, calm and settled.",
    stageSenior: "A senior with plenty of life experience.",
  },
  de: {
    flag: "🇩🇪",
    title: "🐶 Hundealter-Rechner",
    subtitle: "Berechne das Alter deines Hundes in \"Menschenjahren\"",
    ageLabel: "Alter des Hundes (Jahre)",
    agePlaceholder: "z. B. 3",
    sizeLabel: "Größe des Hundes",
    sizeSmall: "Klein (bis 10 kg)",
    sizeMedium: "Mittel (10–25 kg)",
    sizeLarge: "Groß (25–40 kg)",
    sizeGiant: "Riesig (über 40 kg)",
    submit: "Berechnen",
    error: "Bitte gib ein gültiges Alter ein (0 oder höher).",
    resultSuffix: "Menschenjahre",
    stagePuppy: "Noch im Welpen-/Kindesalter!",
    stageTeen: "Etwa wie ein Teenager.",
    stageYoungAdult: "Junger Erwachsener, in seinen besten Jahren.",
    stageMiddle: "Mittleren Alters, ruhig und gelassen.",
    stageSenior: "Ein Senior mit viel Lebenserfahrung.",
  },
  fr: {
    flag: "🇫🇷",
    title: "🐶 Calculateur d'âge du chien",
    subtitle: "Calculez l'âge de votre chien en \"années humaines\"",
    ageLabel: "Âge du chien (années)",
    agePlaceholder: "p. ex. 3",
    sizeLabel: "Taille du chien",
    sizeSmall: "Petit (jusqu'à 10 kg)",
    sizeMedium: "Moyen (10–25 kg)",
    sizeLarge: "Grand (25–40 kg)",
    sizeGiant: "Géant (plus de 40 kg)",
    submit: "Calculer",
    error: "Veuillez saisir un âge valide (0 ou plus).",
    resultSuffix: "années humaines",
    stagePuppy: "Encore au stade chiot/enfant !",
    stageTeen: "Comme un adolescent.",
    stageYoungAdult: "Jeune adulte, dans la force de l'âge.",
    stageMiddle: "D'âge moyen, calme et posé.",
    stageSenior: "Un senior plein d'expérience de vie.",
  },
};

let currentLang = "sv";
let lastCalculation = null; // { type: "result", humanAge } | { type: "error" } | null

const langSwitcher = document.getElementById("lang-switcher");
const langButton = document.getElementById("lang-button");
const langButtonFlag = document.getElementById("lang-button-flag");
const langButtonLabel = document.getElementById("lang-button-label");
const langListbox = document.getElementById("lang-listbox");
const langOptions = Array.from(langListbox.querySelectorAll("li"));
const form = document.getElementById("age-form");
const resultEl = document.getElementById("result");
const errorEl = document.getElementById("error");
const ageInput = document.getElementById("dog-age");

function applyStaticTranslations(lang) {
  const t = translations[lang];

  document.documentElement.lang = lang === "sv" ? "sv" : lang.split("-")[0];
  document.title = t.title;
  document.getElementById("app-title").textContent = t.title;
  document.getElementById("subtitle").textContent = t.subtitle;
  document.getElementById("age-label").textContent = t.ageLabel;
  ageInput.placeholder = t.agePlaceholder;
  document.getElementById("size-label").textContent = t.sizeLabel;
  document.getElementById("opt-small").textContent = t.sizeSmall;
  document.getElementById("opt-medium").textContent = t.sizeMedium;
  document.getElementById("opt-large").textContent = t.sizeLarge;
  document.getElementById("opt-giant").textContent = t.sizeGiant;
  document.getElementById("submit-btn").textContent = t.submit;
  errorEl.textContent = t.error;
}

function renderLastCalculation(lang) {
  const t = translations[lang];

  if (!lastCalculation) return;

  if (lastCalculation.type === "error") {
    errorEl.hidden = false;
    resultEl.hidden = true;
    return;
  }

  const humanAge = lastCalculation.humanAge;
  errorEl.hidden = true;
  resultEl.querySelector(".result-number").textContent = humanAge + " " + t.resultSuffix;
  resultEl.querySelector(".result-text").textContent = describeStage(humanAge, t);
  resultEl.hidden = false;
}

function openLangListbox() {
  langListbox.hidden = false;
  langButton.setAttribute("aria-expanded", "true");
}

function closeLangListbox() {
  langListbox.hidden = true;
  langButton.setAttribute("aria-expanded", "false");
}

function selectLanguage(lang) {
  currentLang = lang;
  const selectedOption = langOptions.find((li) => li.dataset.lang === lang);

  langButtonFlag.setAttribute("href", selectedOption.querySelector("use").getAttribute("href"));
  langButtonLabel.textContent = selectedOption.querySelector("span").textContent;

  langOptions.forEach((li) => {
    li.setAttribute("aria-selected", li.dataset.lang === lang ? "true" : "false");
  });

  closeLangListbox();
  langButton.focus();
  applyStaticTranslations(currentLang);
  renderLastCalculation(currentLang);
}

langButton.addEventListener("click", function () {
  if (langListbox.hidden) {
    openLangListbox();
    langOptions.find((li) => li.dataset.lang === currentLang).focus();
  } else {
    closeLangListbox();
  }
});

langOptions.forEach((li, index) => {
  li.addEventListener("click", function () {
    selectLanguage(li.dataset.lang);
  });

  li.addEventListener("keydown", function (event) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      selectLanguage(li.dataset.lang);
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      langOptions[(index + 1) % langOptions.length].focus();
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      langOptions[(index - 1 + langOptions.length) % langOptions.length].focus();
    } else if (event.key === "Escape") {
      closeLangListbox();
      langButton.focus();
    }
  });
});

document.addEventListener("click", function (event) {
  if (!langSwitcher.contains(event.target)) {
    closeLangListbox();
  }
});

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const dogAge = parseFloat(ageInput.value);
  const size = document.getElementById("dog-size").value;

  if (Number.isNaN(dogAge) || dogAge < 0) {
    lastCalculation = { type: "error" };
    renderLastCalculation(currentLang);
    return;
  }

  const humanAge = Math.round(calculateHumanAge(dogAge, size));
  lastCalculation = { type: "result", humanAge };
  renderLastCalculation(currentLang);
});

applyStaticTranslations(currentLang);
