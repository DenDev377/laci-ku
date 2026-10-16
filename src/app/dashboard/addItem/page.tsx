"use client";
import { useRef, useState } from "react";
import { createItem } from "@/actions/itemsAction";
import { useRouter } from "next/navigation";
import { Category } from "@/generated/prisma/enums";
import { FileText, Plus, X, Image, Loader2, ArrowLeft } from "lucide-react";

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
      router.refresh();
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

  return (
    <form
      action={actionHandler}
      ref={formRef}
      className="max-w-2xl mx-auto py-4 sm:py-8"
    >
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <button
            type="button"
            onClick={() => router.back()}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 mb-2 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Kembali
          </button>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
            Tambah Barang Baru
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Isi identitas barang dan lampirkan bukti kepemilikan Anda
          </p>
        </div>
      </div>

      {error && (
        <div
          className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg text-sm"
          role="alert"
        >
          {error}
        </div>
      )}

      <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-6">
        <fieldset>
          <legend className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <FileText className="w-5 h-5 text-gray-500" />
            Informasi Dasar
          </legend>
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Nama Barang <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                placeholder="Contoh: MacBook Pro M3 Max"
              />
            </div>

            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                Kategori <span className="text-red-500">*</span>
              </label>
              <select
                id="category"
                name="category"
                required
                className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors bg-white"
              >
                <option value="" disabled>
                  Pilih kategori
                </option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="brand" className="block text-sm font-medium text-gray-700 mb-1">
                  Merek
                </label>
                <input
                  type="text"
                  id="brand"
                  name="brand"
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="Contoh: Apple"
                />
              </div>
              <div>
                <label htmlFor="serialNumber" className="block text-sm font-medium text-gray-700 mb-1">
                  Nomor Seri
                </label>
                <input
                  type="text"
                  id="serialNumber"
                  name="serialNumber"
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="Contoh: C02XXXXXXXXX"
                />
              </div>
            </div>
          </div>
        </fieldset>

        {/* Detail Pembelian */}
        <fieldset>
          <legend className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Image className="w-5 h-5 text-gray-500" />
            Detail Pembelian
          </legend>
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="purchaseDate" className="block text-sm font-medium text-gray-700 mb-1">
                  Tanggal Beli
                </label>
                <input
                  type="date"
                  id="purchaseDate"
                  name="purchaseDate"
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                />
              </div>
              <div>
                <label htmlFor="purchasePrice" className="block text-sm font-medium text-gray-700 mb-1">
                  Harga Beli (Rp)
                </label>
                <input
                  type="number"
                  id="purchasePrice"
                  name="purchasePrice"
                  min="0"
                  step="1000"
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="Contoh: 65000000"
                />
              </div>
            </div>

            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                Lokasi Penyimpanan
              </label>
              <input
                type="text"
                id="location"
                name="location"
                className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                placeholder="Contoh: Kamar Utama - Laci Meja Kanan"
              />
            </div>

            <div>
              <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
                Catatan
              </label>
              <textarea
                id="notes"
                name="notes"
                rows={3}
                className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none"
                placeholder="Catatan tambahan (garansi, kondisi, dll)"
              />
            </div>
          </div>
        </fieldset>

        {/* Foto Barang */}
        <fieldset>
          <legend className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Image className="w-5 h-5 text-gray-500" />
            Foto Barang
          </legend>
          <div className="space-y-4">
            <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-slate-300 rounded-xl cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-colors group">
              <div className="flex flex-col items-center gap-2 text-gray-500 group-hover:text-blue-500">
                <Plus className="w-8 h-8" />
                <span className="text-sm font-medium">Klik atau tarik foto ke sini</span>
                <span className="text-xs text-gray-400">Maksimal 5 foto (JPG, PNG, WebP)</span>
              </div>
              <input
                type="file"
                name="photos"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                className="hidden"
                id="photos"
              />
            </label>

            {previewImages.length > 0 && (
              <div className="flex flex-wrap gap-3">
                {previewImages.map((preview, index) => (
                  <div key={index} className="relative group w-24 h-24">
                    <img
                      src={preview}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-full object-cover rounded-lg border border-slate-200"
                    />
                    <button
                      type="button"
                      onClick={() => removePreview(index)}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-rose-500 text-white rounded-full flex items-center justify-center opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity hover:bg-rose-600 shadow-xs cursor-pointer"
                      aria-label="Hapus foto"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    <span className="absolute bottom-1 right-1 bg-black/60 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                      {index + 1}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </fieldset>

        {/* Dokumen Pendukung */}
        <fieldset>
          <legend className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <FileText className="w-5 h-5 text-gray-500" />
            Dokumen Pendukung (Struk/Garansi/Sertifikat)
          </legend>
          <div className="space-y-3">
            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-slate-300 rounded-xl cursor-pointer hover:border-gray-900 hover:bg-slate-50 transition-colors group">
              <div className="flex flex-col items-center gap-2 text-gray-500 group-hover:text-gray-900">
                <FileText className="w-8 h-8" />
                <span className="text-sm font-medium">Upload dokumen (PDF, JPG, PNG)</span>
                <span className="text-xs text-gray-400">Maksimal 10MB</span>
              </div>
              <input
                type="file"
                name="documents"
                accept=".pdf,image/*"
                onChange={handleDocumentChange}
                className="hidden"
                id="documents"
              />
            </label>
            {documentName && (
              <p className="text-sm text-emerald-600 font-semibold flex items-center gap-1.5 bg-emerald-50 p-2.5 rounded-lg border border-emerald-200">
                <FileText className="w-4 h-4" /> {documentName}
              </p>
            )}
          </div>
        </fieldset>

        {/* Action Buttons - Stacked on Mobile, Row on Desktop */}
        <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-4 border-t border-slate-200">
          <button
            type="button"
            onClick={() => router.back()}
            className="w-full sm:w-auto px-6 py-2.5 text-sm font-semibold text-gray-700 bg-white border border-slate-300 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer text-center"
          >
            Batal
          </button>
          <button
            type="submit"
            disabled={loading}
            className="w-full sm:w-auto px-6 py-2.5 text-sm font-semibold text-white bg-gray-900 rounded-xl hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Menyimpan...
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" />
                Simpan Barang
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  );
}
