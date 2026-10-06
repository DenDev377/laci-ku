import SidebarDashboard from "@/components/dashboard/SidebarDashboard";
import NavbarDashboard from "@/components/dashboard/NavbarDashboard";
import { Suspense } from "react";

export default function DashboardLayout({
    children,
}: { children: React.ReactNode; }) {
    return (
        <div className="flex min-h-screen bg-[#F8FAFC]">
            <SidebarDashboard />
            <div className="flex flex-col flex-1 min-w-0">
                <Suspense fallback={<div className="h-16 bg-white border-b border-slate-100" />}>
                    <NavbarDashboard />
                </Suspense>
                <main className="flex-1 p-4 md:p-8 overflow-y-auto">{children}</main>
            </div>
        </div>
    )
}