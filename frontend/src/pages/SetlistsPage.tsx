import { useState, useEffect } from 'react'
import SetlistForm from '../components/SetlistForm'
import SetlistList from '../components/SetlistList'
import ExportButton from '../components/ExportButton'
import { SetlistListSkeleton } from '../components/Skeleton'

interface Setlist {
  id: number
  name: string
  description?: string
  created_at?: string
  updated_at?: string
}

export default function SetlistsPage() {
  const [setlists, setSetlists] = useState<Setlist[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [editingSetlist, setEditingSetlist] = useState<Setlist | null>(null)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetchSetlists()
  }, [])

  const fetchSetlists = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await fetch('/api/setlists')
      if (!response.ok) throw new Error('Failed to fetch setlists')
      const data = await response.json()
      setSetlists(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setLoading(false)
    }
  }

  const handleCreateSetlist = async (formData: {
    name: string
    description?: string
  }) => {
    try {
      setSaving(true)
      const response = await fetch('/api/setlists', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!response.ok) throw new Error('Failed to create setlist')
      const newSetlist = await response.json()
      setSetlists([newSetlist, ...setlists])
      setShowForm(false)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create setlist')
    } finally {
      setSaving(false)
    }
  }

  const handleUpdateSetlist = async (formData: {
    name: string
    description?: string
  }) => {
    if (!editingSetlist) return

    try {
      setSaving(true)
      const response = await fetch(`/api/setlists/${editingSetlist.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!response.ok) throw new Error('Failed to update setlist')
      const updatedSetlist = await response.json()
      setSetlists(
        setlists.map((s) => (s.id === updatedSetlist.id ? updatedSetlist : s))
      )
      setEditingSetlist(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update setlist')
    } finally {
      setSaving(false)
    }
  }

  const handleDeleteSetlist = async (id: number) => {
    try {
      setSaving(true)
      const response = await fetch(`/api/setlists/${id}`, { method: 'DELETE' })
      if (!response.ok) throw new Error('Failed to delete setlist')
      setSetlists(setlists.filter((s) => s.id !== id))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete setlist')
    } finally {
      setSaving(false)
    }
  }

  const handleDuplicateSetlist = async (id: number) => {
    try {
      setSaving(true)
      const response = await fetch(`/api/setlists/${id}/duplicate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      })

      if (!response.ok) throw new Error('Failed to duplicate setlist')
      const duplicatedSetlist = await response.json()
      setSetlists([duplicatedSetlist, ...setlists])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to duplicate setlist')
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <SetlistListSkeleton />

  return (
    <div className="setlists-page">
      {error && <div className="error-message">{error}</div>}

      <div className="page-header">
        <h2>My Setlists</h2>
        <div className="header-actions">
          <ExportButton includeAllSetlists={true} />
          {!showForm && !editingSetlist && (
            <button
              onClick={() => setShowForm(true)}
              className="btn-primary"
              disabled={saving}
            >
              + New Setlist
            </button>
          )}
        </div>
      </div>

      {(showForm || editingSetlist) && (
        <div className="form-container">
          <h3>{editingSetlist ? 'Edit Setlist' : 'Create New Setlist'}</h3>
          <SetlistForm
            onSubmit={editingSetlist ? handleUpdateSetlist : handleCreateSetlist}
            onCancel={() => {
              setShowForm(false)
              setEditingSetlist(null)
            }}
            initialValues={editingSetlist || undefined}
            isLoading={saving}
          />
        </div>
      )}

      <SetlistList
        setlists={setlists}
        onDelete={handleDeleteSetlist}
        onDuplicate={handleDuplicateSetlist}
        onEdit={(setlist) => {
          setEditingSetlist(setlist)
          setShowForm(false)
        }}
        isLoading={saving}
      />
    </div>
  )
}
