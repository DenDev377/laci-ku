import Card from "@/components/dashboard/Card";
import { Package, DollarSign, Folders, FileText, Plus, ShieldCheck } from "lucide-react";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import type { Metadata } from "next";
import RecentItems from "@/components/dashboard/RecentItems";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Dashboard — LaciKu",
  description:
    "Catat barang berharga, unggah foto & struk, dan simpan bukti kepemilikan di satu tempat. Tenang kalau suatu saat hilang.",
};

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  const userName = session?.user?.name || "Pengguna";

  const [dataRecentItems, totalbarang, estimasiNilai, kategoribarang, totaldokumen] =
    await Promise.all([
      prisma.item.findMany({
        take: 4,
        orderBy: { createdAt: "desc" },
        where: { userId: session?.user?.id },
        include: { photos: true },
      }),

      // Total Barang
      prisma.item.count({
        where: { userId: session?.user?.id },
      }),

      // Estimasi Nilai
      prisma.item.aggregate({
        _sum: { purchasePrice: true },
        where: { userId: session?.user?.id },
      }),

      // Kategori Barang
      prisma.item
        .groupBy({
          by: ["category"],
          where: { userId: session?.user?.id },
        })
        .then((res) => res.length.toString()),

      // Total Dokumen
      prisma.document.count({
        where: {
          item: { userId: session?.user?.id },
        },
      }),
    ]);

  const formattedNilai = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(estimasiNilai._sum.purchasePrice || 0);

  const statCard = [
    {
      label: "Total Barang",
      value: totalbarang.toString(),
      icon: <Package className="w-5 h-5" />,
      trend: { value: `${totalbarang} Terdaftar`, isPositive: true },
      description: "Seluruh inventaris aktif Anda",
    },
    {
      label: "Estimasi Nilai",
      value: formattedNilai.toString(),
      icon: <DollarSign className="w-5 h-5" />,
      trend: { value: "Aset Pribadi", isPositive: true },
      description: "Berdasarkan harga pembelian tercatat",
    },
    {
      label: "Kategori Barang",
      value: `${kategoribarang} Kategori`,
      icon: <Folders className="w-5 h-5" />,
      description: "Variasi kelompok aset Anda",
    },
    {
      label: "Dokumen & Struk",
      value: `${totaldokumen} File`,
      icon: <FileText className="w-5 h-5" />,
      trend: {
        value: totaldokumen > 0 ? "Tersimpan" : "Simpan Struk!",
        isPositive: totaldokumen > 0,
      },
      description: "Garansi & bukti pembelian",
    },
  ];

  return (
    <div className="flex flex-col w-full max-w-7xl mx-auto space-y-6 sm:space-y-8">
      {/* Header & Quick Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-950 tracking-tight">
            Dashboard
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Halo, <strong className="text-slate-800">{userName}</strong>! Anda memiliki{" "}
            <strong className="text-slate-900">{totalbarang} barang</strong> tercatat di LaciKu.
          </p>
        </div>

        <Link
          href="/dashboard/addItem"
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-gray-900 hover:bg-gray-800 text-white text-sm font-semibold shadow-xs hover:shadow-md transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Barang</span>
        </Link>
      </div>

      {/* Stat Cards Grid: 1 col on mobile, 2 col on tablet, 4 col on desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCard.map((stat) => (
          <Card
            key={stat.label}
            label={stat.label}
            value={stat.value}
            icon={stat.icon}
            trend={stat.trend}
            description={stat.description}
          />
        ))}
      </div>

      {/* Recent Items Section */}
      <div>
        <RecentItems
          dataRecentItems={dataRecentItems}
          totalItemsCount={totalbarang}
        />
      </div>
    </div>
  );
}
