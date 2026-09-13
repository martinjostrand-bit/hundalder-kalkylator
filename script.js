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

function describeResult(humanAge) {
  if (humanAge < 13) return "Fortfarande i valp-/barnstadiet!";
  if (humanAge < 20) return "Ungefär som en tonåring.";
  if (humanAge < 40) return "Ung vuxen, i sina bästa år.";
  if (humanAge < 60) return "Medelålders, lugn och trygg.";
  return "En senior med livserfarenhet.";
}

const form = document.getElementById("age-form");
const resultEl = document.getElementById("result");
const errorEl = document.getElementById("error");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const dogAge = parseFloat(document.getElementById("dog-age").value);
  const size = document.getElementById("dog-size").value;

  if (Number.isNaN(dogAge) || dogAge < 0) {
    errorEl.hidden = false;
    resultEl.hidden = true;
    return;
  }

  errorEl.hidden = true;

  const humanAge = Math.round(calculateHumanAge(dogAge, size));

  resultEl.querySelector(".result-number").textContent = humanAge + " människoår";
  resultEl.querySelector(".result-text").textContent = describeResult(humanAge);
  resultEl.hidden = false;
});
