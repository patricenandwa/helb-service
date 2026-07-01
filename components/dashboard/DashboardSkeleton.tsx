import { Skeleton } from "@/components/ui/skeleton";

export function DashboardSkeleton() {
    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                {[...Array(5)].map((_, i) => (
                    <div key={i} className="card p-6">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-10 w-24 mt-6" />
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-7 gap-6">
                <div className="lg:col-span-4 card p-6">
                    <Skeleton className="h-6 w-48 mb-6" />
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="flex gap-4 mb-6">
                            <Skeleton className="h-4 w-4 rounded-full mt-1" />
                            <div className="flex-1 space-y-2">
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-3 w-3/4" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}