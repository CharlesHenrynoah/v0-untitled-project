import { Skeleton } from "@/components/ui/skeleton"

export default function ReservationsLoading() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-10 w-32" />
      </div>

      <Skeleton className="h-10 w-48 mb-4" />

      {Array(3)
        .fill(null)
        .map((_, i) => (
          <Skeleton key={i} className="h-48 w-full rounded-lg mb-4" />
        ))}
    </div>
  )
}
