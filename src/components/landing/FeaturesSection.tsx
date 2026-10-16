import {
  FileText,
  Search,
  Shield,
  Layers,
  Sparkles,
  Smartphone,
  CheckCircle,
  TrendingUp,
} from "lucide-react";

const features = [
  {
    icon: FileText,
    badge: "Solusi Struk Kasir",
    title: "Struk Thermal Anti-Pudar",
    description:
      "Tinta struk kasir toko biasanya pudar dan tak terbaca dalam 3–6 bulan. Foto dan simpan struk belanja di LaciKu agar garansi tetap bisa diklaim.",
    color: "from-amber-500 to-orange-500",
  },
  {
    icon: Shield,
    badge: "Keamanan Aset",
    title: "Bukti Kepemilikan & Nomor Seri",
    description:
      "Catat Serial Number (SN) dan IMEI setiap gadget atau barang berharga. Sangat krusial untuk pelaporan resmi jika terjadi pencurian atau kehilangan.",
    color: "from-emerald-500 to-teal-500",
  },
  {
    icon: TrendingUp,
    badge: "Kalkulasi Otomatis",
    title: "Estimasi Total Nilai Aset",
    description:
      "Lacak seberapa besar nilai aset barang bergerak yang Anda miliki. Dapatkan gambaran komprehensif total inventaris dalam mata uang Rupiah.",
    color: "from-blue-500 to-indigo-500",
  },
  {
    icon: Layers,
    badge: "Multi-Dokumen",
    title: "Foto Fisik & Kartu Garansi",
    description:
      "Unggah foto fisik barang dari berbagai sisi, kartu garansi toko, hingga sertifikat keaslian (misal: nota emas antam / BPKB kendaraan).",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: Search,
    badge: "Pencarian Cepat",
    title: "Filter & Cari dalam Detik",
    description:
      "Tak perlu lagi membongkar laci kamar atau lemari binder. Cukup ketik nama barang atau nomor seri di kolom pencarian dashboard.",
    color: "from-rose-500 to-red-500",
  },
  {
    icon: Smartphone,
    badge: "Akses Fleksibel",
    title: "Responsif di Semua Perangkat",
    description:
      "Buka LaciKu dari smartphone saat Anda sedang berada di service center, atau akses dari laptop di rumah dengan pengalaman yang mulus.",
    color: "from-cyan-500 to-blue-500",
  },
];

export default function FeaturesSection() {
  return (
    <section id="fitur" className="py-20 md:py-28 bg-white border-t border-slate-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            Fitur Yang Anda Butuhkan
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-950 tracking-tight">
            Kenapa Setiap Orang Butuh &quot;Laci Digital&quot;?
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600">
            Sebagian besar orang baru panik mencari bukti pembelian saat barang rusak atau hilang.
            LaciKu memastikan Anda selalu selangkah lebih maju.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className="group relative p-7 rounded-2xl bg-slate-50/70 border border-slate-200/80 hover:bg-white hover:border-slate-300 hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300"
              >
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${feature.color} flex items-center justify-center text-white shadow-md mb-5 group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  {feature.badge}
                </span>
                <h3 className="text-xl font-bold text-gray-900 mt-1 mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
