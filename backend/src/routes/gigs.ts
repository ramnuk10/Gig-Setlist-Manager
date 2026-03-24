import { Router, Request, Response } from 'express'
import { getDatabase } from '../db.js'

const router = Router()

// GET all gigs
router.get('/', (req: Request, res: Response) => {
  try {
    const db = getDatabase()
    const gigs = db.prepare(`
      SELECT id, title, date, venue, notes, created_at, updated_at 
      FROM gigs 
      ORDER BY date DESC
    `).all()
    res.json(gigs)
  } catch (error) {
    console.error('Error fetching gigs:', error)
    res.status(500).json({ error: 'Failed to fetch gigs' })
  }
})

// GET single gig with setlists
router.get('/:id', (req: Request, res: Response) => {
  try {
    const db = getDatabase()
    const { id } = req.params

    const gig = db.prepare(`
      SELECT id, title, date, venue, notes, created_at, updated_at 
      FROM gigs 
      WHERE id = ?
    `).get(id)

    if (!gig) {
      return res.status(404).json({ error: 'Gig not found' })
    }

    const setlists = db.prepare(`
      SELECT id, name, description, created_at, updated_at
      FROM setlists
      WHERE gig_id = ?
      ORDER BY created_at DESC
    `).all(id)

    res.json({ ...gig, setlists })
  } catch (error) {
    console.error('Error fetching gig:', error)
    res.status(500).json({ error: 'Failed to fetch gig' })
  }
})

// POST new gig
router.post('/', (req: Request, res: Response) => {
  try {
    const db = getDatabase()
    const { title, date, venue, notes } = req.body

    if (!title) {
      return res.status(400).json({ error: 'Gig title is required' })
    }

    if (!date) {
      return res.status(400).json({ error: 'Gig date is required' })
    }

    const result = db.prepare(`
      INSERT INTO gigs (title, date, venue, notes)
      VALUES (?, ?, ?, ?)
    `).run(title, date, venue || null, notes || null)

    const newGig = db.prepare(`
      SELECT id, title, date, venue, notes, created_at, updated_at
      FROM gigs
      WHERE id = ?
    `).get(result.lastInsertRowid)

    res.status(201).json(newGig)
  } catch (error) {
    console.error('Error creating gig:', error)
    res.status(500).json({ error: 'Failed to create gig' })
  }
})

// PUT update gig
router.put('/:id', (req: Request, res: Response) => {
  try {
    const db = getDatabase()
    const { id } = req.params
    const { title, date, venue, notes } = req.body

    if (!title) {
      return res.status(400).json({ error: 'Gig title is required' })
    }

    if (!date) {
      return res.status(400).json({ error: 'Gig date is required' })
    }

    db.prepare(`
      UPDATE gigs 
      SET title = ?, date = ?, venue = ?, notes = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `).run(title, date, venue || null, notes || null, id)

    const updatedGig = db.prepare(`
      SELECT id, title, date, venue, notes, created_at, updated_at
      FROM gigs
      WHERE id = ?
    `).get(id)

    if (!updatedGig) {
      return res.status(404).json({ error: 'Gig not found' })
    }

    res.json(updatedGig)
  } catch (error) {
    console.error('Error updating gig:', error)
    res.status(500).json({ error: 'Failed to update gig' })
  }
})

// DELETE gig
router.delete('/:id', (req: Request, res: Response) => {
  try {
    const db = getDatabase()
    const { id } = req.params

    const gig = db.prepare('SELECT id FROM gigs WHERE id = ?').get(id)
    if (!gig) {
      return res.status(404).json({ error: 'Gig not found' })
    }

    db.prepare('DELETE FROM gigs WHERE id = ?').run(id)

    res.json({ message: 'Gig deleted successfully', id })
  } catch (error) {
    console.error('Error deleting gig:', error)
    res.status(500).json({ error: 'Failed to delete gig' })
  }
})

export default router
