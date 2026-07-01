import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import type { ApplicationDocument } from "@/lib/dashboard/types";

export function DocumentPanel({ documents }: { documents: ApplicationDocument[] }) {
    return (
        <Card className="p-6">
            <div className="flex justify-between items-center mb-5">
                <h3 className="font-semibold">Documents</h3>
                <Button variant="outline" size="sm">Request Upload</Button>
            </div>

            <div className="space-y-3">
                {documents.map((doc) => (
                    <div key={doc.id} className="flex items-center justify-between p-3 rounded-xl hover:bg-muted/50 group">
                        <div>
                            <p className="text-sm font-medium">{doc.name}</p>
                            <p className="text-xs text-muted-foreground">{doc.date}</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="text-xs px-2 py-1 rounded-full bg-success-light text-success">
                                {doc.status}
                            </span>
                            <Button size="icon" variant="ghost" className="opacity-0 group-hover:opacity-100">
                                <Eye className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </Card>
    );
}
