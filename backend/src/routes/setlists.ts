import { Router, Request, Response } from 'express'
import { getDatabase } from '../db.js'

const router = Router()

// GET all setlists
router.get('/', (req: Request, res: Response) => {
  try {
    const db = getDatabase()
    const setlists = db.prepare(`
      SELECT id, name, description, created_at, updated_at 
      FROM setlists 
      ORDER BY created_at DESC
    `).all()
    res.json(setlists)
  } catch (error) {
    console.error('Error fetching setlists:', error)
    res.status(500).json({ error: 'Failed to fetch setlists' })
  }
})

// GET single setlist with songs
router.get('/:id', (req: Request, res: Response) => {
  try {
    const db = getDatabase()
    const { id } = req.params
    
    const setlist = db.prepare(`
      SELECT id, name, description, created_at, updated_at 
      FROM setlists 
      WHERE id = ?
    `).get(id)

    if (!setlist) {
      return res.status(404).json({ error: 'Setlist not found' })
    }

    const songs = db.prepare(`
      SELECT id, title, artist, duration, notes, position
      FROM songs
      WHERE setlist_id = ?
      ORDER BY position ASC
    `).all(id)

    res.json({ ...setlist, songs })
  } catch (error) {
    console.error('Error fetching setlist:', error)
    res.status(500).json({ error: 'Failed to fetch setlist' })
  }
})

// POST new setlist
router.post('/', (req: Request, res: Response) => {
  try {
    const db = getDatabase()
    const { name, description, gig_id } = req.body

    if (!name) {
      return res.status(400).json({ error: 'Setlist name is required' })
    }

    const result = db.prepare(`
      INSERT INTO setlists (name, description, gig_id)
      VALUES (?, ?, ?)
    `).run(name, description || null, gig_id || null)

    const newSetlist = db.prepare(`
      SELECT id, name, description, created_at, updated_at
      FROM setlists
      WHERE id = ?
    `).get(result.lastInsertRowid)

    res.status(201).json(newSetlist)
  } catch (error) {
    console.error('Error creating setlist:', error)
    res.status(500).json({ error: 'Failed to create setlist' })
  }
})

// PUT update setlist
router.put('/:id', (req: Request, res: Response) => {
  try {
    const db = getDatabase()
    const { id } = req.params
    const { name, description } = req.body

    if (!name) {
      return res.status(400).json({ error: 'Setlist name is required' })
    }

    db.prepare(`
      UPDATE setlists 
      SET name = ?, description = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `).run(name, description || null, id)

    const updatedSetlist = db.prepare(`
      SELECT id, name, description, created_at, updated_at
      FROM setlists
      WHERE id = ?
    `).get(id)

    if (!updatedSetlist) {
      return res.status(404).json({ error: 'Setlist not found' })
    }

    res.json(updatedSetlist)
  } catch (error) {
    console.error('Error updating setlist:', error)
    res.status(500).json({ error: 'Failed to update setlist' })
  }
})

// POST duplicate setlist
router.post('/:id/duplicate', (req: Request, res: Response) => {
  try {
    const db = getDatabase()
    const { id } = req.params

    // Get original setlist
    const setlist = db.prepare(`
      SELECT name, description, gig_id
      FROM setlists
      WHERE id = ?
    `).get(id) as any

    if (!setlist) {
      return res.status(404).json({ error: 'Setlist not found' })
    }

    // Create new setlist with "Copy" suffix
    const newName = `${setlist.name} (Copy)`
    const result = db.prepare(`
      INSERT INTO setlists (name, description, gig_id)
      VALUES (?, ?, ?)
    `).run(newName, setlist.description, setlist.gig_id)

    // Copy all songs
    const songs = db.prepare(`
      SELECT title, artist, duration, notes, position
      FROM songs
      WHERE setlist_id = ?
      ORDER BY position ASC
    `).all(id)

    const newSetlistId = result.lastInsertRowid
    for (const song of songs) {
      db.prepare(`
        INSERT INTO songs (setlist_id, title, artist, duration, notes, position)
        VALUES (?, ?, ?, ?, ?, ?)
      `).run(newSetlistId, (song as any).title, (song as any).artist, 
             (song as any).duration, (song as any).notes, (song as any).position)
    }

    const newSetlist = db.prepare(`
      SELECT id, name, description, created_at, updated_at
      FROM setlists
      WHERE id = ?
    `).get(newSetlistId)

    res.status(201).json(newSetlist)
  } catch (error) {
    console.error('Error duplicating setlist:', error)
    res.status(500).json({ error: 'Failed to duplicate setlist' })
  }
})

// DELETE setlist
router.delete('/:id', (req: Request, res: Response) => {
  try {
    const db = getDatabase()
    const { id } = req.params

    const setlist = db.prepare('SELECT id FROM setlists WHERE id = ?').get(id)
    if (!setlist) {
      return res.status(404).json({ error: 'Setlist not found' })
    }

    db.prepare('DELETE FROM setlists WHERE id = ?').run(id)

    res.json({ message: 'Setlist deleted successfully', id })
  } catch (error) {
    console.error('Error deleting setlist:', error)
    res.status(500).json({ error: 'Failed to delete setlist' })
  }
})

export default router
