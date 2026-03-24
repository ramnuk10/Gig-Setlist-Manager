# Gig Setlist Manager - User Guide

## Getting Started

### Launch the App

```bash
npm run dev
```

Then open http://localhost:3000 in your browser.

## Main Dashboard

The main page shows all your setlists in a card grid layout.

### Actions Available

1. **➕ New Setlist** - Click top-right button to create a new setlist

2. **🔗 Click any setlist card** - View songs in that setlist

3. **✏️ Edit** - Modify setlist name/description

4. **📋 Duplicate** - Copy setlist with all songs

5. **🗑️ Delete** - Remove setlist (you'll be asked to confirm)

## Creating a Setlist

1. Click **"+ New Setlist"**
2. Enter **setlist name** (required)
3. Optionally add a **description**
4. Click **"Save Setlist"**

The setlist appears at the top of the list.

## Managing Songs in a Setlist

### View Songs
- Click on any setlist card to see its details
- All songs are listed with their information
- Songs are automatically numbered in order

### Add a Song
1. Scroll to **"Add Song"** section
2. Enter **song title** (required)
3. Optionally add **artist name**
4. Click **"Add Song"**

The song is added to the bottom of the setlist.

### Remove a Song
- Click **"Remove"** button next to the song
- Song is deleted immediately

## Duplicating a Setlist

Perfect for reusing setlists!

1. On the main dashboard, find the setlist
2. Click **"Duplicate"** button
3. A new setlist is created with " (Copy)" suffix
4. All songs are automatically copied

Now you can edit the copy independently.

## Editing a Setlist

1. On main dashboard, click **"Edit"**
2. Modify the **name** and/or **description**
3. Click **"Save Setlist"**
4. Changes are saved instantly

## Deleting a Setlist

1. Click **"Delete"** button on the setlist card
2. Confirm deletion when prompted
3. Setlist and all its songs are removed

## Tips & Tricks

### Organization Tips
- Use descriptions for setlist details: "Acoustic Set, 45 min duration"
- Use song artist field to track original artists
- Add notes about complex songs

### Song Management
- Songs automatically maintain order
- Re-order by deleting and re-adding (will add this soon!)
- Add timing notes in description

### For Live Performance
- View setlist on your phone while playing
- Songs are in performance order
- Quick reference without page refresh

## Keyboard Shortcuts

- **Escape** - Close form/dialog
- **Tab** - Navigate between form fields
- **Enter** - Submit form (from input fields)

## Common Workflows

### Create Setlist for New Gig
1. Create new setlist with gig date
2. Add all songs you'll play
3. Duplicate for next similar setlist

### Reuse Previous Setlist
1. Find the setlist from past performance
2. Click "Duplicate"
3. Rename it for the new gig
4. Adjust songs as needed

### Quick Reference
1. Keep frequently-used setlists with similar songs
2. Use descriptions to add timing info
3. Duplicate and modify for variations

## Troubleshooting

### Can't See My Setlists
- Refresh the page (F5)
- Check that backend is running (http://localhost:3001/api/health)
- Check browser console for errors (F12)

### Setlist Won't Save
- Check that name field isn't empty
- Check network errors (F12 → Network tab)
- Try refreshing and trying again

### Changes Not Showing
- Refresh the page (F5)
- Clear browser cache (Ctrl+Shift+Delete)
- Restart the development server

### Database Issues
- See [DEVELOPMENT.md](DEVELOPMENT.md) for database reset

## Features (Current)

✅ Setlist CRUD (Create, Read, Update, Delete)
✅ Song management within setlists
✅ Duplicate setlists with songs
✅ Responsive mobile design
✅ Real-time updates
✅ Error notifications
✅ Loading states

## Future Features

🔮 Gig management UI
🔮 Search/filter setlists
🔮 Export to PDF
🔮 Setlist history
🔮 Performance ratings
🔮 Cloud sync
🔮 Mobile app

## Support

For technical issues, see:
- [README.md](README.md) - Project overview
- [DEVELOPMENT.md](DEVELOPMENT.md) - Developer guide
- [QUICK_REFERENCE.md](QUICK_REFERENCE.md) - Command reference

---

Happy performing! 🎸
