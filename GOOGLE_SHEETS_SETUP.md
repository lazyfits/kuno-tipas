# Google Sheets prijungimas

1. Susikurk Google Sheet failą.
2. Atsidaryk `Extensions -> Apps Script`.
3. Įklijuok kodą iš [google-sheets-webhook.gs](/Users/airidasbutkus/Desktop/lazyfit-galutinis-body-check/google-sheets-webhook.gs).
4. Pakeisk `SPREADSHEET_ID` į savo Google Sheet ID.
5. Jei reikia, pasikeisk `SHEET_NAME`.
6. Spausk `Deploy -> New deployment -> Web app`.
7. Prie `Who has access` pasirink `Anyone`.
8. Nukopijuok Web App URL.
9. Atidaryk [google-sheets.config.json](/Users/airidasbutkus/Desktop/lazyfit-galutinis-body-check/google-sheets.config.json) ir įklijuok URL į `webhookUrl`.
10. Perleisk [open-app.command](/Users/airidasbutkus/Desktop/lazyfit-galutinis-body-check/open-app.command).

Kol `webhookUrl` neįrašytas, emailai vis tiek saugiai kris į lokalią kopiją:
[data/unlock-submissions.jsonl](/Users/airidasbutkus/Desktop/lazyfit-galutinis-body-check/data/unlock-submissions.jsonl)
