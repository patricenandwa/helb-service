import { AssignmentWorkspace } from "@/components/dashboard/AssignmentWorkspace";
import { getAgents, getApplications } from "@/lib/dashboard/data";
import { Button } from "@/components/ui/button";

export default async function AssignmentsPage() {
    const [applications, agents] = await Promise.all([
        getApplications(),
        getAgents(),
    ]);
    const unassignedApplications = applications.filter(
        (application) => application.status === "UNASSIGNED",
    );

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-semibold tracking-tight">Smart Assignment</h1>
                    <p className="text-muted-foreground">Match applications to available agents</p>
                </div>
                <Button type="button">
                    Run Smart Assignment
                </Button>
            </div>

            <AssignmentWorkspace applications={unassignedApplications} agents={agents} />
        </div>
    );
}
