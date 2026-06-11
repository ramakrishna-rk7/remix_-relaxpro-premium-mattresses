/**
 * RelaxPro Premium Mattresses - Lead Capture Script
 * 
 * Deploy as Web App → Execute as: Me → Who has access: Anyone
 * Then copy the deployment URL into .env as VITE_PUBLIC_GOOGLE_SCRIPT_URL
 * 
 * The Google Sheet MUST have these column headers in Row 1:
 * Timestamp | orderId | name | phone | email | city | address | pincode | contactTime | product | size | price | notes | source
 */

const SHEET_NAME = 'Leads';

function getSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow([
      'Timestamp', 'orderId', 'name', 'phone', 'email', 'city', 'address',
      'pincode', 'contactTime', 'product', 'size', 'price', 'notes', 'source'
    ]);
  }
  return sheet;
}

function doPost(e) {
  try {
    const params = e.parameter || {};
    let data = {};

    if (params.json) {
      try { data = JSON.parse(params.json); } catch (_) { data = params; }
    } else if (params.payload) {
      try { data = JSON.parse(params.payload); } catch (_) { data = params; }
    } else {
      data = params;
    }

    const sheet = getSheet();
    sheet.appendRow([
      new Date(),
      data.orderId || '',
      data.name || '',
      data.phone || '',
      data.email || '',
      data.city || '',
      data.address || '',
      data.pincode || '',
      data.contactTime || '',
      data.product || '',
      data.size || '',
      data.price || '',
      data.notes || '',
      data.source || ''
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return doPost(e);
}
