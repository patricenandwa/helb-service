import { ApplicationCard } from "@/components/dashboard/ApplicationCard";
import { EmptyState } from "@/components/dashboard/EmptyState";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { Card } from "@/components/ui/card";
import { getApplications } from "@/lib/dashboard/data";

export default async function ApplicationsPage() {
    const applications = await getApplications();
    const statusCounts = applications.reduce<Record<string, number>>((counts, application) => {
        counts[application.status] = (counts[application.status] ?? 0) + 1;
        return counts;
    }, {});

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-semibold tracking-tight">Applications</h1>
                <p className="text-muted-foreground">Review submitted applications and continue processing assigned work.</p>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                {Object.entries(statusCounts).map(([status, count]) => (
                    <Card key={status} className="p-5">
                        <StatusBadge status={status} />
                        <p className="mt-4 text-3xl font-semibold">{count}</p>
                    </Card>
                ))}
            </div>

            {applications.length === 0 ? (
                <EmptyState
                    title="No applications yet"
                    description="Submitted student applications will appear here when the backend returns them."
                />
            ) : (
                <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
                    {applications.map((application) => (
                        <ApplicationCard key={application.id} {...application} />
                    ))}
                </div>
            )}
        </div>
    );
}
