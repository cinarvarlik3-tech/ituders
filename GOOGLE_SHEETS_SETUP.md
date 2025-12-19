# Google Sheets Integration Setup Guide

This guide will help you set up the Google Apps Script to automatically save form submissions to a Google Sheet.

## Step 1: Create a Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it something like "ITUDers Form Submissions"
4. Copy the Sheet ID from the URL:
   - The URL will look like: `https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID_HERE/edit`
   - Copy the long string between `/d/` and `/edit`

## Step 2: Create Google Apps Script

1. Go to [Google Apps Script](https://script.google.com)
2. Click "New Project"
3. Delete the default code
4. Open the file `GOOGLE_APPS_SCRIPT_CODE.js` in this project
5. Copy the entire code from that file
6. Paste it into the Apps Script editor
7. Replace `'YOUR_SHEET_ID_HERE'` with your actual Sheet ID from Step 1
8. Click "Save" (or press Ctrl+S / Cmd+S)
9. Give your project a name (e.g., "ITUDers Form Handler")

## Step 3: Deploy as Web App

1. In the Apps Script editor, click "Deploy" > "New deployment"
2. Click the gear icon (⚙️) next to "Select type"
3. Choose "Web app"
4. Fill in the deployment settings:
   - **Description**: "ITUDers Form Handler" (or any description)
   - **Execute as**: "Me" (your email)
   - **Who has access**: "Anyone" (important!)
5. Click "Deploy"
6. You may be asked to authorize the script:
   - Click "Authorize access"
   - Choose your Google account
   - Click "Advanced" > "Go to [Project Name] (unsafe)"
   - Click "Allow"
7. Copy the **Web App URL** (it will look like: `https://script.google.com/macros/s/.../exec`)

## Step 4: Configure Your Website

1. Create a `.env.local` file in the root of your project (if it doesn't exist)
2. Add the following line:
   ```
   NEXT_PUBLIC_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
   ```
   Replace the URL with the Web App URL you copied in Step 3
3. Restart your Next.js development server:
   ```bash
   npm run dev
   ```

## Step 5: Test the Integration

1. Go to your website's form page (`/deneme-dersi`)
2. Fill out and submit the form
3. Check your Google Sheet - you should see the data appear automatically!

## Troubleshooting

### Form submissions not appearing in the sheet?
- Make sure the Sheet ID in the script matches your actual sheet
- Check that the Web App is deployed with "Anyone" access
- Verify the `.env.local` file has the correct URL
- Check the browser console for any errors

### Permission errors?
- Make sure you authorized the script when deploying
- Try redeploying the script and authorizing again

### CORS errors?
- The script should handle CORS automatically, but if you see errors, make sure the Web App URL is correct

## Data Structure

The form data will be saved with the following columns:
- Tarih (Date)
- Saat (Time)
- Ad (First Name)
- Soyad (Last Name)
- Veli Adı ve Soyadı (Parent Name)
- Kullanıcı Tipi (User Type: Veli/Öğrenci)
- Telefon (Phone)
- Sınıf (Grade)
- Dersler (Subjects)
- Mesaj (Message)

