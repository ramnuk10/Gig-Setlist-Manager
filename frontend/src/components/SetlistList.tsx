import { Link } from 'react-router-dom'

interface Setlist {
  id: number
  name: string
  description?: string
  created_at?: string
  updated_at?: string
}

interface SetlistListProps {
  setlists: Setlist[]
  onDelete: (id: number) => void
  onDuplicate: (id: number) => void
  onEdit: (setlist: Setlist) => void
  isLoading?: boolean
}

export default function SetlistList({
  setlists,
  onDelete,
  onDuplicate,
  onEdit,
  isLoading = false,
}: SetlistListProps) {
  if (setlists.length === 0) {
    return (
      <div className="empty-state">
        <p>No setlists yet</p>
        <p className="empty-state-hint">Create your first setlist to get started!</p>
      </div>
    )
  }

  return (
    <div className="setlist-list">
      {setlists.map((setlist) => (
        <div key={setlist.id} className="setlist-card">
          <div className="card-header">
            <Link to={`/setlist/${setlist.id}`} className="setlist-title">
              {setlist.name}
            </Link>
          </div>

          {setlist.description && (
            <p className="card-description">{setlist.description}</p>
          )}

          <div className="card-footer">
            <small className="card-date">
              {setlist.created_at
                ? new Date(setlist.created_at).toLocaleDateString()
                : 'Unknown date'}
            </small>

            <div className="card-actions">
              <button
                onClick={() => onEdit(setlist)}
                disabled={isLoading}
                className="btn-small"
                title="Edit setlist"
              >
                Edit
              </button>
              <button
                onClick={() => onDuplicate(setlist.id)}
                disabled={isLoading}
                className="btn-small"
                title="Duplicate setlist"
              >
                Duplicate
              </button>
              <button
                onClick={() => {
                  if (confirm(`Delete "${setlist.name}"?`)) {
                    onDelete(setlist.id)
                  }
                }}
                disabled={isLoading}
                className="btn-small btn-danger"
                title="Delete setlist"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
