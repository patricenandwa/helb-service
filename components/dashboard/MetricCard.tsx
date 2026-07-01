import { Card } from "@/components/ui/card";
import { ArrowUp, ArrowDown } from "lucide-react";

interface MetricCardProps {
    title: string;
    value: string;
    change?: string;
    changeType?: "positive" | "negative" | "neutral";
}

export function MetricCard({ title, value, change, changeType = "positive" }: MetricCardProps) {
    return (
        <Card className="p-6 transition-all hover:shadow-md">
            <p className="text-sm text-muted-foreground font-medium">{title}</p>

            <div className="mt-4 flex items-baseline gap-2">
                <span className="text-4xl font-semibold tracking-tighter text-foreground">
                    {value}
                </span>
            </div>

            {change && (
                <div className={`flex items-center gap-1 mt-3 text-sm font-medium ${changeType === "positive" ? "text-success" : changeType === "negative" ? "text-error" : "text-muted-foreground"
                    }`}>
                    {changeType === "positive" && <ArrowUp className="w-4 h-4" />}
                    {changeType === "negative" && <ArrowDown className="w-4 h-4" />}
                    {changeType === "neutral" ? change : `${change} from yesterday`}
                </div>
            )}
        </Card>
    );
}
