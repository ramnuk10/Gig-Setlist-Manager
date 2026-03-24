# Local Development Guide

## Getting Started

### 1. First Time Setup
```bash
# From project root
npm run install-all
```

Or manually:
```bash
npm install                    # Install root dependencies
cd backend && npm install && cd ..
cd frontend && npm install && cd ..
```

### 2. Environment Variables

**Backend (.env):**
```bash
cd backend
cp .env.example .env
```

### 3. Running Development Servers

**Option A: Run both together**
```bash
npm run dev
```

**Option B: Run separately**

Backend (Terminal 1):
```bash
cd backend
npm run dev
```

Frontend (Terminal 2):
```bash
cd frontend
npm run dev
```

### 4. Accessing the App
- Frontend: http://localhost:3000
- Backend API: http://localhost:3001
- Health check: http://localhost:3001/api/health

## Project Structure

### Backend
- `src/index.ts` - Express server setup
- `src/db.ts` - SQLite database initialization
- `src/routes/` - API route handlers (to be added)

**Database Schema:**
- `gigs` - Gig events
- `setlists` - Collections of songs for gigs
- `songs` - Individual songs in setlists

### Frontend
- `src/App.tsx` - Main app component
- `src/pages/` - Page components
- `src/components/` - Reusable components
- `vite.config.ts` - Vite configuration with API proxy

## Common Tasks

### Build for Production
```bash
npm run build
```

### Type Checking
Backend:
```bash
cd backend && npm run type-check
```

Frontend:
```bash
cd frontend && npm run type-check
```

### Linting
Backend:
```bash
cd backend && npm run lint
```

Frontend:
```bash
cd frontend && npm run lint
```

## Database

The SQLite database is created automatically when the backend starts. It's stored in `backend/data/setlist.db`.

To inspect the database:
```bash
cd backend/data
sqlite3 setlist.db
```

## API Endpoints (To Be Implemented)

### Setlists
- `GET /api/setlists` - Get all setlists
- `POST /api/setlists` - Create new setlist
- `GET /api/setlists/:id` - Get specific setlist
- `PUT /api/setlists/:id` - Update setlist
- `DELETE /api/setlists/:id` - Delete setlist

### Songs
- `GET /api/setlists/:id/songs` - Get songs in setlist
- `POST /api/setlists/:id/songs` - Add song to setlist
- `DELETE /api/songs/:id` - Delete song

## Troubleshooting

### Port Already in Use
If ports 3000 or 3001 are already in use, you can change them in:
- Frontend: `frontend/vite.config.ts` - server.port
- Backend: `backend/.env` - PORT variable

### Database Issues
Delete `backend/data/setlist.db` and restart the backend to reset the database.

### Module Not Found
Ensure all dependencies are installed:
```bash
npm run install-all
```

## Next Steps

1. Implement API routes for setlists CRUD operations
2. Add form components for creating/editing setlists
3. Implement song management
4. Add data persistence and loading
5. Enhance UI/UX with better styling
