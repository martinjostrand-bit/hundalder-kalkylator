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
    yearsUnit: "år",
    statsToggleLabel: "Statistik",
    statsTitle: "Statistik över sajtens användning",
    statsAgeChartTitle: "Uträkningar per hundålder",
    statsSizeChartTitle: "Uträkningar per hundstorlek",
    statsSizeSmall: "Liten",
    statsSizeMedium: "Mellan",
    statsSizeLarge: "Stor",
    statsSizeGiant: "Jätte",
    statsEmpty: "Inga uträkningar registrerade ännu.",
    statsLoading: "Laddar statistik…",
    statsError: "Kunde inte hämta statistik just nu.",
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
    yearsUnit: "years",
    statsToggleLabel: "Statistics",
    statsTitle: "Site usage statistics",
    statsAgeChartTitle: "Calculations by dog age",
    statsSizeChartTitle: "Calculations by dog size",
    statsSizeSmall: "Small",
    statsSizeMedium: "Medium",
    statsSizeLarge: "Large",
    statsSizeGiant: "Giant",
    statsEmpty: "No calculations recorded yet.",
    statsLoading: "Loading statistics…",
    statsError: "Couldn't load statistics right now.",
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
    yearsUnit: "years",
    statsToggleLabel: "Statistics",
    statsTitle: "Site usage statistics",
    statsAgeChartTitle: "Calculations by dog age",
    statsSizeChartTitle: "Calculations by dog size",
    statsSizeSmall: "Small",
    statsSizeMedium: "Medium",
    statsSizeLarge: "Large",
    statsSizeGiant: "Giant",
    statsEmpty: "No calculations recorded yet.",
    statsLoading: "Loading statistics…",
    statsError: "Couldn't load statistics right now.",
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
    yearsUnit: "Jahre",
    statsToggleLabel: "Statistik",
    statsTitle: "Nutzungsstatistik der Website",
    statsAgeChartTitle: "Berechnungen nach Hundealter",
    statsSizeChartTitle: "Berechnungen nach Hundegröße",
    statsSizeSmall: "Klein",
    statsSizeMedium: "Mittel",
    statsSizeLarge: "Groß",
    statsSizeGiant: "Riesig",
    statsEmpty: "Noch keine Berechnungen erfasst.",
    statsLoading: "Statistik wird geladen…",
    statsError: "Statistik konnte gerade nicht geladen werden.",
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
    yearsUnit: "ans",
    statsToggleLabel: "Statistiques",
    statsTitle: "Statistiques d'utilisation du site",
    statsAgeChartTitle: "Calculs par âge du chien",
    statsSizeChartTitle: "Calculs par taille du chien",
    statsSizeSmall: "Petit",
    statsSizeMedium: "Moyen",
    statsSizeLarge: "Grand",
    statsSizeGiant: "Géant",
    statsEmpty: "Aucun calcul enregistré pour le moment.",
    statsLoading: "Chargement des statistiques…",
    statsError: "Impossible de charger les statistiques pour le moment.",
  },
};

const AGE_BUCKETS = [
  { id: "0-1", label: "0–1" },
  { id: "1-3", label: "1–3" },
  { id: "3-6", label: "3–6" },
  { id: "6-9", label: "6–9" },
  { id: "9-12", label: "9–12" },
  { id: "12+", label: "12+" },
];

function bucketForAge(age) {
  if (age < 1) return "0-1";
  if (age < 3) return "1-3";
  if (age < 6) return "3-6";
  if (age < 9) return "6-9";
  if (age < 12) return "9-12";
  return "12+";
}

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

const statsToggle = document.getElementById("stats-toggle");
const statsPanel = document.getElementById("stats-panel");
const statsStatus = document.getElementById("stats-status");
const statsAgeChart = document.getElementById("stats-age-chart");
const statsSizeChart = document.getElementById("stats-size-chart");
const statsTitleEl = document.getElementById("stats-title");
const statsAgeTitleEl = document.getElementById("stats-age-title");
const statsSizeTitleEl = document.getElementById("stats-size-title");

