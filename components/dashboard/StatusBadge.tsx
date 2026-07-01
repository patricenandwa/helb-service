import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const statusConfig: Record<string, { label: string; className: string }> = {
    DRAFT: { label: "Draft", className: "bg-muted text-muted-foreground" },
    SUBMITTED: { label: "Submitted", className: "bg-primary/10 text-primary" },
    UNASSIGNED: { label: "Unassigned", className: "bg-muted text-muted-foreground" },
    ASSIGNED: { label: "Assigned", className: "bg-primary/10 text-primary" },
    CONTACTING: { label: "Contacting", className: "bg-warning-light text-warning" },
    WAITING_DOCUMENTS: { label: "Waiting Documents", className: "bg-warning-light text-warning" },
    WAITING_PARENT: { label: "Waiting Parent", className: "bg-warning-light text-warning" },
    READY: { label: "Ready", className: "bg-success-light text-success" },
    PROCESSING: { label: "Processing", className: "bg-primary/10 text-primary" },
    COMPLETED: { label: "Completed", className: "bg-success-light text-success" },
    ON_HOLD: { label: "On Hold", className: "bg-muted text-muted-foreground" },
    REJECTED: { label: "Rejected", className: "bg-error-light text-error" },
};

interface StatusBadgeProps {
    status: string;
    className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
    const config = statusConfig[status.toUpperCase().replace(/\s+/g, "_")] || {
        label: status,
        className: "bg-muted text-muted-foreground",
    };

    return (
        <Badge
            className={cn(
                "border-transparent px-3 py-1 font-medium text-xs",
                config.className,
                className
            )}
        >
            {config.label}
        </Badge>
    );
}
