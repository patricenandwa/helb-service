import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { StatusBadge } from "./StatusBadge";
import type { DashboardAgent, DashboardApplication } from "@/lib/dashboard/types";
import { cn } from "@/lib/utils";
import { assignApplication } from "@/app/dashboard/actions";

interface AssignmentWorkspaceProps {
    applications: DashboardApplication[];
    agents: DashboardAgent[];
}

export function AssignmentWorkspace({ applications, agents }: AssignmentWorkspaceProps) {
    return (
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            <div className="lg:col-span-7">
                <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-xl font-semibold">
                        Unassigned Applications ({applications.length})
                    </h2>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {applications.map((application) => (
                        <Card key={application.id} className="p-6">
                            <div className="flex justify-between gap-4">
                                <div>
                                    <h3 className="font-semibold">{application.studentName}</h3>
                                    <p className="text-sm text-muted-foreground">
                                        {application.institution}
                                    </p>
                                </div>
                                <StatusBadge status={application.status} />
                            </div>

                            <div
                                className={cn(
                                    "mt-4 inline-block rounded-full px-3 py-1 text-xs font-medium",
                                    application.priority === "HIGH"
                                        ? "bg-error-light text-error"
                                        : application.priority === "MEDIUM"
                                            ? "bg-warning-light text-warning"
                                            : "bg-muted text-muted-foreground",
                                )}
                            >
                                {application.priority} PRIORITY
                            </div>

                            <form action={assignApplication} className="mt-5 flex gap-3">
                                <input type="hidden" name="applicationId" value={application.id} />
                                <select
                                    name="agentId"
                                    className="h-9 min-w-0 flex-1 rounded-4xl border border-border bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                    defaultValue=""
                                >
                                    <option value="" disabled>
                                        Select agent
                                    </option>
                                    {agents.map((agent) => (
                                        <option key={agent.id} value={agent.id}>
                                            {agent.name}
                                        </option>
                                    ))}
                                </select>
                                <Button type="submit">Assign</Button>
                            </form>
                        </Card>
                    ))}
                </div>
            </div>

            <div className="lg:col-span-5">
                <h2 className="mb-6 text-xl font-semibold">Agents &amp; Capacity</h2>

                <div className="space-y-4">
                    {agents.map((agent) => {
                        const loadColor =
                            agent.capacityPercent > 80
                                ? "text-error"
                                : agent.capacityPercent > 60
                                    ? "text-warning"
                                    : "text-success";

                        return (
                            <Card key={agent.id} className="p-6">
                                <div className="flex items-center gap-4">
                                    <Avatar className="h-12 w-12">
                                        <AvatarFallback>
                                            {agent.name.split(" ").map((name) => name[0]).join("")}
                                        </AvatarFallback>
                                    </Avatar>

                                    <div className="flex-1">
                                        <div className="flex justify-between gap-4">
                                            <p className="font-semibold">{agent.name}</p>
                                            <span className={cn("text-sm font-medium", loadColor)}>
                                                {agent.capacityPercent}%
                                            </span>
                                        </div>

                                        <div className="mt-2">
                                            <Progress value={agent.capacityPercent} className="h-1.5" />
                                        </div>

                                        <div className="mt-3 flex justify-between text-sm text-muted-foreground">
                                            <span>{agent.assignedCount} assigned</span>
                                            <span>Avg: {agent.avgProcessingTime}</span>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
