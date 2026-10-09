import Card from "@/components/dashboard/Card";
import { Package, DollarSign, Folders, FileText } from "lucide-react";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import type { Metadata } from "next";
import RecentItems from "@/components/dashboard/RecentItems";

export const metadata: Metadata = {
  title: "Laci — Laci Digital untuk Barang Berhargamu",
  description:
    "Catat barang berharga, unggah foto & struk, dan simpan bukti kepemilikan di satu tempat. Tenang kalau suatu saat hilang.",
};

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  const userName = session?.user?.name || "Banyak";
  const dataRecentItems = await prisma.item.findMany({
    take: 3,
    orderBy: { createdAt: "desc" },
    where: { userId: session?.user?.id },
    include: { photos: true },
  });

  const statCard = [
    {
      label: "Total Barang",
      value: 12,
      icon: <Package className="w-5 h-5" />,
      trend: { value: "+2 Bulan ini", isPositive: true },
      description: "Seluruh inventaris Anda",
    },

    {
      label: "Estimasi Nilai",
      value: "Rp 24.5 Juta",
      icon: <DollarSign className="w-5 h-5" />,
      trend: { value: "+12% dari lalu", isPositive: true },
      description: "Berdasarkan harga pembelian",
    },

    {
      label: "Kategori Barang",
      value: "8",
      icon: <Folders className="w-5 h-5" />,
      description: "Grup barang yang dicatat",
    },
    {
      label: "Total Dokumen",
      value: "4",
      icon: <FileText className="w-5 h-5" />,
      trend: { value: "Ingat Simpan Struk!", isPositive: false },
      description: "Garansi & Bukti Pembelian",
    },
  ];
  return (
    <div className="flex flex-col w-full mx-auto px-4 sm:px-6 md:px-8">
      <h1 className="text-3xl text-gray-900 tracking-tight">Dashboard</h1>
      <div className="mt-2 text-gray-700">
        <p>Halo {userName} , kamu punya totalbarang tercatat.</p>
      </div>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-4">
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

      <div className="mt-16">
        <RecentItems dataRecentItems={dataRecentItems} />
      </div>
    </div>
  );
}
