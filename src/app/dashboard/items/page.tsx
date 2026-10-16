import TableItem from "@/components/dashboard/TableItem";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Category } from "@/generated/prisma/enums";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Daftar Barang Berharga — LaciKu",
  description: "Kelola, cari, dan pantau seluruh barang berharga dan bukti kepemilikan Anda.",
};

interface ItemsPageProps {
  searchParams: Promise<{
    q?: string;
    category?: string;
  }>;
}

export default async function ItemsPage({ searchParams }: ItemsPageProps) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return (
      <div className="flex items-center justify-center min-h-[50vh] text-slate-600">
        Anda harus masuk terlebih dahulu untuk melihat halaman ini.
      </div>
    );
  }

  const { q, category } = await searchParams;
  const searchQuery = q?.trim() || "";

  // Bangun filter Prisma dinamis
  const whereClause: any = {
    userId: session.user.id,
  };

  if (searchQuery) {
    whereClause.OR = [
      { name: { contains: searchQuery, mode: "insensitive" } },
      { brand: { contains: searchQuery, mode: "insensitive" } },
      { serialNumber: { contains: searchQuery, mode: "insensitive" } },
      { location: { contains: searchQuery, mode: "insensitive" } },
    ];
  }

  if (category && Object.values(Category).includes(category as Category)) {
    whereClause.category = category as Category;
  }

  const allItemData = await prisma.item.findMany({
    where: whereClause,
    include: {
      photos: true,
      documents: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="flex flex-col w-full max-w-7xl mx-auto">
      {/* Header Halaman */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
            Barang Berharga
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Kelola inventaris, nomor seri, dan dokumen bukti kepemilikan Anda.
          </p>
        </div>
      </div>

      {/* Komponen Tabel & Card Mobile */}
      <TableItem
        dataItem={allItemData}
        searchQuery={searchQuery}
        selectedCategory={category}
      />
    </div>
  );
}