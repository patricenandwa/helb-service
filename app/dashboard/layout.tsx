import type { ReactNode } from "react";
import { Sidebar } from "@/components/layout/SideBar";
import { Navbar } from "@/components/layout/NavBar";

export default function DashboardLayout({ children }: { children: ReactNode }) {
    return (
        <div className="flex h-screen overflow-hidden bg-background">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content Area */}
            <div className="flex flex-1 flex-col overflow-hidden">
                <Navbar />
                <main className="flex-1 overflow-auto p-6 md:p-8 bg-background">
                    {children}
                </main>
            </div>
        </div>
    );
}