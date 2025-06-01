interface MovieGridSkeletonProps {
  title?: string;
  count?: number;
}

export function MovieGridSkeleton({
  title = "Loading...",
  count = 6,
}: MovieGridSkeletonProps) {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex items-center space-x-2 mb-6">
        <h2 className="text-xl font-semibold text-white">{title}</h2>
        <div className="w-2 h-2 bg-red-600 rounded-full"></div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="space-y-2">
            <div className="aspect-[2/3] bg-gray-700 rounded-lg shimmer" />
            <div className="h-4 bg-gray-700 rounded shimmer" />
            <div className="h-3 bg-gray-700 rounded shimmer w-2/3" />
          </div>
        ))}
      </div>
    </div>
  );
}
