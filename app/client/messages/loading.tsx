import { Skeleton } from "@/components/ui/skeleton"

export default function MessagesLoading() {
  return (
    <div className="h-[calc(100vh-8rem)]">
      <div className="flex items-center justify-between mb-6">
        <Skeleton className="h-8 w-48" />
      </div>

      <div className="grid h-full grid-cols-1 md:grid-cols-3 gap-4">
        <Skeleton className="h-full w-full rounded-lg" />
        <Skeleton className="h-full w-full rounded-lg md:col-span-2" />
      </div>
    </div>
  )
}
