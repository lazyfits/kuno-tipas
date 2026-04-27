const SPREADSHEET_ID = "PASTEK_TAVO_GOOGLE_SHEET_ID";
const SHEET_NAME = "LazyFit leads";

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

    sheet.appendRow([
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
    ]);

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
  if (sheet.getLastRow() > 0) {
    return;
  }

  sheet.appendRow([
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
  ]);
}

function jsonResponse_(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(
    ContentService.MimeType.JSON,
  );
}
