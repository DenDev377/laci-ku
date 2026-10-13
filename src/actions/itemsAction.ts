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

    await writeFile(filePath, buffer);

    finalDocumentUrl = `/uploads/${uniqueName}`;
  }

  // Upload photos
  const photoUrls: string[] = [];
  for (const photo of photos) {
    if (photo.size > 0) {
      const bytes = await photo.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const uniqueName = `${Date.now()}_${Math.random().toString(36).slice(2)}_${photo.name.replace(/\s+/g, "_")}`;

      const uploadDir = path.join(process.cwd(), "public/uploads");
      const filePath = path.join(uploadDir, uniqueName);

      if (!fs.existsSync(uploadDir)) {
        await mkdir(uploadDir, { recursive: true });
      }

      await writeFile(filePath, buffer);
      photoUrls.push(`/uploads/${uniqueName}`);
    }
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
        create: photoUrls.map((url) => ({ url })),
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

export async function deleteItem(itemId: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    throw new Error("Anda harus login untuk menghapus item!");
  }

  // Verify ownership and get files to delete
  const item = await prisma.item.findUnique({
    where: { id: itemId },
    include: { photos: true, documents: true },
  });

  if (!item) {
    throw new Error("Item tidak ditemukan");
  }

  if (item.userId !== session.user.id) {
    throw new Error("Anda tidak berhak menghapus item ini!");
  }

  // Delete physical files
  const uploadDir = path.join(process.cwd(), "public/uploads");

  for (const photo of item.photos) {
    const filePath = path.join(uploadDir, photo.url.replace("/uploads/", ""));
    if (fs.existsSync(filePath)) {
      await fs.promises.unlink(filePath);
    }
  }

  for (const doc of item.documents) {
    const filePath = path.join(uploadDir, doc.url.replace("/uploads/", ""));
    if (fs.existsSync(filePath)) {
      await fs.promises.unlink(filePath);
    }
  }

  // Delete from database (cascade will handle photos & documents)
  await prisma.item.delete({
    where: { id: itemId },
  });

  revalidatePath("/dashboard/items");
}

export async function updateItem(itemId: string, formData: FormData) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    throw new Error("Anda harus login untuk mengupdate item!");
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
  const file = formData.get("document") as File | null;
  const photos = formData.getAll("photos") as File[];

  if (!name || name.trim().length === 0) {
    throw new Error("Nama item tidak boleh kosong");
  }

  if (!category) {
    throw new Error("Kategori item tidak boleh kosong");
  }

  const item = await prisma.item.findUnique({
    where: { id: itemId },
    include: { photos: true, documents: true },
  });

  if (!item) {
    throw new Error("Item tidak ditemukan");
  }

  if (item.userId !== session.user.id) {
    throw new Error("Anda tidak berhak mengupdate item ini!");
  }

  const uploadDir = path.join(process.cwd(), "public/uploads");
  if (!fs.existsSync(uploadDir)) {
    await mkdir(uploadDir, { recursive: true });
  }

  // Handle document upload
  let finalDocumentUrl: string | null = null;
  if (file && file.size > 0) {
    // Delete old document file
    if (item.documents.length > 0) {
      for (const doc of item.documents) {
        const oldPath = path.join(uploadDir, doc.url.replace("/uploads/", ""));
        if (fs.existsSync(oldPath)) {
          await fs.promises.unlink(oldPath);
        }
      }
      // Delete old document records
      await prisma.document.deleteMany({ where: { itemId } });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const uniqueName = `${Date.now()}_${file.name.replace(/\s+/g, "_")}`;
    const filePath = path.join(uploadDir, uniqueName);
    await writeFile(filePath, buffer);
    finalDocumentUrl = `/uploads/${uniqueName}`;
  }

  // Handle photos - replace all if new photos provided
  let photoUrls: string[] = [];
  if (photos.length > 0 && photos[0].size > 0) {
    // Delete old photo files
    for (const photo of item.photos) {
      const oldPath = path.join(uploadDir, photo.url.replace("/uploads/", ""));
      if (fs.existsSync(oldPath)) {
        await fs.promises.unlink(oldPath);
      }
    }
    // Delete old photo records
    await prisma.photo.deleteMany({ where: { itemId } });

    // Upload new photos
    for (const photo of photos) {
      if (photo.size > 0) {
        const bytes = await photo.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const uniqueName = `${Date.now()}_${Math.random().toString(36).slice(2)}_${photo.name.replace(/\s+/g, "_")}`;
        const filePath = path.join(uploadDir, uniqueName);
        await writeFile(filePath, buffer);
        photoUrls.push(`/uploads/${uniqueName}`);
      }
    }
  }

  // Update item with all data
  await prisma.item.update({
    where: { id: itemId },
    data: {
      name,
      category,
      brand: brand || null,
      serialNumber: serialNumber || null,
      purchaseDate: finalPurchaseDate,
      purchasePrice: finalPurchasePrice,
      location: location || null,
      notes: notes || null,
      ...(finalDocumentUrl && {
        documents: {
          create: {
            name: file!.name,
            type: "STRUK",
            url: finalDocumentUrl,
          },
        },
      }),
      ...(photoUrls.length > 0 && {
        photos: {
          create: photoUrls.map((url) => ({ url })),
        },
      }),
    },
  });

  revalidatePath("/dashboard/items");
}
