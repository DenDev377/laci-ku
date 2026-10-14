"use client";

import Link from "next/link";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useState, useEffect, useTransition } from "react";
import { useSession, signOut } from "next-auth/react";
import {
  LayoutDashboard,
  LayoutList,
  Menu,
  Plus,
  Search,
  Settings,
  X,
  Loader2,
  Archive,
  ShieldCheck,
  LogOut,
} from "lucide-react";

export default function NavbarDashboard() {
  const { data: session, status } = useSession();
  const userName = session?.user?.name || "Pengguna";
  const userInisial = userName.charAt(0).toUpperCase();

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const queryInUrl = searchParams.get("q") || "";
  const [searchTerm, setSearchTerm] = useState(queryInUrl);
  const [prevQuery, setPrevQuery] = useState(queryInUrl);
  const [isPending, startTransition] = useTransition();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Sinkronkan input searchTerm jika URL berubah tanpa cascading render effect
  if (queryInUrl !== prevQuery) {
    setPrevQuery(queryInUrl);
    setSearchTerm(queryInUrl);
  }

  // Debounce search update ke URL (300ms)
  useEffect(() => {
    // Hindari trigger jika isi input sama dengan query di URL
    if (searchTerm === queryInUrl) return;

    const timer = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      const trimmed = searchTerm.trim();

      if (trimmed) {
        params.set("q", trimmed);
      } else {
        params.delete("q");
      }

      // Jika user mencari dari halaman selain /dashboard/items, arahkan ke /dashboard/items
      const targetPath = pathname.startsWith("/dashboard/items")
        ? pathname
        : "/dashboard/items";
      const queryString = params.toString();
      const targetUrl = queryString ? `${targetPath}?${queryString}` : targetPath;

      startTransition(() => {
        router.replace(targetUrl);
      });
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm, queryInUrl, pathname, router, searchParams]);

  const handleClear = () => {
    setSearchTerm("");
    const params = new URLSearchParams(searchParams.toString());
    params.delete("q");

    const targetPath = pathname.startsWith("/dashboard/items")
      ? pathname
      : "/dashboard/items";
    const queryString = params.toString();
    const targetUrl = queryString ? `${targetPath}?${queryString}` : targetPath;

    startTransition(() => {
      router.replace(targetUrl);
    });
  };

  const menuItems = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: <LayoutDashboard className="w-5 h-5" />,
    },
    {
      name: "Barang Berharga",
      href: "/dashboard/items",
      icon: <LayoutList className="w-5 h-5" />,
    },
    {
      name: "Pengaturan",
      href: "/dashboard/settings",
      icon: <Settings className="w-5 h-5" />,
    },
  ];

  return (
    <>
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
          <div className="flex items-center gap-2.5 flex-1 md:max-w-md bg-slate-50 rounded-xl px-3 h-10 border border-slate-300 focus-within:border-gray-900 focus-within:ring-2 focus-within:ring-gray-900/10 transition-colors">
            {isPending ? (
              <Loader2 className="w-4 h-4 text-slate-400 animate-spin shrink-0" />
            ) : (
              <Search className="w-4 h-4 text-slate-400 shrink-0" />
            )}
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Cari barang, merek, atau lokasi..."
              className="w-full bg-transparent text-sm text-slate-900 placeholder-slate-400 focus:outline-none"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={handleClear}
                className="text-slate-400 hover:text-slate-600 p-0.5 rounded-full hover:bg-slate-200 transition-colors shrink-0"
                title="Hapus pencarian"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
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
              className="inline-flex items-center justify-center bg-slate-900 text-white rounded-full p-2 md:px-4 md:py-2 text-sm font-medium hover:bg-slate-800 transition-colors shrink-0 shadow-sm"
              aria-label="Tambah Barang Baru"
            >
              <Plus className="w-5 h-5 md:w-4 md:h-4" />
              <span className="hidden md:inline-block ml-1.5">Tambah Barang</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="relative w-72 max-w-[80vw] bg-white h-full flex flex-col z-10 shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between h-16 px-6 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="relative flex items-center justify-center w-9 h-9 bg-gradient-to-tr from-gray-900 to-gray-700 rounded-xl text-white">
                  <Archive className="w-4 h-4" strokeWidth={2.5} />
                  <div className="absolute -bottom-0.5 -right-0.5 bg-white p-0.5 rounded-full">
                    <ShieldCheck className="w-3 h-3 text-emerald-500" strokeWidth={3} />
                  </div>
                </div>
                <span className="text-lg font-bold text-gray-900">LaciKu</span>
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Nav Menu */}
            <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
              <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4 px-2">
                Menu Utama
              </div>
              {menuItems.map((item) => {
                const isActive =
                  item.href === "/dashboard"
                    ? pathname === "/dashboard"
                    : pathname === item.href || pathname.startsWith(item.href + "/");

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 ${
                      isActive
                        ? "bg-gray-900 text-white font-medium shadow-md shadow-gray-200"
                        : "text-gray-500 hover:bg-slate-50 hover:text-gray-900"
                    }`}
                  >
                    {item.icon}
                    <span className="text-sm">{item.name}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Logout button */}
            <div className="p-4 border-t border-slate-200">
              <button
                onClick={() => signOut({ callbackUrl: "/auth/login" })}
                className="flex items-center gap-3 px-3 py-2.5 w-full rounded-lg text-sm font-medium text-slate-600 hover:bg-red-50 hover:text-red-600 transition-colors"
              >
                <LogOut className="w-4 h-4 text-slate-400" />
                Keluar Aplikasi
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}