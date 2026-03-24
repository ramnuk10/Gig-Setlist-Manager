import { Router, Request, Response } from 'express'
import { getDatabase } from '../db.js'

const router = Router()

// Export setlist as CSV
router.get('/:id/csv', (req: Request, res: Response) => {
  try {
    const db = getDatabase()
    const { id } = req.params

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

    // Build CSV
    let csv = 'Setlist Export\n'
    csv += `Name,${setlist.name}\n`
    csv += `Description,"${(setlist.description || '').replace(/"/g, '""')}"\n`
    csv += `Exported,${new Date().toISOString()}\n\n`
    csv += 'Songs:\n'
    csv += 'Position,Title,Artist,Duration (min),Notes\n'

    songs.forEach((song) => {
      csv += `${song.position},"${song.title.replace(/"/g, '""')}","${(song.artist || '').replace(/"/g, '""')}",${song.duration || ''},${(song.notes || '').replace(/"/g, '""')}\n`
    })

    // Send as file download
    res.setHeader('Content-Type', 'text/csv;charset=utf-8')
    res.setHeader('Content-Disposition', `attachment;filename="${setlist.name}.csv"`)
    res.send(csv)
  } catch (error) {
    console.error('Error exporting setlist:', error)
    res.status(500).json({ error: 'Failed to export setlist' })
  }
})

// Export all setlists as CSV
router.get('/csv', (req: Request, res: Response) => {
  try {
    const db = getDatabase()

    const setlists = db.prepare(`
      SELECT id, name, description
      FROM setlists
      ORDER BY created_at DESC
    `).all() as any[]

    let csv = 'All Setlists Export\n'
    csv += `Exported,${new Date().toISOString()}\n\n`
    csv += 'Setlists:\n'
    csv += 'Name,Description,Songs Count\n'

    setlists.forEach((setlist) => {
      const songCount = (db.prepare(`
        SELECT COUNT(*) as count FROM songs WHERE setlist_id = ?
      `).get(setlist.id) as any).count

      csv += `"${setlist.name.replace(/"/g, '""')}","${(setlist.description || '').replace(/"/g, '""')}",${songCount}\n`
    })

    csv += '\n\nDetailed Songs by Setlist:\n'
    setlists.forEach((setlist) => {
      csv += `\n${setlist.name}\n`
      csv += 'Position,Title,Artist,Duration (min),Notes\n'

      const songs = db.prepare(`
        SELECT title, artist, duration, notes, position
        FROM songs
        WHERE setlist_id = ?
        ORDER BY position ASC
      `).all(setlist.id) as any[]

      songs.forEach((song) => {
        csv += `${song.position},"${song.title.replace(/"/g, '""')}","${(song.artist || '').replace(/"/g, '""')}",${song.duration || ''},${(song.notes || '').replace(/"/g, '""')}\n`
      })
    })

    res.setHeader('Content-Type', 'text/csv;charset=utf-8')
    res.setHeader('Content-Disposition', `attachment;filename="setlists-export-${new Date().toISOString().split('T')[0]}.csv"`)
    res.send(csv)
  } catch (error) {
    console.error('Error exporting setlists:', error)
    res.status(500).json({ error: 'Failed to export setlists' })
  }
})

export default router
