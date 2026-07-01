import { Card } from "@/components/ui/card";
import { CircleDot } from "lucide-react";
import type { ActivityEvent } from "@/lib/dashboard/types";

export function Timeline({ events }: { events: ActivityEvent[] }) {
    return (
        <Card className="p-6">
            <h3 className="font-semibold mb-6">Activity Timeline</h3>
            <div className="space-y-6 relative pl-6 border-l">
                {events.map((event) => (
                    <div key={event.id} className="relative">
                        <div className="absolute -left-[27px] w-8 h-8 rounded-full bg-card border flex items-center justify-center">
                            <CircleDot className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                            <p className="text-sm">{event.title}</p>
                            <p className="text-xs text-muted-foreground mt-0.5">{event.actor} • {event.time}</p>
                        </div>
                    </div>
                ))}
            </div>
        </Card>
    );
}
