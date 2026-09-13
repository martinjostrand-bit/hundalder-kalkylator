# Hundålder-kalkylator

Ett litet startprojekt för att öva på Claude Code: en enkel, mobilanpassad
webbsida som räknar ut en hunds ålder i "människoår".

## Filstruktur

- `index.html` – sidans innehåll och struktur
- `style.css` – utseende, mobile-first (designad för smal skärm först)
- `script.js` – logiken som räknar ut och visar resultatet
- `README.md` – den här filen

Tre separata filer istället för en enda är den vanliga strukturen för
enkla webbprojekt, och gör det lättare att be Claude Code ändra en sak
(t.ex. bara utseendet) utan att röra resten.

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
- "Hjälp mig publicera sidan gratis med GitHub Pages"

Ett bra sätt att lära sig är att be om en sak i taget, titta på diffen
Claude Code föreslår, testa i webbläsaren, och sedan gå vidare till
nästa ändring.
