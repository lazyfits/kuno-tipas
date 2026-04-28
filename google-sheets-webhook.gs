const SPREADSHEET_ID = "PASTEK_TAVO_GOOGLE_SHEET_ID";
const SHEET_NAME = "LazyFit leads";
const HEADERS = [
  "Gauta",
  "El. paštas",
  "Marketingo sutikimas",
  "Body type",
  "Body type label",
  "Apkrovos profilis",
  "Pratimų kategorija",
  "Rotacijos ribojimas",
  "Vienos kojos ribojimas",
  "Pagrindiniai pratimai",
  "Papildomi asimetrijos pratimai",
  "Source",
  "Submitted at",
  "Konsultacijos interesas",
  "Konsultacijos tipas",
  "Reikia susisiekti",
];

function doPost(e) {
  try {
    const payload = JSON.parse((e.postData && e.postData.contents) || "{}");
    const sheet = getSheet_();
    ensureHeader_(sheet);

    const result = payload.result || {};
    const exercises = payload.exercises || {};
    const primaryExercises = Array.isArray(exercises.primary)
      ? exercises.primary.map((item) => item.name || "").filter(Boolean).join(" | ")
      : "";
    const asymmetryExercises = Array.isArray(exercises.asymmetry)
      ? exercises.asymmetry
          .map((item) => {
            const name = item.name || "";
            const instructionText = item.instructionText || "";
            return [name, instructionText].filter(Boolean).join(" — ");
          })
          .filter(Boolean)
          .join(" | ")
      : "";
    const consultation = payload.consultation || {};
    const consultationInterest = consultation.interestType || "";
    const consultationLabel = consultation.label || "";
    const shouldContact = consultationInterest ? "Taip" : "Ne";
    const rowValues = [
      new Date(),
      payload.email || "",
      payload.consentMarketing === true ? "Taip" : "Ne",
      result.bodyType || "",
      result.bodyTypeLabel || "",
      result.pelvisLoadProfile || "",
      result.exerciseCategory || "",
      result.rotationRestriction || "",
      result.singleLegRestriction || "",
      primaryExercises,
      asymmetryExercises,
      payload.source || "",
      payload.submittedAt || "",
      consultationInterest,
      consultationLabel,
      shouldContact,
    ];

    if (consultationInterest && payload.email) {
      const existingRow = findLatestRowByEmail_(sheet, payload.email);
      if (existingRow > 1) {
        sheet.getRange(existingRow, 1, 1, rowValues.length).setValues([rowValues]);
        return jsonResponse_({ ok: true, updated: true });
      }
    }

    sheet.appendRow(rowValues);

    return jsonResponse_({ ok: true });
  } catch (error) {
    return jsonResponse_({
      ok: false,
      message: error && error.message ? error.message : "Nepavyko išsaugoti į Google Sheets.",
    });
  }
}

function getSheet_() {
  const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  const existingSheet = spreadsheet.getSheetByName(SHEET_NAME);
  return existingSheet || spreadsheet.insertSheet(SHEET_NAME);
}

function ensureHeader_(sheet) {
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    return;
  }

  const existingHeaders = sheet.getRange(1, 1, 1, Math.max(sheet.getLastColumn(), HEADERS.length)).getValues()[0];
  const headersMatch = HEADERS.every((header, index) => existingHeaders[index] === header);

  if (!headersMatch) {
    sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
  }
}

function findLatestRowByEmail_(sheet, email) {
  const normalizedEmail = String(email || "").trim().toLowerCase();
  if (!normalizedEmail || sheet.getLastRow() < 2) {
    return 0;
  }

  const values = sheet.getRange(2, 2, sheet.getLastRow() - 1, 1).getValues();

  for (let index = values.length - 1; index >= 0; index -= 1) {
    const currentEmail = String(values[index][0] || "").trim().toLowerCase();
    if (currentEmail === normalizedEmail) {
      return index + 2;
    }
  }

  return 0;
}

function jsonResponse_(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(
    ContentService.MimeType.JSON,
  );
}
