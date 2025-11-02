export function PageSkeleton() {
  return (
    <div className="p-6 space-y-6">
      <div className="space-y-2">
        <div className="h-8 bg-muted rounded w-1/4 animate-pulse" />
        <div className="h-4 bg-muted rounded w-1/3 animate-pulse" />
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="rounded-lg border bg-card p-6 space-y-2">
            <div className="h-4 bg-muted rounded w-1/2 animate-pulse" />
            <div className="h-8 bg-muted rounded w-1/3 animate-pulse" />
          </div>
        ))}
      </div>
      <div className="rounded-lg border bg-card p-6 space-y-4">
        <div className="h-6 bg-muted rounded w-1/4 animate-pulse" />
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-16 bg-muted rounded animate-pulse" />
          ))}
        </div>
      </div>
    </div>
  )
}

