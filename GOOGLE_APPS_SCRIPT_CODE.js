/**
 * Google Apps Script Code for ITUDers Form Submission
 * 
 * INSTRUCTIONS:
 * 1. Go to https://script.google.com
 * 2. Create a new project
 * 3. Paste this code into the editor
 * 4. Create a new Google Sheet (or use an existing one)
 * 5. Copy the Sheet ID from the URL (the long string between /d/ and /edit)
 * 6. Replace 'YOUR_SHEET_ID_HERE' below with your actual Sheet ID
 * 7. Save the script
 * 8. Click "Deploy" > "New deployment"
 * 9. Select type: "Web app"
 * 10. Set "Execute as" to "Me"
 * 11. Set "Who has access" to "Anyone"
 * 12. Click "Deploy"
 * 13. Copy the Web App URL and add it to your .env.local file as NEXT_PUBLIC_GOOGLE_SCRIPT_URL
 */

// Replace this with your Google Sheet ID
const SHEET_ID = 'YOUR_SHEET_ID_HERE';

function doPost(e) {
  // Handle case when script is run manually (for testing) or e is undefined
  if (!e || !e.parameter) {
    Logger.log('Script run manually or no parameters - using test data');
    e = e || {};
    e.parameter = e.parameter || {
      firstName: 'Test',
      lastName: 'User',
      parentName: 'Test Parent',
      userType: 'veli',
      phone: '05551234567',
      grade: '9',
      subjects: 'Matematik, Fizik',
      message: 'Test message from manual run'
    };
  }
  
  // Handle CORS preflight request
  if (e.parameter && e.parameter.method === 'OPTIONS') {
    return ContentService.createTextOutput('')
      .setMimeType(ContentService.MimeType.JSON);
  }
  
  // Log the incoming request for debugging
  Logger.log('Received POST request');
  Logger.log('Event object keys: ' + Object.keys(e || {}));
  Logger.log('Parameters: ' + JSON.stringify(e.parameter || {}));
  Logger.log('PostData: ' + (e.postData ? e.postData.contents : 'No postData'));
  
  try {
    // Clean and validate Sheet ID (remove any trailing slashes, whitespace, and other characters)
    let cleanSheetId = String(SHEET_ID || '').trim();
    
    // Remove any trailing slashes, spaces, or other unwanted characters
    cleanSheetId = cleanSheetId.replace(/[/\s]+$/g, ''); // Remove trailing slashes and whitespace
    cleanSheetId = cleanSheetId.replace(/^[/\s]+/g, ''); // Remove leading slashes and whitespace
    
    // Check if Sheet ID is configured
    if (cleanSheetId === 'YOUR_SHEET_ID_HERE' || !cleanSheetId || cleanSheetId.length === 0) {
      throw new Error('Sheet ID is not configured. Please set SHEET_ID in the script.');
    }
    
    Logger.log('Original Sheet ID: ' + SHEET_ID);
    Logger.log('Cleaned Sheet ID: ' + cleanSheetId);
    
    // Get the active spreadsheet
    let spreadsheet;
    try {
      spreadsheet = SpreadsheetApp.openById(cleanSheetId);
    } catch (sheetError) {
      Logger.log('Error opening spreadsheet: ' + sheetError.toString());
      Logger.log('Original Sheet ID from constant: ' + SHEET_ID);
      Logger.log('Cleaned Sheet ID used: ' + cleanSheetId);
      Logger.log('Error details: ' + JSON.stringify(sheetError));
      
      // Provide more helpful error message
      let errorMsg = 'Cannot open spreadsheet. ';
      if (sheetError.toString().includes('missing')) {
        errorMsg += 'The Sheet ID "' + cleanSheetId + '" may be incorrect, the sheet may have been deleted, or the script does not have access. ';
        errorMsg += 'Please verify: 1) The Sheet ID is correct, 2) The sheet exists, 3) The script has been authorized to access it.';
      } else {
        errorMsg += 'Error: ' + sheetError.toString();
      }
      throw new Error(errorMsg);
    }
    
    const sheet = spreadsheet.getActiveSheet();
    
    // If the sheet is empty, add headers
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        'Tarih',
        'Saat',
        'Ad',
        'Soyad',
        'Veli Adı ve Soyadı',
        'Kullanıcı Tipi',
        'Telefon',
        'Sınıf',
        'Dersler',
        'Mesaj'
      ]);
    }
    
    // Parse the form data - handle both URL-encoded and FormData
    // FormData sends data as e.parameter, but we need to handle it properly
    let params = e.parameter || {};
    
    // If postData exists, try to parse it (for JSON or other formats)
    if (e.postData && e.postData.contents) {
      try {
        const postData = JSON.parse(e.postData.contents);
        params = { ...params, ...postData };
      } catch (parseError) {
        Logger.log('Could not parse postData as JSON, using parameters only');
      }
    }
    
    Logger.log('Parsed parameters: ' + JSON.stringify(params));
    
    const firstName = params.firstName || '';
    const lastName = params.lastName || '';
    const parentName = params.parentName || '';
    const userType = params.userType || '';
    const phone = params.phone || '';
    const grade = params.grade || '';
    const subjects = params.subjects || '';
    const message = params.message || '';
    
    // Get current date and time
    const now = new Date();
    const date = Utilities.formatDate(now, Session.getScriptTimeZone(), 'dd/MM/yyyy');
    const time = Utilities.formatDate(now, Session.getScriptTimeZone(), 'HH:mm:ss');
    
    // Map grade number to readable format
    const gradeMap = {
      '1': '1. Sınıf',
      '2': '2. Sınıf',
      '3': '3. Sınıf',
      '4': '4. Sınıf',
      '5': '5. Sınıf',
      '6': '6. Sınıf',
      '7': '7. Sınıf',
      '8': '8. Sınıf',
      '9': '9. Sınıf',
      '10': '10. Sınıf',
      '11': '11. Sınıf',
      '12': '12. Sınıf',
      'mezun': 'Mezun'
    };
    const gradeText = gradeMap[grade] || grade;
    
    // Map user type to readable format
    const userTypeMap = {
      'veli': 'Veli',
      'ogrenci': 'Öğrenci'
    };
    const userTypeText = userTypeMap[userType] || userType;
    
    // Append the data to the sheet
    try {
      sheet.appendRow([
        date,
        time,
        firstName,
        lastName,
        parentName,
        userTypeText,
        phone,
        gradeText,
        subjects,
        message
      ]);
      Logger.log('Data successfully appended to sheet');
    } catch (appendError) {
      Logger.log('Error appending row: ' + appendError.toString());
      throw new Error('Failed to write data to sheet: ' + appendError.toString());
    }
    
    // Return success response with CORS headers
    const output = ContentService.createTextOutput(
      JSON.stringify({
        success: true,
        message: 'Form başarıyla kaydedildi'
      })
    ).setMimeType(ContentService.MimeType.JSON);
    
    Logger.log('Returning success response');
    return output;
    
  } catch (error) {
    // Log the error
    Logger.log('Error in doPost: ' + error.toString());
    Logger.log('Error stack: ' + (error.stack || 'No stack trace'));
    
    // Return error response
    const errorOutput = ContentService.createTextOutput(
      JSON.stringify({
        success: false,
        error: error.toString()
      })
    ).setMimeType(ContentService.MimeType.JSON);
    
    return errorOutput;
  }
}

// Test function (optional - you can run this to test the script)
function testDoPost() {
  const mockEvent = {
    parameter: {
      firstName: 'Test',
      lastName: 'User',
      parentName: 'Test Parent',
      userType: 'veli',
      phone: '05551234567',
      grade: '9',
      subjects: 'Matematik, Fizik',
      message: 'Test message'
    }
  };
  
  const result = doPost(mockEvent);
  Logger.log(result.getContent());
}

