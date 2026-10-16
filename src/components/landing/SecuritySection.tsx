import { ShieldCheck, Lock, KeyRound, CloudCheck } from "lucide-react";

export default function SecuritySection() {
  return (
    <section id="keamanan" className="py-20 md:py-24 bg-gradient-to-b from-slate-900 to-gray-950 text-white relative overflow-hidden">
      {/* Background radial highlight */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-700/50 text-emerald-300 text-xs font-semibold mb-4">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            Privasi & Keamanan Terjamin
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Data Inventaris Anda Hanya Milik Anda
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300">
            Kami memahami barang berharga dan dokumen bersifat sangat privat. LaciKu dibangun dengan standar keamanan modern.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-5">
              <Lock className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Password Terenkripsi Kuat</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Seluruh kredensial akun diamankan menggunakan algoritma hashing standar industri (Bcrypt) sehingga tidak dapat dibaca oleh siapa pun.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <div className="w-12 h-12 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center mb-5">
              <KeyRound className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Akses Terisolasi Per-Pengguna</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Setiap catatan barang, foto, dan struk terikat secara ketat ke ID akun Anda. Pengguna lain tidak memiliki akses ke brankas digital Anda.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <div className="w-12 h-12 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center mb-5">
              <CloudCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Penyimpanan Terpusat & Siap Unduh</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Arsip struk dan dokumen tersimpan rapi dan dapat diunduh kembali kapan pun Anda membutuhkan bukti fisik saat klaim garansi.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
