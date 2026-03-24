# Gig Setlist Manager - Quick Reference

## 🎯 Getting Started (30 seconds)

```bash
# 1. Install everything
npm run install-all

# 2. Start development
npm run dev

# 3. Open browser
# Frontend: http://localhost:3000
# API: http://localhost:3001
```

## 📁 Project Files at a Glance

### Root Level
- `README.md` - Project overview
- `DEVELOPMENT.md` - Detailed dev guide
- `IMPLEMENTATION_SUMMARY.md` - What was built
- `package.json` - Workspace scripts
- `start.sh` - Quick start script

### Backend (`backend/`)
- `src/index.ts` - Server entry point
- `src/db.ts` - Database setup
- `src/routes/setlists.ts` - CRUD + duplicate
- `src/routes/songs.ts` - Song management
- `src/routes/gigs.ts` - Gig management
- `data/setlist.db` - SQLite database

### Frontend (`frontend/`)
- `src/App.tsx` - Router and layout
- `src/pages/SetlistsPage.tsx` - Dashboard
- `src/pages/SetlistDetailPage.tsx` - Detail view
- `src/components/SetlistForm.tsx` - Form
- `src/components/SetlistList.tsx` - Grid
- `src/components/Skeleton.tsx` - Loading
- `src/App.css` - All styling

## 🔌 API Cheat Sheet

```bash
# Setlists
GET    /api/setlists              # List all
POST   /api/setlists              # Create
GET    /api/setlists/:id          # Detail
PUT    /api/setlists/:id          # Update
DELETE /api/setlists/:id          # Delete
POST   /api/setlists/:id/duplicate # Duplicate

# Songs
POST   /api/setlists/:id/songs    # Add
PUT    /api/songs/:id             # Update
DELETE /api/songs/:id             # Delete

# Gigs
GET    /api/gigs                  # List
POST   /api/gigs                  # Create
GET    /api/gigs/:id              # Detail
PUT    /api/gigs/:id              # Update
DELETE /api/gigs/:id              # Delete
```

## 🛠️ Common Tasks

```bash
# Run everything
npm run dev

# Build for production
npm run build

# Check types (backend)
cd backend && npm run type-check

# Check types (frontend)
cd frontend && npm run type-check

# Install deps
npm run install-all

# Reset database
rm backend/data/setlist.db
# Then restart backend
```

## 📊 Database Quick Reference

**Gigs:** Store gig events (date, venue, notes)
**Setlists:** Collections of songs for a gig
**Songs:** Individual songs with title, artist, duration

All linked by foreign keys with cascade delete.

## 🎨 Styling Notes

- Dark theme in `frontend/src/App.css`
- Responsive grid layout for setlist cards
- Mobile-first approach with media queries
- Skeleton loaders for loading states
- Button states and hover effects included

## 🚀 Deployment Checklist

- [ ] Build frontend: `cd frontend && npm run build`
- [ ] Build backend: `cd backend && npm run build`
- [ ] Set environment variables
- [ ] Configure database path
- [ ] Test API endpoints
- [ ] Enable CORS if cross-origin
- [ ] Set appropriate ports

## 💡 Pro Tips

1. **Reset everything:** `rm -rf node_modules backend/node_modules frontend/node_modules && npm run install-all`

2. **Debug database:** 
   ```bash
   cd backend/data
   sqlite3 setlist.db
   .tables              # View tables
   SELECT * FROM setlists;  # Query data
   ```

3. **API testing:**
   ```bash
   curl http://localhost:3001/api/health
   curl http://localhost:3001/api/setlists
   ```

4. **Mobile testing:** Use F12 → Toggle Device Toolbar in browser

## 🔐 Security Notes

- No authentication yet (add it before production use)
- SQLite suitable for single-user apps
- CORS enabled for local development
- No input sanitization (add before production)

## 💾 File Statistics

- **Backend:** ~350 lines of code (routes + db setup)
- **Frontend:** ~500 lines (components + pages)
- **Styling:** ~500 lines (comprehensive CSS)
- **Config:** Package.json, TypeScript configs, etc.
- **Total:** ~1500 lines of production code

## 🎯 Next Feature Ideas

- [ ] Search/filter setlists
- [ ] Export to PDF/CSV
- [ ] User authentication
- [ ] Cloud sync
- [ ] Mobile app
- [ ] Setlist versioning
- [ ] Performance ratings
- [ ] MIDI integration

---

**Everything is ready to use!** Start with `npm run dev` 🎸
