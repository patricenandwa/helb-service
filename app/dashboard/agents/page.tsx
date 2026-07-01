import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { getAgents } from "@/lib/dashboard/data";
import { cn } from "@/lib/utils";

export default async function AgentsPage() {
    const agents = await getAgents();

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-semibold tracking-tight">Agents</h1>
                <p className="text-muted-foreground">Monitor customer care workload and availability.</p>
            </div>

            <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
                {agents.map((agent) => {
                    const loadClass =
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

                                <div className="min-w-0 flex-1">
                                    <div className="flex items-center justify-between gap-3">
                                        <div>
                                            <p className="font-semibold">{agent.name}</p>
                                            <p className="truncate text-sm text-muted-foreground">{agent.email}</p>
                                        </div>
                                        <span
                                            className={cn(
                                                "rounded-full px-2.5 py-1 text-xs font-medium capitalize",
                                                agent.status === "available"
                                                    ? "bg-success-light text-success"
                                                    : agent.status === "busy"
                                                        ? "bg-warning-light text-warning"
                                                        : "bg-muted text-muted-foreground",
                                            )}
                                        >
                                            {agent.status}
                                        </span>
                                    </div>

                                    <div className="mt-5">
                                        <div className="mb-2 flex items-center justify-between text-sm">
                                            <span className="text-muted-foreground">Capacity</span>
                                            <span className={cn("font-medium", loadClass)}>
                                                {agent.capacityPercent}%
                                            </span>
                                        </div>
                                        <Progress value={agent.capacityPercent} className="h-2" />
                                    </div>

                                    <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
                                        <div className="rounded-lg bg-muted/50 p-3">
                                            <p className="text-muted-foreground">Assigned</p>
                                            <p className="mt-1 text-lg font-semibold">{agent.assignedCount}</p>
                                        </div>
                                        <div className="rounded-lg bg-muted/50 p-3">
                                            <p className="text-muted-foreground">Avg Time</p>
                                            <p className="mt-1 text-lg font-semibold">{agent.avgProcessingTime}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
}
