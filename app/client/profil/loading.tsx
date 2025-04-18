import { Skeleton } from "@/components/ui/skeleton"

export default function ProfileLoading() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-10 w-32" />
      </div>

      <Skeleton className="h-10 w-64 mb-4" />

      <Skeleton className="h-96 w-full rounded-lg" />
    </div>
  )
}
