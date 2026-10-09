"use client";
import { useRef, useState } from "react";
import { createItem } from "@/actions/itemsAction";
import { useRouter } from "next/navigation";
import { Category } from "@/generated/prisma/enums";

const categories: Category[] = [
  "ELEKTRONIK",
  "KENDARAAN",
  "PERHIASAN",
  "DOKUMEN",
  "FURNITUR",
  "LAINNYA",
];

export default function AddItemPage() {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [documentName, setDocumentName] = useState<string | null>(null);

  async function actionHandler(formData: FormData) {
    setLoading(true);
    setError(null);
    try {
      await createItem(formData);
      router.push("/dashboard/items");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Terjadi kesalahan saat menambahkan item.",
      );
    } finally {
      setLoading(false);
    }
  }
  function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files || []);
    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setPreviewImages((prev) => [...prev, ...newPreviews]);
  }

  function removePreview(index: number) {
    setPreviewImages((prev) => prev.filter((_, i) => i !== index));
  }

  function handleDocumentChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) {
      setDocumentName(file?.name || "");
    }
  }
}
