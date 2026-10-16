import Link from "next/link";
import { Archive, ShieldCheck, Heart } from "lucide-react";

export default function LandingFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-50 border-t border-slate-200/80 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo & Tagline */}
          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center w-10 h-10 bg-gray-900 rounded-xl text-white">
              <Archive className="w-5 h-5" />
              <div className="absolute -bottom-1 -right-1 bg-white p-0.5 rounded-full shadow-xs">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              </div>
            </div>
            <div>
              <span className="text-lg font-bold text-gray-900">LaciKu</span>
              <p className="text-xs text-slate-500">
                Laci Digital untuk Seluruh Barang &amp; Bukti Kepemilikanmu
              </p>
            </div>
          </div>

          {/* Quick links */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-slate-600 font-medium">
            <a href="#fitur" className="hover:text-gray-900 transition-colors">
              Fitur
            </a>
            <a href="#cara-kerja" className="hover:text-gray-900 transition-colors">
              Cara Kerja
            </a>
            <a href="#kategori" className="hover:text-gray-900 transition-colors">
              Kategori
            </a>
            <a href="#keamanan" className="hover:text-gray-900 transition-colors">
              Keamanan
            </a>
            <Link href="/auth/login" className="hover:text-gray-900 transition-colors">
              Masuk
            </Link>
            <Link href="/auth/register" className="hover:text-gray-900 transition-colors">
              Daftar
            </Link>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {currentYear} LaciKu. Hak Cipta Dilindungi.</p>
          <p className="flex items-center gap-1">
            Dibuat dengan <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> untuk pemilik barang berharga di Indonesia.
          </p>
        </div>
      </div>
    </footer>
  );
}
