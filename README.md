# 🎸 Gig Setlist Manager

A modern web application to manage setlists for guitar gigs. Create, organize, and duplicate setlists with ease.

## ✨ Features

### Setlist Management
- ✅ Create, edit, and delete setlists
- ✅ Duplicate setlists with all songs included
- ✅ Add descriptions to setlists
- ✅ Beautiful responsive card-based UI
- ✅ Real-time updates and error handling

### Song Management
- ✅ Add songs to setlists
- ✅ Edit and remove songs
- ✅ Track artist names and song duration
- ✅ Add performance notes
- ✅ Auto-ordered song positions

### Gig Management
- ✅ Create and manage gigs
- ✅ Organize setlists by gig
- ✅ Store venue and gig notes
- ✅ Track gig dates

### User Experience
- ✅ Loading skeletons for smooth loading
- ✅ Confirmation dialogs for destructive actions
- ✅ Real-time error notifications
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Dark theme optimized for live performance
- ✅ CSV export for backup and sharing
- ✅ Google Sheets integration ready (optional setup)

## 🏗️ Tech Stack

- **Frontend:** React 18 + TypeScript + Vite
- **Backend:** Express.js + TypeScript
- **Database:** SQLite3
- **Styling:** CSS3 (Dark theme)

## 🚀 Quick Start

### Installation
```bash
npm run install-all
```

### Running Development Servers
```bash
npm run dev
```

- Frontend: http://localhost:3000
- Backend API: http://localhost:3001

### Building for Production
```bash
npm run build
```

## 📡 API Endpoints

### Setlists
- `GET /api/setlists` - Get all setlists
- `POST /api/setlists` - Create new setlist
- `GET /api/setlists/:id` - Get setlist with songs
- `PUT /api/setlists/:id` - Update setlist
- `DELETE /api/setlists/:id` - Delete setlist
- `POST /api/setlists/:id/duplicate` - Duplicate setlist (copies songs)

### Songs
- `POST /api/setlists/:setlistId/songs` - Add song to setlist
- `PUT /api/songs/:id` - Update song
- `DELETE /api/songs/:id` - Delete song

### Gigs
- `GET /api/gigs` - Get all gigs
- `POST /api/gigs` - Create gig
- `GET /api/gigs/:id` - Get gig with setlists
- `PUT /api/gigs/:id` - Update gig
- `DELETE /api/gigs/:id` - Delete gig

### Export & Integration
- `GET /api/export/:setlistId/csv` - Export setlist as CSV
- `GET /api/export/csv` - Export all setlists as CSV
- `POST /api/sheets/:setlistId/sync-sheets` - Sync to Google Sheets
- `GET /api/sheets/:setlistId/sync-status` - Check Google Sheets status

## 🔧 Development

**Type checking:**
```bash
cd backend && npm run type-check
cd frontend && npm run type-check
```

**Linting:**
```bash
cd backend && npm run lint
cd frontend && npm run lint
```

See [DEVELOPMENT.md](DEVELOPMENT.md) for more details.
