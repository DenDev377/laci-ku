import {
  Laptop,
  Car,
  Gem,
  FileBadge2,
  Armchair,
  FolderArchive,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

const categories = [
  {
    name: "Elektronik & Gadget",
    code: "ELEKTRONIK",
    examples: "Laptop, Smartphone, Kamera, Smart TV, Audio System",
    icon: Laptop,
    badge: "Kategori Terpopuler",
    color: "bg-indigo-50 text-indigo-700 border-indigo-200",
  },
  {
    name: "Kendaraan Pribadi",
    code: "KENDARAAN",
    examples: "Mobil, Motor, Sepeda Lipat, Aksesoris Kendaraan",
    icon: Car,
    badge: "Nilai Tinggi",
    color: "bg-blue-50 text-blue-700 border-blue-200",
  },
  {
    name: "Perhiasan & Jam Tangan",
    code: "PERHIASAN",
    examples: "Logam Mulia (Emas), Cincin Berlian, Jam Tangan Mewah",
    icon: Gem,
    badge: "Arsip Sertifikat",
    color: "bg-amber-50 text-amber-700 border-amber-200",
  },
  {
    name: "Dokumen Berharga",
    code: "DOKUMEN",
    examples: "Sertifikat Rumah/Tanah, Ijazah Asli, Paspor, BPKB",
    icon: FileBadge2,
    badge: "Arsip Vital",
    color: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  {
    name: "Furnitur & Perabot",
    code: "FURNITUR",
    examples: "Sofa Kulit, Meja Ergonomis, Kasur, Kitchen Set",
    icon: Armchair,
    badge: "Perlindungan Garansi",
    color: "bg-rose-50 text-rose-700 border-rose-200",
  },
  {
    name: "Hobi, Koleksi & Lainnya",
    code: "LAINNYA",
    examples: "Gitar/Alat Musik, Action Figure, Sepatu Koleksi",
    icon: FolderArchive,
    badge: "Koleksi Berharga",
    color: "bg-slate-100 text-slate-800 border-slate-300",
  },
];

export default function CategoryShowcase() {
  return (
    <section id="kategori" className="py-20 md:py-28 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold uppercase tracking-wider mb-3">
            Fleksibel & Komprehensif
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-950 tracking-tight">
            Cocok untuk Berbagai Macam Barang Berharga
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600">
            Dari perangkat kerja sehari-hari hingga barang investasi keluarga, kategorikan semuanya dengan rapi.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-slate-50/60 border border-slate-200/80 hover:bg-white hover:border-slate-300 hover:shadow-lg transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-11 h-11 rounded-xl bg-white border border-slate-200 text-slate-900 flex items-center justify-center shadow-xs">
                      <Icon className="w-5 h-5 text-slate-700" />
                    </div>
                    <span
                      className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${cat.color}`}
                    >
                      {cat.badge}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Contoh: {cat.examples}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-200/60 flex items-center justify-between text-xs font-medium text-slate-400">
                  <span className="font-mono">Tipe: {cat.code}</span>
                  <Link
                    href="/dashboard/addItem"
                    className="text-slate-700 hover:text-emerald-600 font-semibold inline-flex items-center gap-1"
                  >
                    Tambah
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
