# Hundålder-kalkylator

Ett litet startprojekt för att öva på Claude Code: en enkel, mobilanpassad
webbsida som räknar ut en hunds ålder i "människoår".

## Filstruktur

- `index.html` – sidans innehåll och struktur
- `style.css` – utseende, mobile-first (designad för smal skärm först)
- `script.js` – logiken som räknar ut och visar resultatet, språkval och statistikpanel
- `worker.js` – Cloudflare Worker-entrypoint: hanterar `/api/stats` och serverar
  övriga filer statiskt
- `wrangler.jsonc` – Cloudflare Worker-konfiguration (namn, KV-bindning, assets)
- `.assetsignore` – filer som inte ska publiceras som statiska assets (t.ex. `.git`)
- `.htmlvalidate.json` – lint-regler för HTML-valideringen i CI
- `.github/workflows/deploy.yml` – CI/CD-pipelinen, se avsnittet nedan
- `README.md` – den här filen

Separata filer istället för en enda är den vanliga strukturen för enkla
webbprojekt, och gör det lättare att be Claude Code ändra en sak (t.ex.
bara utseendet) utan att röra resten.

## Kör projektet lokalt

Enklast: dubbelklicka på `index.html` så öppnas den i din webbläsare.

Vill du testa mobilvyn: öppna sidan i Chrome, tryck F12 för DevTools,
och slå på "Toggle device toolbar" (mobil-ikonen) för att se hur den ser
ut på olika skärmstorlekar.

Om du senare vill köra en riktig lokal server (bra vana, och krävs för
vissa saker längre fram, t.ex. att hämta data från en fil):

```bash
python3 -m http.server 8000
```

och öppna sedan `http://localhost:8000` i webbläsaren.

## Hur formeln fungerar

Omvandlingen är en vanlig tumregel, inte en exakt vetenskaplig formel:
hundens första år räknas som ungefär 15 människoår, år två lägger på
ytterligare ~9 (lite mindre för jättehundar), och varje år därefter
räknas olika beroende på hundens storlek (mindre hundar åldras
långsammare i människoår räknat). Logiken finns i `script.js` i
funktionen `calculateHumanAge`.

## Bygg- och driftsättningspipeline (CI/CD)

Sajten körs på Cloudflare Workers och deployas via GitHub Actions
(`.github/workflows/deploy.yml`) – inte via Cloudflares egen
"Connect to Git"-integration, som är avstängd för att undvika
dubbla deployer.

**Live-sajt:** https://hundalder-kalkylator.martin-jo-strand.workers.dev

### Så fungerar det

- **Pull request mot `master`:**
  1. `checks`-jobbet kör JS-syntaxkontroll, HTML-validering
     (`html-validate`) och `wrangler deploy --dry-run` – fångar fel
     innan merge.
  2. `preview`-jobbet deployar en preview-version av Workern och
     kommenterar preview-URL:en direkt på PR:en, så du kan testa
     ändringen innan merge.
- **Merge/push till `master`:**
  1. `checks` körs igen.
  2. `deploy`-jobbet väntar på manuellt godkännande innan det
     deployar till produktion (se nedan).

### Godkänna en produktionsdeploy

1. Gå till fliken **Actions** i GitHub-repot.
2. Öppna körningen som väntar (statusen "waiting" på jobbet
   **Deploy to production**).
3. Klicka **Review deployments** → kryssa i **production** →
   **Approve and deploy**.

Ingen deploy till produktion sker utan detta godkännande – inte ens
för repots ägare (admin-bypass är avstängt på environmentet).

### Secrets (redan konfigurerade)

Under repots **Settings → Secrets and variables → Actions**:

- `CLOUDFLARE_API_TOKEN` – scoped till *Workers Scripts:Edit*,
  *Workers KV Storage:Edit* och *Account Settings:Read* (inte
  bredare rättigheter än så).
- `CLOUDFLARE_ACCOUNT_ID` – kontots ID.

### Testa lint lokalt innan push

```bash
node --check worker.js
node --check script.js
npx html-validate@8 index.html
```

## Fortsätt bygga med Claude Code

Öppna en terminal i den här mappen och kör:

```bash
claude
```

Sedan kan du be Claude Code om ändringar i vanlig text, till exempel:

- "Lägg till ett mörkt tema som följer systemets inställning"
- "Byt ut storlek-valet mot en lista med vanliga hundraser, och räkna
  ut storleken automatiskt utifrån rasen"
- "Spara de senaste 5 uträkningarna i webbläsaren med localStorage och
  visa dem i en lista"
- "Lägg till en enkel animation när resultatet visas"
- "Lägg till ett nytt fält i statistikpanelen för X"

Ett bra sätt att lära sig är att be om en sak i taget, titta på diffen
Claude Code föreslår, testa i webbläsaren, och sedan gå vidare till
nästa ändring.
