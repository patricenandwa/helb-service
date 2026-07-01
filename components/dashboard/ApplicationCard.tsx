import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "./StatusBadge";
import { Clock, User } from "lucide-react";
import type { DashboardApplication } from "@/lib/dashboard/types";

interface ApplicationCardProps extends DashboardApplication {
    actionLabel?: string;
}

export function ApplicationCard({
    id,
    studentName,
    institution,
    status,
    priority,
    submittedAt,
    assignedTo,
    documentStatus,
    actionLabel = "Open Application",
}: ApplicationCardProps) {
    const priorityColor =
        priority === "HIGH"
            ? "text-error"
            : priority === "MEDIUM"
                ? "text-warning"
                : "text-muted-foreground";

    return (
        <Card className="p-6 hover:border-primary/50 transition-all group hover:shadow-sm">
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="font-semibold text-lg">{studentName}</h3>
                    <p className="text-muted-foreground text-sm">{institution}</p>
                </div>
                <StatusBadge status={status} />
            </div>

            <div className="mt-6 flex items-center gap-4 text-sm">
                <div className={`flex items-center gap-1.5 ${priorityColor}`}>
                    <span className="font-mono">↑</span>
                    {priority} PRIORITY
                </div>

                <div className="flex items-center gap-1.5 text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    {submittedAt}
                </div>
            </div>

            {assignedTo && (
                <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                    <User className="w-4 h-4" />
                    Assigned to {assignedTo}
                </div>
            )}

            <div className="mt-4 text-xs text-muted-foreground">
                Documents: {documentStatus.replace("_", " ").toLowerCase()}
            </div>

            <Button className="mt-6 w-full group-hover:bg-primary" asChild>
                <Link href={`/dashboard/applications/${id}`}>
                    {actionLabel}
                </Link>
            </Button>
        </Card>
    );
}
