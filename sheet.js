const { google } = require("googleapis");

const SHEET_ID =
  "1yWt4TDWNjpJPn1y5IiMM1E6Cp7jOUTdejHoSjZ8ivEI";

async function appendRow(values) {
  const auth = new google.auth.GoogleAuth({
    keyFile: "credentials.json",
    scopes: [
      "https://www.googleapis.com/auth/spreadsheets",
    ],
  });

  const sheets = google.sheets({
    version: "v4",
    auth,
  });

  await sheets.spreadsheets.values.append({
    spreadsheetId: SHEET_ID,
    range: "Sheet1!A:O",
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [values],
    },
  });
}

module.exports = {
  appendRow,
};