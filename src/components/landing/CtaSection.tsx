import Link from "next/link";
import { ArrowRight, ShieldCheck, Sparkles } from "lucide-react";

export default function CtaSection() {
  return (
    <section className="py-20 md:py-28 bg-white relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-tr from-gray-950 via-slate-900 to-emerald-950 text-white p-8 sm:p-14 overflow-hidden shadow-2xl">
          {/* Subtle Decorative glow */}
          <div
            className="absolute -top-24 -right-24 w-80 h-80 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none"
            aria-hidden="true"
          />

          <div className="relative z-10 text-center max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-semibold mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              Mulai Dalam Hitungan Detik
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Jangan Tunggu Barang Rusak Baru Bingung Cari Struknya.
            </h2>

            <p className="mt-4 text-base sm:text-lg text-slate-300">
              Buka brankas digital pribadimu hari ini. Gratis, tanpa kartu kredit, dan langsung siap pakai.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/auth/register"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-emerald-500 hover:bg-emerald-400 text-gray-950 font-bold text-base shadow-lg shadow-emerald-500/20 hover:shadow-xl transition-all duration-200"
              >
                Buat Akun LaciKu Sekarang
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/auth/login"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-white/10 hover:bg-white/15 text-white font-semibold text-base border border-white/20 transition-all duration-200"
              >
                Sudah Punya Akun? Masuk
              </Link>
            </div>

            <p className="mt-6 text-xs text-slate-400 flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Data aman &amp; hanya dapat diakses oleh Anda
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
