import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ApplicationCard } from "./ApplicationCard";
import type { DashboardSummary } from "@/lib/dashboard/types";
import Link from "next/link";

export function AgentDashboard({ summary }: { summary: DashboardSummary }) {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-semibold tracking-tight mb-2">Good morning, {summary.user.name.split(" ")[0]}</h1>
                <p className="text-muted-foreground">Here is what needs your attention today</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {summary.metrics.slice(0, 4).map((metric) => (
                    <Card key={metric.title} className="p-6">
                        <p className="text-sm text-muted-foreground">{metric.title}</p>
                        <p className="text-4xl font-semibold mt-2">{metric.value}</p>
                    </Card>
                ))}
            </div>

            <div>
                <div className="flex justify-between items-center mb-6">
                    <h3 className="font-semibold text-lg">My Queue</h3>
                    <Button variant="outline" asChild>
                        <Link href="/dashboard/applications">View All</Link>
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {summary.myQueue.map((application) => (
                        <ApplicationCard
                            key={application.id}
                            {...application}
                            actionLabel="Continue Processing"
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
