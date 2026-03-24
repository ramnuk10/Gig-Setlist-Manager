import { useState } from 'react'

interface SetlistFormProps {
  onSubmit: (data: { name: string; description?: string }) => void
  onCancel: () => void
  initialValues?: { name: string; description?: string }
  isLoading?: boolean
}

export default function SetlistForm({
  onSubmit,
  onCancel,
  initialValues,
  isLoading = false,
}: SetlistFormProps) {
  const [name, setName] = useState(initialValues?.name || '')
  const [description, setDescription] = useState(initialValues?.description || '')
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!name.trim()) {
      setError('Setlist name is required')
      return
    }

    onSubmit({
      name: name.trim(),
      description: description.trim() || undefined,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="setlist-form">
      {error && <div className="form-error">{error}</div>}

      <div className="form-group">
        <label htmlFor="name">Setlist Name *</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g., Acoustic Set, Rock Covers"
          disabled={isLoading}
          maxLength={255}
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Optional notes about this setlist"
          disabled={isLoading}
          maxLength={1000}
          rows={3}
        />
      </div>

      <div className="form-actions">
        <button
          type="button"
          onClick={onCancel}
          disabled={isLoading}
          className="btn-secondary"
        >
          Cancel
        </button>
        <button type="submit" disabled={isLoading} className="btn-primary">
          {isLoading ? 'Saving...' : 'Save Setlist'}
        </button>
      </div>
    </form>
  )
}
