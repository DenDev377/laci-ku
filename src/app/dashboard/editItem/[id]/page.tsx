import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import FormEdit from "./FormEdit";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditItemPage({ params }: PageProps) {
  const { id } = await params;
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return <div className="p-8 text-center text-gray-500">Anda harus login untuk mengedit item.</div>;
  }

  const item = await prisma.item.findUnique({
    where: { id },
    include: {
      photos: true,
      documents: true,
    },
  });

  if (!item) {
    notFound();
  }

  if (item.userId !== session.user.id) {
    return <div className="p-8 text-center text-red-500">Anda tidak berhak mengedit item ini.</div>;
  }

  return <FormEdit item={item} />;
}