import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import SettingsForm from "./SettingsForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pengaturan Akun — LaciKu",
  description: "Kelola informasi profil pribadi dan preferensi keamanan akun Anda di LaciKu.",
};

export default async function SettingsPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return (
      <div className="flex items-center justify-center min-h-[50vh] text-slate-600">
        Anda harus masuk terlebih dahulu untuk mengakses halaman pengaturan.
      </div>
    );
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
      _count: {
        select: { items: true },
      },
    },
  });

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-[50vh] text-slate-600">
        Data pengguna tidak ditemukan.
      </div>
    );
  }

  const userData = {
    id: user.id,
    name: user.name,
    email: user.email,
    createdAt: user.createdAt,
    totalItems: user._count.items,
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 md:px-8 pb-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Pengaturan Akun</h1>
        <p className="text-slate-500 mt-1">
          Kelola informasi profil pribadi dan preferensi keamanan akun Anda.
        </p>
      </div>

      <SettingsForm user={userData} />
    </div>
  );
}
