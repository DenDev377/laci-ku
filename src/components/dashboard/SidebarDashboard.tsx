"use client"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { LayoutDashboard, LayoutList, Archive, ShieldCheck, Settings, LogOut } from "lucide-react"
import { signOut } from "next-auth/react"

export default function SidebarDashboard() {
    const pathname = usePathname()
    const menuItems = [
        {
            name: "Dashboard",
            href: "/dashboard",
            icon: <LayoutDashboard className="w-5 h-5" />
        },
        {
            name: "Barang Berharga",
            href: "/dashboard/items",
            icon: <LayoutList className="w-5 h-5" />
        },
        {
            name: "Pengaturan",
            href: "/dashboard/settings",
            icon: <Settings className="w-4 h-4" />
        }

    ]

    return (
        <aside className="w-72 bg-white border-slate-200 border-r hidden md:flex flex-col min-h-screen shrink-0 relative">
            {/* Logo Area */}
            <div className="flex items-center h-20 px-6 border-b border-slate-100">
                <div className="flex items-center gap-3">
                    {/* Minimalist Logo Icon Construction */}
                    <div className="relative flex items-center justify-center w-11 h-11 bg-gradient-to-tr from-gray-900 to-gray-700 rounded-2xl shadow-lg shadow-gray-200 text-white">
                        <Archive className="w-5 h-5" strokeWidth={2.5} />
                        <div className="absolute -bottom-1 -right-1 bg-white p-0.5 rounded-full">
                            <ShieldCheck className="w-4 h-4 text-emerald-500" strokeWidth={3} />
                        </div>
                    </div>
                    {/* Typography */}
                    <div className="flex flex-col justify-center">
                        <span className="text-xl font-extrabold tracking-tight text-gray-900 leading-none">
                            LaciKu
                        </span>
                        <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-0.5">
                            Brankas Digital
                        </span>
                    </div>
                </div>
            </div>

            {/* Navigation Menu */}
            <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
                <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4 px-2">
                    Menu Utama
                </div>
                {menuItems.map((item) => {
                    const isActive = item.href === "/dashboard"
                        ? pathname === "/dashboard"
                        : pathname === item.href || pathname.startsWith(item.href + '/');

                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 ${isActive
                                ? "bg-gray-900 text-white font-medium shadow-md shadow-gray-200"
                                : "text-gray-500 hover:bg-slate-50 hover:text-gray-900"
                                }`}
                        >
                            {item.icon}
                            <span className="text-sm">{item.name}</span>
                        </Link>
                    )
                })}
            </nav>

            <div className="p-4 border-t border-slate-200 shrink-0">
                <button onClick={() => signOut({ callbackUrl: "/auth/login" })} className="flex items-center gap-3 px-3 py-2.5 w-full rounded-lg text-sm font-medium text-slate-600 hover:bg-red-50 hover:text-red-600 transition-colors group">
                    <LogOut className="w-4 h-4 text-slate-400 group-hover:text-red-500 transition-colors" />
                    Keluar Aplikasi
                </button>
            </div>
        </aside>
    )
}