"use client";
import { ItemProps } from "@/types/Items";
import { Edit, Trash2, Image, Plus, Search, RotateCcw } from "lucide-react";
import { deleteItem } from "@/actions/itemsAction";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function TableItem({ dataItem, searchQuery }: ItemProps) {
  const router = useRouter();
  const [deleteId, setDeleteId] = useState<string | null>(null);

  async function handleDeleteItem(itemId: string) {
    const confirmDelete = window.confirm(
      "Apakah Anda yakin ingin menghapus item ini? Tindakan ini tidak dapat dibatalkan.",
    );
    if (!confirmDelete) return;

    setDeleteId(itemId);
    try {
      await deleteItem(itemId);
      router.refresh();
    } catch (err) {
      console.error("Gagal menghapus item:", err);
      alert(err instanceof Error ? err.message : "Gagal menghapus item");
    } finally {
      setDeleteId(null);
    }
  }
  

  return (
    <div className="mt-8">
      {searchQuery && (
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-700">
          <div className="flex items-center gap-2">
            <Search className="w-4 h-4 text-slate-500 shrink-0" />
            <span>
              Menampilkan <strong>{dataItem.length}</strong> barang untuk pencarian:{" "}
              <strong>&ldquo;{searchQuery}&rdquo;</strong>
            </span>
          </div>
          <button
            onClick={() => router.replace("/dashboard/items")}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 bg-white border border-slate-200 px-3 py-1.5 rounded-lg hover:bg-slate-100 transition-colors shadow-xs"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset Filter
          </button>
        </div>
      )}

      {dataItem.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
          {searchQuery ? (
            <>
              <Search className="w-16 h-16 mx-auto text-slate-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Tidak ada barang yang cocok
              </h3>
              <p className="text-gray-500 mb-6 max-w-md mx-auto text-sm">
                Tidak ditemukan barang dengan kata kunci &ldquo;{searchQuery}&rdquo;. Coba periksa ejaan atau gunakan kata kunci lain.
              </p>
              <button
                onClick={() => router.replace("/dashboard/items")}
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors"
              >
                <RotateCcw className="w-4 h-4" /> Reset Pencarian
              </button>
            </>
          ) : (
            <>
              <Image className="w-16 h-16 mx-auto text-slate-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Belum ada data barang
              </h3>
              <p className="text-gray-500 mb-6">
                Mulai dengan menambahkan barang berharga pertama Anda.
              </p>
              <a
                href="/dashboard/addItem"
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-4 h-4" /> Tambah Barang
              </a>
            </>
          )}
        </div>
      ) : (
        <div className="flex flex-col">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Nama Item
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Merek
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Kategori
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Harga Beli
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Aksi
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {dataItem.map((item) => (
                      <tr key={item.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="shrink-0 h-10 w-10 bg-slate-100 rounded-lg overflow-hidden flex items-center justify-center">
                              {item.photos?.[0]?.url ? (
                                <img
                                  className="h-10 w-10 object-cover"
                                  src={item.photos[0].url}
                                  alt={item.name}
                                />
                              ) : (
                                <Image className="w-6 h-6 text-slate-300" />
                              )}
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {item.name}
                              </div>
                              <div className="text-sm text-gray-500">
                                {item.location || "-"}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">
                            {item.brand || "-"}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {item.category}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            {item.purchasePrice
                              ? `Rp ${item.purchasePrice.toLocaleString("id-ID")}`
                              : "Dokumen"}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <button
                              className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              title="Edit"
                              onClick={() => router.push(`/dashboard/editItem/${item.id}`)}
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              disabled={deleteId === item.id}
                              className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                              title="Hapus"
                              onClick={() => handleDeleteItem(item.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
