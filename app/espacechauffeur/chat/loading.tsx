import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"

export default function Loading() {
  return (
    <div className="h-[calc(100vh-2rem)] flex flex-col">
      <Skeleton className="h-10 w-48 mb-6" />

      <div className="flex-1 grid grid-cols-12 gap-4 overflow-hidden">
        <div className="col-span-12 md:col-span-3 overflow-hidden">
          <Card className="h-full">
            <CardContent className="p-4">
              <Skeleton className="h-8 w-full mb-4" />
              <div className="space-y-4">
                {Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <div key={i} className="flex items-center space-x-2">
                      <Skeleton className="h-10 w-10 rounded-full" />
                      <div className="space-y-1">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-3 w-32" />
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="col-span-12 md:col-span-6 overflow-hidden">
          <Card className="h-full flex flex-col">
            <CardContent className="p-4 flex-1 flex flex-col">
              <Skeleton className="h-8 w-full mb-4" />
              <div className="flex-1 space-y-4 mb-4">
                {Array(6)
                  .fill(0)
                  .map((_, i) => (
                    <div key={i} className={`flex ${i % 2 === 0 ? "justify-end" : "justify-start"}`}>
                      <div className={`w-3/4 space-y-1`}>
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-16 w-full rounded-md" />
                        <Skeleton className="h-3 w-16" />
                      </div>
                    </div>
                  ))}
              </div>
              <Skeleton className="h-12 w-full" />
            </CardContent>
          </Card>
        </div>

        <div className="col-span-12 md:col-span-3 overflow-hidden">
          <Card className="h-full">
            <CardContent className="p-4">
              <Skeleton className="h-8 w-full mb-4" />
              <div className="space-y-4">
                {Array(4)
                  .fill(0)
                  .map((_, i) => (
                    <div key={i} className="space-y-1">
                      <Skeleton className="h-4 w-24" />
                      <div className="flex items-center space-x-2">
                        <Skeleton className="h-8 w-8 rounded-full" />
                        <Skeleton className="h-4 w-32" />
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
