export function HeroSkeleton() {
  return (
    <div className="h-[50vh] sm:h-[60vh] md:h-[70vh] bg-gray-800 relative overflow-hidden">
      <div className="absolute inset-0 shimmer" />
      <div className="relative z-10 h-full flex items-center px-4 sm:px-8">
        <div className="max-w-2xl space-y-4">
          <div className="h-8 sm:h-10 md:h-12 bg-gray-700 rounded shimmer w-64 sm:w-80" />
          <div className="flex space-x-4">
            <div className="h-6 w-16 bg-gray-700 rounded shimmer" />
            <div className="h-6 w-20 bg-gray-700 rounded shimmer" />
          </div>
          <div className="h-4 bg-gray-700 rounded shimmer w-full" />
          <div className="h-4 bg-gray-700 rounded shimmer w-3/4" />
          <div className="flex space-x-4 pt-2">
            <div className="h-10 w-24 bg-gray-700 rounded shimmer" />
            <div className="h-10 w-10 bg-gray-700 rounded-full shimmer" />
          </div>
        </div>
      </div>
    </div>
  );
}
