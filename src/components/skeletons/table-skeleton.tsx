import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[50px]">
            <div className="h-4 bg-muted rounded w-full animate-pulse" />
          </TableHead>
          <TableHead>
            <div className="h-4 bg-muted rounded w-24 animate-pulse" />
          </TableHead>
          <TableHead>
            <div className="h-4 bg-muted rounded w-32 animate-pulse" />
          </TableHead>
          <TableHead>
            <div className="h-4 bg-muted rounded w-40 animate-pulse" />
          </TableHead>
          <TableHead>
            <div className="h-4 bg-muted rounded w-28 animate-pulse" />
          </TableHead>
          <TableHead>
            <div className="h-4 bg-muted rounded w-20 animate-pulse" />
          </TableHead>
          <TableHead className="w-[100px]">
            <div className="h-4 bg-muted rounded w-full animate-pulse" />
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array.from({ length: rows }).map((_, i) => (
          <TableRow key={i}>
            <TableCell>
              <div className="h-4 bg-muted rounded w-8 animate-pulse" />
            </TableCell>
            <TableCell>
              <div className="h-4 bg-muted rounded w-24 animate-pulse" />
            </TableCell>
            <TableCell>
              <div className="h-4 bg-muted rounded w-32 animate-pulse" />
            </TableCell>
            <TableCell>
              <div className="h-4 bg-muted rounded w-40 animate-pulse" />
            </TableCell>
            <TableCell>
              <div className="h-4 bg-muted rounded w-28 animate-pulse" />
            </TableCell>
            <TableCell>
              <div className="h-4 bg-muted rounded w-20 animate-pulse" />
            </TableCell>
            <TableCell>
              <div className="h-8 bg-muted rounded w-16 animate-pulse" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
