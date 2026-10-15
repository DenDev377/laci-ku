"use server";

import { z } from "zod";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { revalidatePath } from "next/cache";

const UpdateProfileSchema = z.object({
  name: z.string().trim().min(2, "Nama minimal harus 2 karakter"),
});

const UpdatePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "Kata sandi saat ini wajib diisi"),
    newPassword: z.string().min(8, "Kata sandi baru minimal 8 karakter"),
    confirmPassword: z.string().min(1, "Konfirmasi kata sandi wajib diisi"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Konfirmasi kata sandi tidak cocok dengan kata sandi baru",
    path: ["confirmPassword"],
  })
  .refine((data) => data.currentPassword !== data.newPassword, {
    message: "Kata sandi baru tidak boleh sama dengan kata sandi saat ini",
    path: ["newPassword"],
  });

export type ActionResponse = {
  success: boolean;
  message: string;
};

export async function updateProfile(formData: FormData): Promise<ActionResponse> {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return { success: false, message: "Sesi telah berakhir. Silakan login kembali." };
    }

    const rawData = {
      name: formData.get("name"),
    };

    const validation = UpdateProfileSchema.safeParse(rawData);
    if (!validation.success) {
      return {
        success: false,
        message: validation.error.issues[0]?.message || "Data profil tidak valid.",
      };
    }

    const { name } = validation.data;

    await prisma.user.update({
      where: { id: session.user.id },
      data: { name },
    });

    revalidatePath("/dashboard/settings");
    revalidatePath("/dashboard");
    revalidatePath("/dashboard/items");

    return {
      success: true,
      message: "Profil Anda berhasil diperbarui.",
    };
  } catch (error) {
    console.error("Error update profile:", error);
    return {
      success: false,
      message: "Terjadi kesalahan saat memperbarui profil.",
    };
  }
}

export async function updatePassword(formData: FormData): Promise<ActionResponse> {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return { success: false, message: "Sesi telah berakhir. Silakan login kembali." };
    }

    const rawData = {
      currentPassword: formData.get("currentPassword"),
      newPassword: formData.get("newPassword"),
      confirmPassword: formData.get("confirmPassword"),
    };

    const validation = UpdatePasswordSchema.safeParse(rawData);
    if (!validation.success) {
      return {
        success: false,
        message: validation.error.issues[0]?.message || "Data kata sandi tidak valid.",
      };
    }

    const { currentPassword, newPassword } = validation.data;

    // Ambil data user beserta password hash saat ini
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { password: true },
    });

    if (!user) {
      return { success: false, message: "Pengguna tidak ditemukan." };
    }

    // Verifikasi password saat ini
    const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
    if (!isPasswordValid) {
      return {
        success: false,
        message: "Kata sandi saat ini yang Anda masukkan salah.",
      };
    }

    // Hash password baru dan update di database
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    await prisma.user.update({
      where: { id: session.user.id },
      data: { password: hashedNewPassword },
    });

    return {
      success: true,
      message: "Kata sandi Anda berhasil diperbarui.",
    };
  } catch (error) {
    console.error("Error update password:", error);
    return {
      success: false,
      message: "Terjadi kesalahan saat memperbarui kata sandi.",
    };
  }
}
