# CSV Export Quick Start

## Using CSV Export (Takes 30 Seconds)

### Export All Setlists
1. Run the app: `npm run dev`
2. Go to dashboard (http://localhost:3000)
3. Click **📥 Export CSV** button (top right)
4. File downloads as `setlists-export-2024-03-24.csv`

### Export Single Setlist
1. Click on any setlist to view details
2. Click **📥 Export CSV** button (top right)
3. File downloads as `setlist-name.csv`

## What You Get

The CSV file contains:
- Setlist name and description
- All songs with full details
- Export date and timestamp
- Ready to open in Excel or Sheets

### Example Format
```
Setlist Export
Name,Acoustic Set
Description,"Evening performance set"
Exported,2024-03-24T14:30:00Z

Songs:
Position,Title,Artist,Duration (min),Notes
1,"Wonderwall","Oasis",4,Capo 2
2,"Yesterday","Beatles",2,
3,"Hallelujah","Leonard Cohen",4,Minor key
```

## What to Do With the CSV

### Option 1: Import to Google Sheets (2 minutes)
1. Download the CSV
2. Go to Google Sheets (sheets.google.com)
3. Create new spreadsheet
4. File → Import sheets → Upload file
5. Choose CSV file → Import
6. Done! Data is now in Sheets

### Option 2: Backup (1 minute)
1. Download CSV
2. Save to cloud storage (Google Drive, Dropbox, OneDrive)
3. You have a backup of your setlists

### Option 3: Share with Band (2 minutes)
1. Download CSV
2. Open in Excel
3. Add any notes or edits
4. Email to band members
5. They can import into their own manager

### Option 4: Edit in Excel (5 minutes)
1. Download CSV
2. Open in Excel
3. Add/edit songs and details
4. Save as CSV
5. Create new setlist manually with updated info
   (Import feature coming soon)

## Setting Up Google Sheets Sync (Advanced)

Want automatic sync instead of CSV export?

See **[GOOGLE_SHEETS_GUIDE.md](GOOGLE_SHEETS_GUIDE.md)** for:
- Step-by-step Google Cloud setup
- Service account creation
- Automatic syncing
- Advanced integrations

## Next Steps

| What | How | Time |
|------|-----|------|
| Export CSV | Click button | 30 sec |
| Import to Sheets | Upload CSV manually | 2 min |
| Set up auto-sync | Follow guide + setup | 30 min |
| Share with band | Email CSV file | 1 min |
| Backup | Save CSV to cloud | 1 min |

---

**Start exporting now!** Click the 📥 button on any setlist.
