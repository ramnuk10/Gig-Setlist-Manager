import { Router, Request, Response } from 'express'
import { getDatabase } from '../db.js'

const router = Router()

/**
 * Google Sheets Integration Endpoints
 * 
 * Before using, set up Google Sheets API:
 * 1. Create a service account in Google Cloud Console
 * 2. Download credentials JSON
 * 3. Set GOOGLE_SHEETS_CREDENTIALS env variable
 * 4. Share your Google Sheet with the service account email
 * 5. Set GOOGLE_SHEET_ID env variable with your sheet ID
 * 
 * Sheet structure should have two tabs:
 * - "Setlists" with columns: Name, Description, SongCount
 * - "Songs" with columns: SetlistName, Position, Title, Artist, Duration, Notes
 */

// POST sync setlist to Google Sheets
router.post('/:id/sync-sheets', (req: Request, res: Response) => {
  try {
    const db = getDatabase()
    const { id } = req.params

    // Check if Google Sheets is configured
    if (!process.env.GOOGLE_SHEETS_CREDENTIALS || !process.env.GOOGLE_SHEET_ID) {
      return res.status(400).json({
        error: 'Google Sheets not configured. Set GOOGLE_SHEETS_CREDENTIALS and GOOGLE_SHEET_ID env variables.',
        instructions: 'See src/routes/google-sheets.ts for setup instructions',
      })
    }

    const setlist = db.prepare(`
      SELECT id, name, description
      FROM setlists
      WHERE id = ?
    `).get(id) as any

    if (!setlist) {
      return res.status(404).json({ error: 'Setlist not found' })
    }

    const songs = db.prepare(`
      SELECT title, artist, duration, notes, position
      FROM songs
      WHERE setlist_id = ?
      ORDER BY position ASC
    `).all(id) as any[]

    // Prepare data for Google Sheets format
    const setlistData = {
      name: setlist.name,
      description: setlist.description || '',
      songCount: songs.length,
      lastSynced: new Date().toISOString(),
    }

    res.json({
      status: 'ready-to-sync',
      message: 'Implementation pending - requires google-auth-library',
      setlistData,
      songs,
      note: 'Install @google-cloud/sheets and @google-cloud/google-auth-library to enable full integration',
    })
  } catch (error) {
    console.error('Error preparing sheets sync:', error)
    res.status(500).json({ error: 'Failed to prepare Google Sheets sync' })
  }
})

// GET sync status
router.get('/:id/sync-status', (req: Request, res: Response) => {
  try {
    const { id } = req.params

    res.json({
      configured: !!(process.env.GOOGLE_SHEETS_CREDENTIALS && process.env.GOOGLE_SHEET_ID),
      sheetId: process.env.GOOGLE_SHEET_ID ? 'Set' : 'Not set',
      credentialsSet: !!process.env.GOOGLE_SHEETS_CREDENTIALS,
      instructions: {
        setup: 'Install: npm install @google-cloud/sheets @google-auth-library',
        env: {
          GOOGLE_SHEETS_CREDENTIALS: 'Path to service account JSON or JSON string',
          GOOGLE_SHEET_ID: 'Your Google Sheet ID from URL',
        },
      },
    })
  } catch (error) {
    console.error('Error getting sync status:', error)
    res.status(500).json({ error: 'Failed to get sync status' })
  }
})

export default router