let lastStatsData = null;

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
  applyStatsStaticTranslations(currentLang);
  if (!statsPanel.hidden && lastStatsData) {
    renderStatsFromData(lastStatsData, currentLang);
  }
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

// ---------------------------------------------------------
// Statistik. Uträkningar sparas globalt (för alla besökare) via
// en Cloudflare Pages Function + KV, se functions/api/stats.js.
// ---------------------------------------------------------

function applyStatsStaticTranslations(lang) {
  const t = translations[lang];
  statsToggle.setAttribute("aria-label", t.statsToggleLabel);
  statsToggle.title = t.statsToggleLabel;
  statsTitleEl.textContent = t.statsTitle;
  statsAgeTitleEl.textContent = t.statsAgeChartTitle;
  statsSizeTitleEl.textContent = t.statsSizeChartTitle;
}

function renderBarChart(container, entries, fillClass) {
  const maxValue = Math.max(1, ...entries.map((e) => e.value));
  container.innerHTML = "";

  entries.forEach(({ label, value }) => {
    const row = document.createElement("div");
    row.className = "bar-row";

    const labelEl = document.createElement("span");
    labelEl.className = "bar-label";
    labelEl.textContent = label;

    const track = document.createElement("div");
    track.className = "bar-track";
    const fill = document.createElement("div");
    fill.className = "bar-fill " + fillClass;
    fill.style.width = Math.round((value / maxValue) * 100) + "%";
    track.appendChild(fill);

    const valueEl = document.createElement("span");
    valueEl.className = "bar-value";
    valueEl.textContent = value;

    row.appendChild(labelEl);
    row.appendChild(track);
    row.appendChild(valueEl);
    container.appendChild(row);
  });
}

function renderStatsFromData(data, lang) {
  const t = translations[lang];

  const ageEntries = AGE_BUCKETS.map((b) => ({
    label: b.label + " " + t.yearsUnit,
    value: (data.ageBuckets && data.ageBuckets[b.id]) || 0,
  }));
  const sizeEntries = [
    { label: t.statsSizeSmall, value: (data.sizes && data.sizes.small) || 0 },
    { label: t.statsSizeMedium, value: (data.sizes && data.sizes.medium) || 0 },
    { label: t.statsSizeLarge, value: (data.sizes && data.sizes.large) || 0 },
    { label: t.statsSizeGiant, value: (data.sizes && data.sizes.giant) || 0 },
  ];

  const totalCount = ageEntries.reduce((sum, e) => sum + e.value, 0);
  statsStatus.hidden = totalCount !== 0;
  statsStatus.textContent = t.statsEmpty;

  renderBarChart(statsAgeChart, ageEntries, "age");
  renderBarChart(statsSizeChart, sizeEntries, "size");
}

function loadAndRenderStats() {
  const t = translations[currentLang];
  statsStatus.hidden = false;
  statsStatus.textContent = t.statsLoading;
  statsAgeChart.innerHTML = "";
  statsSizeChart.innerHTML = "";

  fetch("/api/stats")
    .then((res) => {
      if (!res.ok) throw new Error("bad response");
      return res.json();
    })
    .then((data) => {
      lastStatsData = data;
      renderStatsFromData(data, currentLang);
    })
    .catch(() => {
      statsStatus.hidden = false;
      statsStatus.textContent = translations[currentLang].statsError;
    });
}

function recordCalculation(age, size) {
  fetch("/api/stats", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ age, size }),
  })
    .then((res) => (res.ok ? res.json() : null))
    .then((data) => {
      if (data) {
        lastStatsData = data;
        if (!statsPanel.hidden) {
          renderStatsFromData(data, currentLang);
        }
      }
    })
    .catch(() => {});
}

statsToggle.addEventListener("click", function () {
  const isOpen = statsToggle.getAttribute("aria-pressed") === "true";
  if (isOpen) {
    statsToggle.setAttribute("aria-pressed", "false");
    statsPanel.hidden = true;
  } else {
    statsToggle.setAttribute("aria-pressed", "true");
    statsPanel.hidden = false;
    loadAndRenderStats();
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
  recordCalculation(dogAge, size);
});

applyStaticTranslations(currentLang);
applyStatsStaticTranslations(currentLang);
