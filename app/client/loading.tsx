import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-10 w-32" />
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {Array(3)
          .fill(null)
          .map((_, i) => (
            <Skeleton key={i} className="h-32 w-full rounded-lg" />
          ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {Array(2)
          .fill(null)
          .map((_, i) => (
            <Skeleton key={i} className="h-64 w-full rounded-lg" />
          ))}
      </div>
    </div>
  )
}
