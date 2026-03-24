import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import ExportButton from '../components/ExportButton'

interface Song {
  id: number
  title: string
  artist?: string
  duration?: number
  notes?: string
  position: number
}

interface SetlistDetail {
  id: number
  name: string
  description?: string
  songs: Song[]
  created_at?: string
  updated_at?: string
}

export default function SetlistDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [setlist, setSetlist] = useState<SetlistDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [newSongTitle, setNewSongTitle] = useState('')
  const [newSongArtist, setNewSongArtist] = useState('')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetchSetlistDetail()
  }, [id])

  const fetchSetlistDetail = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await fetch(`/api/setlists/${id}`)
      if (!response.ok) throw new Error('Failed to fetch setlist')
      const data = await response.json()
      setSetlist(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setLoading(false)
    }
  }

  const handleAddSong = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!newSongTitle.trim()) {
      setError('Song title is required')
      return
    }

    try {
      setSaving(true)
      const response = await fetch(`/api/setlists/${id}/songs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: newSongTitle.trim(),
          artist: newSongArtist.trim() || undefined,
        }),
      })

      if (!response.ok) throw new Error('Failed to add song')
      const newSong = await response.json()

      setSetlist(
        setlist
          ? { ...setlist, songs: [...setlist.songs, newSong] }
          : setlist
      )
      setNewSongTitle('')
      setNewSongArtist('')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add song')
    } finally {
      setSaving(false)
    }
  }

  const handleDeleteSong = async (songId: number) => {
    if (!confirm('Delete this song?')) return

    try {
      setSaving(true)
      const response = await fetch(`/api/songs/${songId}`, {
        method: 'DELETE',
      })

      if (!response.ok) throw new Error('Failed to delete song')
      setSetlist(
        setlist
          ? {
              ...setlist,
              songs: setlist.songs.filter((s) => s.id !== songId),
            }
          : setlist
      )
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete song')
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <div className="loading">Loading setlist...</div>
  if (error) return <div className="error-message">{error}</div>
  if (!setlist) return <div className="error-message">Setlist not found</div>

  return (
    <div className="setlist-detail-page">
      <div className="detail-header">
        <button onClick={() => navigate('/')} className="btn-secondary">
          ← Back
        </button>
        <h2>{setlist.name}</h2>
        <ExportButton setlistId={setlist.id} setlistName={setlist.name} />
      </div>

      {setlist.description && (
        <p className="detail-description">{setlist.description}</p>
      )}

      <div className="songs-section">
        <h3>Songs ({setlist.songs.length})</h3>

        {setlist.songs.length === 0 ? (
          <p className="empty-hint">No songs yet. Add one below!</p>
        ) : (
          <div className="songs-list">
            {setlist.songs.map((song) => (
              <div key={song.id} className="song-item">
                <div className="song-info">
                  <div className="song-title">{song.title}</div>
                  {song.artist && (
                    <div className="song-artist">by {song.artist}</div>
                  )}
                  {song.notes && (
                    <div className="song-notes">{song.notes}</div>
                  )}
                </div>
                <button
                  onClick={() => handleDeleteSong(song.id)}
                  disabled={saving}
                  className="btn-small btn-danger"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="add-song-section">
        <h3>Add Song</h3>
        <form onSubmit={handleAddSong} className="add-song-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="title">Song Title *</label>
              <input
                id="title"
                type="text"
                value={newSongTitle}
                onChange={(e) => setNewSongTitle(e.target.value)}
                placeholder="Enter song title"
                disabled={saving}
              />
            </div>
            <div className="form-group">
              <label htmlFor="artist">Artist</label>
              <input
                id="artist"
                type="text"
                value={newSongArtist}
                onChange={(e) => setNewSongArtist(e.target.value)}
                placeholder="Enter artist (optional)"
                disabled={saving}
              />
            </div>
          </div>
          <button type="submit" disabled={saving} className="btn-primary">
            {saving ? 'Adding...' : 'Add Song'}
          </button>
        </form>
      </div>
    </div>
  )
}
