import TableItem from "@/components/dashboard/TableItem";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Category } from "@/generated/prisma/enums";

type Props = {
  searchParams: Promise<{ q?: string }>;
};

export default async function ItemsPage(props: Props) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return (
      <div className="p-8 text-center text-slate-600">
        Anda harus login untuk melihat halaman ini.
      </div>
    );
  }

  const searchParams = await props.searchParams;
  const query = typeof searchParams?.q === "string" ? searchParams.q.trim() : "";

  const matchingCategory = Object.values(Category).find(
    (cat) => cat.toLowerCase() === query.toLowerCase()
  );

  const allItemData = await prisma.item.findMany({
    where: {
      userId: session.user.id,
      ...(query
        ? {
            OR: [
              { name: { contains: query, mode: "insensitive" } },
              { brand: { contains: query, mode: "insensitive" } },
              { location: { contains: query, mode: "insensitive" } },
              { notes: { contains: query, mode: "insensitive" } },
              { serialNumber: { contains: query, mode: "insensitive" } },
              ...(matchingCategory ? [{ category: matchingCategory }] : []),
            ],
          }
        : {}),
    },
    include: {
      photos: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="flex flex-col w-full mx-auto px-4 sm:px-6 md:px-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Daftar Barang</h1>
        <p className="text-gray-500 mt-1">
          {query
            ? `Hasil pencarian untuk "${query}" (${allItemData.length} barang ditemukan)`
            : "Berikut adalah daftar barang berharga yang telah terdaftar di sistem."}
        </p>
      </div>

      <TableItem dataItem={allItemData} searchQuery={query} />
    </div>
  );
}