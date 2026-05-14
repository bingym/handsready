export const PageSkeleton = () => (
  <div className="max-w-7xl mx-auto animate-pulse">
    {/* Title */}
    <div className="mb-8">
      <div className="h-9 w-48 bg-gray-200 rounded-md mb-3" />
      <div className="h-4 w-80 bg-gray-100 rounded" />
    </div>
    {/* Content blocks */}
    <div className="space-y-6">
      <div className="h-5 w-36 bg-gray-200 rounded" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="h-20 rounded-lg bg-gray-100" />
        ))}
      </div>
      <div className="h-5 w-28 bg-gray-200 rounded" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-20 rounded-lg bg-gray-100" />
        ))}
      </div>
    </div>
  </div>
);
