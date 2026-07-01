import { AnalyticsCharts } from "@/components/dashboard/AnalyticsCharts";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { getAnalyticsData } from "@/lib/dashboard/data";

export default async function AnalyticsPage() {
    const data = await getAnalyticsData();

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-semibold tracking-tight">Analytics &amp; Insights</h1>
                <p className="text-muted-foreground">Performance overview • Last 30 days</p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                {data.kpis.map((kpi) => (
                    <MetricCard key={kpi.title} {...kpi} />
                ))}
            </div>

            <AnalyticsCharts data={data} />
        </div>
    );
}
