import Link from "next/link";
import { Card } from "@/components/ui/card";
import { StatusBadge } from "./StatusBadge";
import type { ApplicationStatus, DashboardApplication } from "@/lib/dashboard/types";

const columns: Array<{ id: ApplicationStatus; title: string; color: string }> = [
    { id: "UNASSIGNED", title: "Unassigned", color: "bg-muted-foreground" },
    { id: "CONTACTING", title: "Contacting Applicant", color: "bg-warning" },
    { id: "WAITING_DOCUMENTS", title: "Waiting Documents", color: "bg-warning" },
    { id: "WAITING_PARENT", title: "Waiting Parent Verification", color: "bg-warning" },
    { id: "READY", title: "Ready", color: "bg-success" },
    { id: "COMPLETED", title: "Completed", color: "bg-success" },
];

export function KanbanBoard({ applications }: { applications: DashboardApplication[] }) {
    return (
        <div className="overflow-x-auto pb-8">
            <div className="flex min-w-[1400px] gap-6">
                {columns.map((column) => {
                    const columnCards = applications.filter(
                        (application) => application.status === column.id,
                    );

                    return (
                        <div key={column.id} className="min-w-[280px] flex-1">
                            <div className="mb-4 flex items-center justify-between px-1">
                                <div className="flex items-center gap-3">
                                    <div className={`h-6 w-1 rounded ${column.color}`} />
                                    <h3 className="font-semibold">{column.title}</h3>
                                </div>
                                <div className="rounded-full bg-muted px-2.5 py-0.5 text-sm text-muted-foreground">
                                    {columnCards.length}
                                </div>
                            </div>

                            <div className="min-h-[520px] space-y-3 rounded-lg border bg-muted/30 p-4">
                                {columnCards.map((application) => (
                                    <Link
                                        key={application.id}
                                        href={`/dashboard/applications/${application.id}`}
                                        className="block"
                                    >
                                        <Card className="p-5 transition-shadow hover:shadow">
                                            <div className="flex justify-between gap-3">
                                                <p className="font-medium">{application.studentName}</p>
                                                <StatusBadge status={application.status} />
                                            </div>
                                            <p className="mt-1 text-sm text-muted-foreground">
                                                {application.institution}
                                            </p>

                                            <div className="mt-4 flex justify-between text-xs text-muted-foreground">
                                                <span>{application.submittedAt}</span>
                                                <span className="font-mono uppercase tracking-widest text-[10px]">
                                                    {application.priority}
                                                </span>
                                            </div>
                                        </Card>
                                    </Link>
                                ))}

                                {columnCards.length === 0 && (
                                    <div className="flex h-32 items-center justify-center rounded-lg border border-dashed text-sm text-muted-foreground">
                                        No applications
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
