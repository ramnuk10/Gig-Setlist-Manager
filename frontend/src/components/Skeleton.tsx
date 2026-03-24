export default function SetlistSkeleton() {
  return (
    <div className="setlist-card skeleton">
      <div className="skeleton-line skeleton-title" />
      <div className="skeleton-line skeleton-description" />
      <div className="skeleton-line skeleton-date" />
    </div>
  )
}

export function SetlistListSkeleton() {
  return (
    <div className="setlist-list">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <SetlistSkeleton key={i} />
      ))}
    </div>
  )
}
