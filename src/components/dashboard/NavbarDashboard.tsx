"use client"
import Link from "next/link"
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { LayoutDashboard, LayoutList, Menu, Plus, Search, Settings } from "lucide-react";
export default function NavbarDashboard() {
    const { data: session, status } = useSession();
    const userName = session?.user?.name || "Banyak";
    const userInisial = userName.charAt(0).toUpperCase()

    const router = useRouter();
    const pathname = usePathname()
    const searchParams = useSearchParams();
    const [searchTerm, setSearchTerm] = useState(searchParams.get("q") || "");
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const menuItems = [
        {
            name: "Dashboard",
            href: "/dashboard",
            icon: <LayoutDashboard className="w-5 h-5" />
        },
        {
            name: "Barang Berharga",
            href: "/items",
            icon: <LayoutList className="w-5 h-5" />
        },
        {
            name: "Pengaturan",
            href: "/settings",
            icon: <Settings className="w-4 h-4" />
        }

    ]
    return (
        <nav className="bg-white w-full border-b border-slate-100 shrink-0 relative z-40">
            <div className="w-full mx-auto px-4 sm:px-6 md:px-8 h-16 flex items-center justify-between gap-3 md:gap-4">
                {/* Mobile Hamburger Button */}
                <button
                    onClick={() => setIsMobileMenuOpen(true)}
                    className="md:hidden text-slate-500 hover:text-slate-900 transition-colors p-1"
                    aria-label="Buka Menu Navigasi"
                >
                    <Menu className="w-6 h-6" />
                </button>

                {/* Search bar - Mobile: flex-1; Desktop: max-w-md */}
                <div className="flex items-center gap-2.5 flex-1 md:max-w-md bg-slate-50 rounded-xl px-3 h-10 border border-slate-300 focus-within:border-brand-500/30 focus-within:ring-2 focus-within:ring-brand-500/10 transition-colors">
                    <Search className="w-4 h-4 text-slate-400 shrink-0" />
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Cari tugas..."
                        className="w-full bg-transparent text-sm md:text-sm text-slate-900 placeholder-slate-400 focus:outline-none"
                    />
                </div>

                <div className="flex items-center gap-2 md:gap-3 shrink-0">
                    <div className="hidden sm:flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-slate-900 text-white flex items-center justify-center text-sm font-medium shrink-0">
                            {status === "loading" ? "..." : userInisial}
                        </div>
                        <span className="text-sm font-medium text-slate-900 hidden md:block">
                            {status === "loading" ? "..." : userName}
                        </span>

                    </div>
                    <Link
                        href="/dashboard/addItem"
                        className="inline-flex items-center justify-center bg-slate-900 text-white rounded-full p-2 md:px-4 md:py-2 text-sm font-medium hover:bg-brand-500 transition-colors shrink-0"
                        aria-label="Tambah Tugas Baru"
                    >
                        <Plus className="w-5 h-5 md:w-4 md:h-4" />
                        <span className="hidden md:inline-block ml-1.5">Tambah Barang</span>
                    </Link>

                </div>
            </div>
        </nav>
    )
}