import { KanbanBoard } from "@/components/dashboard/KanbanBoard";
import { getApplications } from "@/lib/dashboard/data";

export default async function KanbanPage() {
    const applications = await getApplications();

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-semibold tracking-tight">Kanban Board</h1>
                    <p className="text-muted-foreground">Visual workflow for all applications</p>
                </div>
                <div className="text-sm text-muted-foreground">
                    Updated from application workflow status
                </div>
            </div>

            <KanbanBoard applications={applications} />
        </div>
    );
}
