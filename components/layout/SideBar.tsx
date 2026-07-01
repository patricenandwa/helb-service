"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    FileText,
    UserCheck,
    Users,
    BarChart3,
    Settings,
    Columns3,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/dashboard/applications", label: "Applications", icon: FileText },
    { href: "/dashboard/kanban", label: "Pipeline", icon: Columns3 },
    { href: "/dashboard/assignments", label: "Assignments", icon: UserCheck },
    { href: "/dashboard/agents", label: "Agents", icon: Users },
    { href: "/dashboard/analytics", label: "Analytics", icon: BarChart3 },
    { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

export function Sidebar() {
    const pathname = usePathname();

    return (
        <div className="hidden md:flex w-72 flex-col border-r bg-sidebar text-sidebar-foreground">
            {/* Logo */}
            <div className="px-8 py-8 border-b border-sidebar-border">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-primary rounded-2xl flex items-center justify-center">
                        <span className="text-primary-foreground font-bold text-xl">H</span>
                    </div>
                    <div>
                        <div className="font-semibold text-2xl tracking-tight">HELB • HEF</div>
                        <div className="text-xs text-sidebar-foreground/70 -mt-1">Operations</div>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 py-6">
                <div className="space-y-1">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all",
                                    isActive
                                        ? "bg-primary/10 text-primary shadow-sm"
                                        : "hover:bg-sidebar/80 text-sidebar-foreground/80 hover:text-sidebar-foreground"
                                )}
                            >
                                <item.icon className="w-5 h-5" />
                                {item.label}
                            </Link>
                        );
                    })}
                </div>
            </nav>

            <div className="p-4 border-t border-sidebar-border text-xs text-sidebar-foreground/60">
                Built for speed • Internal Use
            </div>
        </div>
    );
}
