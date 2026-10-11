import TableItem from "@/components/dashboard/TableItem";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function itemsPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return <div>Anda harus login untuk melihat halaman ini.</div>;
  }
  const allItemData = await prisma.item.findMany({
    where: {
      userId: session.user.id,
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
      <h1 className="text-3xl text-gray-900 tracking-tight">Daftar Item</h1>
      <p className="text-gray-500 mt-2">Berikut adalah daftar item yang telah terdaftar di sistem.</p>

      <TableItem dataItem={allItemData} />
    </div>
  );
}