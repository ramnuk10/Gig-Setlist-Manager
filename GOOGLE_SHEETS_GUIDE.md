# Google Sheets Integration Guide

## Overview

Your Gig Setlist Manager now supports Google Sheets integration with two main features:

1. **CSV Export** - Download setlists as CSV files (available immediately)
2. **Google Sheets Sync** - Sync setlists to Google Sheets (setup required)

## CSV Export (Available Now)

### How to Use

**Export Single Setlist:**
1. Open a setlist detail page
2. Click the **📥 Export CSV** button
3. File downloads as `setlist-name.csv`

**Export All Setlists:**
1. On the dashboard, click **📥 Export CSV** button
2. File downloads as `setlists-export-YYYY-MM-DD.csv`

### CSV Format

The exported CSV includes:
- Setlist name, description, and export date
- Song information: position, title, artist, duration, notes
- Properly formatted for importing into Google Sheets

### Use Cases for CSV Export
- **Backup** - Save a copy of your setlists
- **Sharing** - Share CSV with other musicians
- **Google Sheets** - Import manually into Google Sheets
- **External Editing** - Edit in Excel/Sheets then reimport
- **Analysis** - Use data in other tools

## Google Sheets Sync (Setup Required)

Full Google Sheets integration requires additional setup. When configured, your setlists can sync automatically to a Google Sheet.

### Setup Instructions

#### Step 1: Create Google Cloud Project
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project (or use existing)
3. Enable the "Google Sheets API"

#### Step 2: Create Service Account
1. In Google Cloud Console, go to **Service Accounts**
2. Click **Create Service Account**
3. Name it "Gig Setlist Manager"
4. Click **Create and Continue**
5. Grant it "Editor" role (or minimal permissions)
6. Continue to next step
7. Create a key: JSON format
8. Save the JSON file securely

#### Step 3: Create Google Sheet
1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Rename it to "Gig Setlist Manager"
4. Note the **Sheet ID** from the URL:
   ```
   https://docs.google.com/spreadsheets/d/{SHEET_ID}/edit
   ```

#### Step 4: Share Sheet with Service Account
1. Open your spreadsheet
2. Click Share
3. Paste the service account email (from the JSON file)
4. Grant it "Editor" access

#### Step 5: Configure Backend Environment

Add to `backend/.env`:

```env
# Google Sheets Configuration
GOOGLE_SHEETS_CREDENTIALS=/path/to/service-account.json
GOOGLE_SHEET_ID=your-sheet-id-here
```

Or use JSON string directly:
```env
GOOGLE_SHEETS_CREDENTIALS={"type":"service_account","project_id":"..."}
```

#### Step 6: Install Google Libraries

```bash
cd backend
npm install @google-cloud/sheets @google-auth-library
cd ..
```

#### Step 7: Restart Backend

```bash
npm run dev
```

### Using Google Sheets Sync

With the setup complete, sync endpoints become available:

**Sync Single Setlist:**
```bash
POST /api/sheets/{setlistId}/sync-sheets
```

**Check Sync Status:**
```bash
GET /api/sheets/{setlistId}/sync-status
```

### Sheet Structure

When syncing, data is organized as:

**Tab: "Setlists"**
| Name | Description | SongCount | LastSynced |
|------|-------------|-----------|-----------|
| Acoustic Set | 45 min set | 12 | 2024-03-24... |

**Tab: "Songs"**
| SetlistName | Position | Title | Artist | Duration | Notes |
|-------------|----------|-------|--------|----------|-------|
| Acoustic Set | 1 | Wonderwall | Oasis | 4 | Capo 2 |

## API Endpoints

### Export Routes

**GET /api/export/:setlistId/csv**
- Export single setlist as CSV
- Returns: CSV file download

**GET /api/export/csv**
- Export all setlists as CSV
- Returns: CSV file download

### Google Sheets Routes

**POST /api/sheets/:setlistId/sync-sheets**
- Sync setlist to Google Sheets
- Requires: Configuration
- Returns: Sync status

**GET /api/sheets/:setlistId/sync-status**
- Check if Google Sheets is configured
- Returns: Configuration status and instructions

## Troubleshooting

### "Google Sheets not configured"
**Solution:** Set environment variables and install libraries

```bash
# 1. Check .env file has both variables
cat backend/.env | grep GOOGLE

# 2. Install required packages
cd backend
npm install @google-cloud/sheets @google-auth-library
```

### "Permission denied" error
**Solution:** Share the Google Sheet with service account email

1. Get service account email from JSON file
2. Open Google Sheet
3. Click Share
4. Add service account email with Editor access

### CSV not downloading
**Solution:** Check browser console (F12)

1. Open F12 → Console tab
2. Try export again
3. Look for error messages
4. Check network tab for API response

### Sync not showing in Sheet
**Solution:**

1. Verify service account has Sheet access
2. Check Sheet ID is correct in .env
3. Make sure API libraries are installed
4. Check backend console for errors

## Data Privacy & Security

### CSV Export Considerations
- ✅ Exported to your computer only
- ✅ No data sent to external servers
- ✅ Contains all setlist information

### Google Sheets Sync Considerations
- ⚠️ Data stored in Google Sheets (your account)
- ⚠️ Follow Google's privacy policies
- ✅ Uses service account (no user authentication)
- ✅ Only syncs data you explicitly trigger

## Advanced: Custom Integration

To integrate with other services (Airtable, Zapier, etc.):

1. **Use CSV Export** - Export and import elsewhere
2. **Custom Endpoint** - Add a new backend route
3. **Webhook** - Add webhook support (advanced)

Example: Create custom endpoint in `backend/src/routes/integrations.ts`

## Support

For issues with:
- **CSV Export** - See [DEVELOPMENT.md](../DEVELOPMENT.md)
- **Google Sheets API** - Check [Google Sheets API docs](https://developers.google.com/sheets/api)
- **Service Account** - See [Google Cloud docs](https://cloud.google.com/iam/docs/service-accounts)

## Future API Features

Coming soon:
- [ ] Import from Google Sheets
- [ ] Automatic scheduled sync
- [ ] Bidirectional sync
- [ ] Support for Airtable
- [ ] Support for Excel Online
- [ ] Webhook integrations
