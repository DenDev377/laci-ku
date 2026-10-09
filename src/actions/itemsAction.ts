"use server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { revalidatePath } from "next/cache";
import { Category, DocType } from "@/generated/prisma/enums";
import { writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import fs from "node:fs";

export async function createItem(formData: FormData) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    throw new Error("Anda harus login untuk membuat tugas!.");
  }

  const name = formData.get("name") as string;
  const category = formData.get("category") as Category;
  const brand = formData.get("brand") as string;
  const serialNumber = formData.get("serialNumber") as string;
  const purchaseDate = formData.get("purchaseDate") as string | null;
  const finalPurchaseDate = purchaseDate ? new Date(purchaseDate) : null;
  const purchasePrice = formData.get("purchasePrice") as string | null;
  const finalPurchasePrice = purchasePrice ? parseInt(purchasePrice) : null;
  const location = formData.get("location") as string | null;
  const notes = formData.get("notes") as string | null;
  const photos = formData.getAll("photos") as File[];
  const file = formData.get("documents") as File;

  let finalDocumentUrl: string | null = null;

  if (file && file.size > 0) {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const uniqueName = `${Date.now()}_${file.name.replace(/\s+/g, "_")}`;

    const uploadDir = path.join(process.cwd(), "public/uploads");
    const filePath = path.join(uploadDir, uniqueName);

    if (!fs.existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true });
    }

    // 7. Tulis file tersebut ke dalam harddisk
    await writeFile(filePath, buffer);

    finalDocumentUrl = `/uploads/${uniqueName}`;
  }

  await prisma.item.create({
    data: {
      name,
      category,
      brand: brand || null,
      serialNumber: serialNumber || null,
      purchaseDate: finalPurchaseDate,
      purchasePrice: finalPurchasePrice,
      location: location || null,
      notes: notes || null,
      userId: session.user.id,
      photos: {
        create: [{ url: "/uploads/foto1.jpg" }, { url: "/uploads/foto2.jpg" }],
      },
      ...(finalDocumentUrl && {
        documents: {
          create: {
            name: file.name,
            type: "STRUK",
            url: finalDocumentUrl,
          },
        },
      }),
    },
  });

  revalidatePath("/dashboard/items");
}
