import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { initializeDatabase } from './db.js';
import setlistRoutes from './routes/setlists.js';
import gigRoutes from './routes/gigs.js';
import songRoutes from './routes/songs.js';
import exportRoutes from './routes/export.js';
import sheetsRoutes from './routes/google-sheets.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize database
initializeDatabase();

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API routes
app.use('/api/setlists', setlistRoutes);
app.use('/api/gigs', gigRoutes);
app.use('/api/export', exportRoutes);
app.use('/api/sheets', sheetsRoutes);
app.use('/api', songRoutes);

// Error handling
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
