"use server";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

const RegisterSchema = z.object({
  name: z.string().min(1, "Nama wajib diisi"),
  email: z.string().email("Format email tidak valid"),
  password: z.string().min(8, "Password minimal 8 karakter"),
});

export async function registerUser(formData: FormData) {
  try {
    const data = Object.fromEntries(formData.entries());
    const hasilValidasi = RegisterSchema.safeParse(data);

    if (!hasilValidasi.success) {
      return {
        error: hasilValidasi.error.issues[0].message || "Data tidak lengkap",
      };
    }

    const { name, email, password } = hasilValidasi.data;

    // Cek duplikasi
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return { error: "Email sudah terdaftar" };
    }

    // Hash dan simpan
    const hashedPassword = await bcrypt.hash(password, 10);
    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return { success: true };
  } catch (error) {
    console.error("Register Error (Action):", error);
    return { error: "Terjadi kesalahan pada server" };
  }
}
