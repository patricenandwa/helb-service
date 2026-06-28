export default function ApplyLoading() {
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-2xl px-4 py-8 sm:py-16">
        {/* Progress bar skeleton */}
        <div className="mb-8">
          <div className="mb-6 flex items-center justify-between">
            <div className="h-7 w-60 animate-pulse rounded-lg bg-gray-200" />
            <div className="hidden gap-4 sm:flex">
              <div className="h-4 w-16 animate-pulse rounded bg-gray-200" />
              <div className="h-4 w-20 animate-pulse rounded bg-gray-200" />
              <div className="h-4 w-20 animate-pulse rounded bg-gray-200" />
            </div>
          </div>
          <div className="h-2 w-full animate-pulse rounded-full bg-gray-200" />
          <div className="mt-3 flex justify-between">
            <div className="h-4 w-20 animate-pulse rounded bg-gray-200" />
            <div className="h-4 w-10 animate-pulse rounded bg-gray-200" />
          </div>
        </div>

        {/* Form card skeleton */}
        <div className="rounded-2xl border border-border bg-white p-6 shadow-xl shadow-gray-200/50 sm:p-10">
          <div className="space-y-6">
            <div>
              <div className="h-7 w-56 animate-pulse rounded-lg bg-gray-200" />
              <div className="mt-2 h-4 w-72 animate-pulse rounded bg-gray-100" />
            </div>
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="space-y-2">
                <div className="h-4 w-28 animate-pulse rounded bg-gray-200" />
                <div className="h-12 w-full animate-pulse rounded-xl bg-gray-100" />
              </div>
            ))}
          </div>
        </div>

        {/* Navigation skeleton */}
        <div className="mt-10 flex justify-end">
          <div className="h-12 w-32 animate-pulse rounded-xl bg-gray-200" />
        </div>
      </div>
    </main>
  );
}
