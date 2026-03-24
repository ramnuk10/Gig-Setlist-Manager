import { Router, Request, Response } from 'express'
import { getDatabase } from '../db.js'

const router = Router()

// POST add song to setlist
router.post('/setlists/:setlistId/songs', (req: Request, res: Response) => {
  try {
    const db = getDatabase()
    const { setlistId } = req.params
    const { title, artist, duration, notes } = req.body

    if (!title) {
      return res.status(400).json({ error: 'Song title is required' })
    }

    // Get the next position
    const lastSong = db.prepare(`
      SELECT position FROM songs
      WHERE setlist_id = ?
      ORDER BY position DESC
      LIMIT 1
    `).get(setlistId) as any

    const position = lastSong ? lastSong.position + 1 : 1

    const result = db.prepare(`
      INSERT INTO songs (setlist_id, title, artist, duration, notes, position)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(setlistId, title, artist || null, duration || null, notes || null, position)

    const newSong = db.prepare(`
      SELECT id, setlist_id, title, artist, duration, notes, position
      FROM songs
      WHERE id = ?
    `).get(result.lastInsertRowid)

    res.status(201).json(newSong)
  } catch (error) {
    console.error('Error adding song:', error)
    res.status(500).json({ error: 'Failed to add song' })
  }
})

// PUT update song
router.put('/songs/:id', (req: Request, res: Response) => {
  try {
    const db = getDatabase()
    const { id } = req.params
    const { title, artist, duration, notes } = req.body

    if (!title) {
      return res.status(400).json({ error: 'Song title is required' })
    }

    db.prepare(`
      UPDATE songs
      SET title = ?, artist = ?, duration = ?, notes = ?
      WHERE id = ?
    `).run(title, artist || null, duration || null, notes || null, id)

    const updatedSong = db.prepare(`
      SELECT id, setlist_id, title, artist, duration, notes, position
      FROM songs
      WHERE id = ?
    `).get(id)

    if (!updatedSong) {
      return res.status(404).json({ error: 'Song not found' })
    }

    res.json(updatedSong)
  } catch (error) {
    console.error('Error updating song:', error)
    res.status(500).json({ error: 'Failed to update song' })
  }
})

// DELETE song
router.delete('/songs/:id', (req: Request, res: Response) => {
  try {
    const db = getDatabase()
    const { id } = req.params

    const song = db.prepare('SELECT id FROM songs WHERE id = ?').get(id)
    if (!song) {
      return res.status(404).json({ error: 'Song not found' })
    }

    db.prepare('DELETE FROM songs WHERE id = ?').run(id)

    res.json({ message: 'Song deleted successfully', id })
  } catch (error) {
    console.error('Error deleting song:', error)
    res.status(500).json({ error: 'Failed to delete song' })
  }
})

export default router
