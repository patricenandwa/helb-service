"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

const routeTitles: Record<string, string> = {
    "/dashboard": "Dashboard",
    "/dashboard/applications": "Applications",
    "/dashboard/assignments": "Assignments",
    "/dashboard/agents": "Agents",
    "/dashboard/analytics": "Analytics",
    "/dashboard/settings": "Settings",
};

function getTitle(pathname: string) {
    if (pathname.startsWith("/dashboard/applications/")) {
        return "Application Details";
    }

    return routeTitles[pathname] ?? "Dashboard";
}

export function Navbar() {
    const pathname = usePathname();

    return (
        <header className="flex h-16 items-center justify-between border-b bg-card px-6">
            <div>
                <div className="font-semibold text-lg">{getTitle(pathname)}</div>
                <p className="text-xs text-muted-foreground">Admin operations</p>
            </div>

            <div className="flex items-center gap-3">
                <Button variant="outline" asChild>
                    <Link href="/dashboard/applications">Applications</Link>
                </Button>
                <Button asChild>
                    <Link href="/dashboard/settings">Settings</Link>
                </Button>
            </div>
        </header>
    );
}
