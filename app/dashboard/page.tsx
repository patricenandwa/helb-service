import { SuperAdminDashboard } from "@/components/dashboard/SuperAdminDashboard";
import { AgentDashboard } from "@/components/dashboard/AgentDashboard";
import { getCurrentDashboardUser, getDashboardSummary } from "@/lib/dashboard/data";

export default async function DashboardPage() {
    const user = await getCurrentDashboardUser();
    const summary = await getDashboardSummary(user.role);

    return summary.role === "SUPER_ADMIN" ? (
        <SuperAdminDashboard summary={summary} />
    ) : (
        <AgentDashboard summary={summary} />
    );
}
