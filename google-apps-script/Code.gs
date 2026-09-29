const SHEET_NAME = "Feedbacks";

function doPost(event) {
  const params = event && event.parameter ? event.parameter : {};

  // Honeypot: robôs costumam preencher este campo; pessoas não o veem.
  if (params.website) {
    return jsonResponse({ ok: true });
  }

  if (!params.name || !params.rating || !params.message || params.consent !== "sim") {
    return jsonResponse({ ok: false, error: "Dados obrigatórios ausentes." });
  }

  const lock = LockService.getScriptLock();
  lock.waitLock(10000);

  try {
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = spreadsheet.getSheetByName(SHEET_NAME);

    if (!sheet) {
      sheet = spreadsheet.insertSheet(SHEET_NAME);
      sheet.appendRow(["Data/hora", "Nome", "Avaliação", "Comentário"]);
      sheet.setFrozenRows(1);
      sheet.getRange("A1:D1").setFontWeight("bold").setBackground("#eeeeee");
      sheet.getRange("A:A").setNumberFormat("dd/mm/yyyy hh:mm:ss");
      sheet.setColumnWidth(1, 150);
      sheet.setColumnWidth(2, 180);
      sheet.setColumnWidth(3, 160);
      sheet.setColumnWidth(4, 480);
      sheet.getRange("D:D").setWrap(true);
    }

    sheet.appendRow([
      new Date(),
      safeCell(params.name),
      safeCell(params.rating),
      safeCell(params.message),
    ]);

    return jsonResponse({ ok: true });
  } finally {
    lock.releaseLock();
  }
}

function safeCell(value) {
  const text = String(value || "");
  return /^[=+\-@]/.test(text) ? "'" + text : text;
}

function jsonResponse(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}
