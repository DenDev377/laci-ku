import { PlusCircle, UploadCloud, ShieldCheck } from "lucide-react";

const steps = [
  {
    step: "01",
    icon: PlusCircle,
    title: "Catat Identitas Barang",
    description:
      "Tuliskan nama barang, merek, kategori, nomor seri (SN), lokasi penyimpanan di rumah/kantor, serta harga dan tanggal beli.",
  },
  {
    step: "02",
    icon: UploadCloud,
    title: "Lampirkan Foto & Struk",
    description:
      "Jepret foto fisik barang beserta struk pembelian atau kartu garansinya. Dokumen akan langsung tersimpan aman dalam format digital.",
  },
  {
    step: "03",
    icon: ShieldCheck,
    title: "Tenang & Akses Kapan Saja",
    description:
      "Saat barang butuh diservis, masa garansi dicek, atau butuh bukti kepemilikan kepolisian/asuransi, semua ada di genggaman Anda.",
  },
];

export default function HowItWorksSection() {
  return (
    <section id="cara-kerja" className="py-20 md:py-28 bg-slate-50/70 border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-200 text-slate-800 text-xs font-semibold uppercase tracking-wider mb-3">
            Sederhana & Praktis
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-950 tracking-tight">
            Mulai Amankan Barangmu dalam 3 Langkah
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600">
            Hanya butuh 2 menit untuk setiap barang, tapi menyelamatkan aset berhargamu bertahun-tahun kemudian.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="relative bg-white rounded-2xl p-8 border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-3xl font-extrabold text-slate-200">
                      {item.step}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
