import { useState } from 'react'

interface ExportButtonProps {
  setlistId?: number
  setlistName?: string
  includeAllSetlists?: boolean
}

export default function ExportButton({
  setlistId,
  setlistName,
  includeAllSetlists = false,
}: ExportButtonProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleExport = async () => {
    try {
      setLoading(true)
      setError(null)

      const endpoint = includeAllSetlists
        ? '/api/export/csv'
        : `/api/export/${setlistId}/csv`

      const response = await fetch(endpoint)

      if (!response.ok) {
        throw new Error('Failed to export')
      }

      // Get filename from header or use default
      const contentDisposition = response.headers.get('content-disposition')
      let filename = includeAllSetlists
        ? `setlists-export-${new Date().toISOString().split('T')[0]}.csv`
        : `${setlistName || 'setlist'}.csv`

      if (contentDisposition) {
        const matches = contentDisposition.match(/filename="?(.+?)"?$/i)
        if (matches) {
          filename = matches[1]
        }
      }

      // Download the file
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = filename
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Export failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="export-button-group">
      {error && <div className="export-error">{error}</div>}
      <button
        onClick={handleExport}
        disabled={loading}
        className="btn-small"
        title={includeAllSetlists ? 'Export all setlists to CSV' : 'Export this setlist to CSV'}
      >
        {loading ? '📥 Exporting...' : '📥 Export CSV'}
      </button>
    </div>
  )
}
