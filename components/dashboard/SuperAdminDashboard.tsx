import { MetricCard } from "./MetricCard";
import { Card } from "@/components/ui/card";
import { ApplicationCard } from "./ApplicationCard";
import type { DashboardSummary } from "@/lib/dashboard/types";

export function SuperAdminDashboard({ summary }: { summary: DashboardSummary }) {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-semibold tracking-tight mb-2">Operations Overview</h1>
                <p className="text-muted-foreground">Real-time view of the application pipeline</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                {summary.metrics.map((metric) => (
                    <MetricCard key={metric.title} {...metric} />
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-7 gap-6">
                <Card className="lg:col-span-4 p-6">
                    <h3 className="font-semibold mb-6">Recent Activity</h3>
                    <div className="space-y-6">
                        {summary.recentActivity.map((event) => (
                            <div key={event.id} className="flex gap-4">
                                <div className="w-2 h-2 mt-2 rounded-full bg-primary" />
                                <div className="flex-1">
                                    <p className="text-sm">{event.title}</p>
                                    <p className="text-xs text-muted-foreground">{event.time} • {event.actor}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>

                <Card className="lg:col-span-3 p-6">
                    <h3 className="font-semibold mb-4">Priority Queue</h3>
                    <div className="space-y-4">
                        {summary.priorityQueue.slice(0, 2).map((application) => (
                            <ApplicationCard
                                key={application.id}
                                {...application}
                                actionLabel="Review"
                            />
                        ))}
                    </div>
                </Card>
            </div>
        </div>
    );
}
