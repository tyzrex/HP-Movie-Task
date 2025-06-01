export function MovieDetailSkeleton() {
  return (
    <div className="min-h-screen">
      {/* Hero Section Skeleton */}
      <div className="h-[60vh] bg-zinc-800 relative overflow-hidden">
        <div className="absolute inset-0 shimmer" />
        <div className="relative z-10 h-full flex items-center">
          <div className="mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="h-10 w-20 bg-zinc-700 rounded shimmer mb-6" />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
              <div className="md:col-span-1">
                <div className="aspect-[2/3] max-w-xs mx-auto md:mx-0 bg-zinc-700 rounded-lg shimmer" />
              </div>

              <div className="md:col-span-2 space-y-4">
                <div className="h-10 bg-zinc-700 rounded shimmer" />
                <div className="flex space-x-4">
                  <div className="h-6 w-16 bg-zinc-700 rounded shimmer" />
                  <div className="h-6 w-20 bg-zinc-700 rounded shimmer" />
                </div>
                <div className="flex space-x-2">
                  <div className="h-6 w-16 bg-zinc-700 rounded shimmer" />
                  <div className="h-6 w-16 bg-zinc-700 rounded shimmer" />
                </div>
                <div className="h-4 bg-zinc-700 rounded shimmer w-full" />
                <div className="h-4 bg-zinc-700 rounded shimmer w-3/4" />
                <div className="flex space-x-4">
                  <div className="h-10 w-24 bg-zinc-700 rounded shimmer" />
                  <div className="h-10 w-10 bg-zinc-700 rounded shimmer" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="h-8 w-48 bg-zinc-700 rounded shimmer" />
            <div className="space-y-3">
              <div className="h-4 bg-zinc-700 rounded shimmer" />
              <div className="h-4 bg-zinc-700 rounded shimmer w-3/4" />
              <div className="h-4 bg-zinc-700 rounded shimmer w-1/2" />
            </div>
          </div>
          <div className="lg:col-span-1">
            <div className="bg-zinc-800 rounded-lg p-6">
              <div className="h-6 w-32 bg-zinc-700 rounded shimmer mb-4" />
              <div className="space-y-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="flex justify-between py-2">
                    <div className="h-4 w-20 bg-zinc-700 rounded shimmer" />
                    <div className="h-4 w-16 bg-zinc-700 rounded shimmer" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
