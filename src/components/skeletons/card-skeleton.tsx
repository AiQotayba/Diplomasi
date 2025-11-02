export function CardSkeleton() {
  return (
    <div className="rounded-lg border bg-card p-6">
      <div className="space-y-4">
        <div className="h-6 bg-muted rounded w-1/3 animate-pulse" />
        <div className="h-4 bg-muted rounded w-2/3 animate-pulse" />
        <div className="h-4 bg-muted rounded w-1/2 animate-pulse" />
      </div>
    </div>
  )
}

