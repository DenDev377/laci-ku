"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { Archive, ShieldCheck, ArrowRight, Menu, X, Sparkles } from "lucide-react";
import { useState } from "react";

export default function LandingNavbar() {
  const { data: session } = useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/80 border-b border-slate-200/70 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative flex items-center justify-center w-11 h-11 bg-gradient-to-tr from-gray-900 via-gray-800 to-gray-700 rounded-2xl shadow-md shadow-gray-900/10 text-white transition-transform duration-300 group-hover:scale-105">
            <Archive className="w-5 h-5 text-gray-100" strokeWidth={2.3} />
            <div className="absolute -bottom-1 -right-1 bg-white p-0.5 rounded-full shadow-sm">
              <ShieldCheck className="w-4 h-4 text-emerald-600" strokeWidth={2.8} />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-tight text-gray-900 group-hover:text-emerald-700 transition-colors">
              LaciKu
            </span>
            <span className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider">
              Brankas Digital
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
          <a
            href="#fitur"
            className="hover:text-gray-900 transition-colors py-1"
          >
            Fitur Utama
          </a>
          <a
            href="#cara-kerja"
            className="hover:text-gray-900 transition-colors py-1"
          >
            Cara Kerja
          </a>
          <a
            href="#kategori"
            className="hover:text-gray-900 transition-colors py-1"
          >
            Kategori Aset
          </a>
          <a
            href="#keamanan"
            className="hover:text-gray-900 transition-colors py-1"
          >
            Keamanan
          </a>
        </nav>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center gap-3">
          {session ? (
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 shadow-sm transition-all duration-200 hover:shadow"
            >
              <Sparkles className="w-4 h-4 text-emerald-400" />
              Ke Dashboard
              <ArrowRight className="w-4 h-4 ml-0.5" />
            </Link>
          ) : (
            <>
              <Link
                href="/auth/login"
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
              >
                Masuk
              </Link>
              <Link
                href="/auth/register"
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 shadow-sm shadow-gray-900/10 hover:shadow-md transition-all duration-200"
              >
                Buka Laci Gratis
                <ArrowRight className="w-4 h-4" />
              </Link>
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-gray-600 hover:text-gray-900 focus:outline-none"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-3 shadow-lg">
          <nav className="flex flex-col space-y-2 text-sm font-medium text-gray-700">
            <a
              href="#fitur"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-slate-50"
            >
              Fitur Utama
            </a>
            <a
              href="#cara-kerja"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-slate-50"
            >
              Cara Kerja
            </a>
            <a
              href="#kategori"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-slate-50"
            >
              Kategori Aset
            </a>
            <a
              href="#keamanan"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-slate-50"
            >
              Keamanan
            </a>
          </nav>
          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            {session ? (
              <Link
                href="/dashboard"
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gray-900 text-white text-sm font-medium text-center"
              >
                Ke Dashboard
                <ArrowRight className="w-4 h-4" />
              </Link>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  className="w-full py-2.5 rounded-xl border border-slate-200 text-gray-800 text-sm font-medium text-center hover:bg-slate-50"
                >
                  Masuk
                </Link>
                <Link
                  href="/auth/register"
                  className="w-full py-2.5 rounded-xl bg-gray-900 text-white text-sm font-medium text-center hover:bg-gray-800"
                >
                  Buka Laci Gratis
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
