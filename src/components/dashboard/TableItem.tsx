"use client";

import { ItemProps } from "@/types/Items";
import {
  Edit,
  Trash2,
  Image as ImageIcon,
  Plus,
  Search,
  RotateCcw,
  MapPin,
  Tag,
  Calendar,
  Copy,
  Check,
  FileText,
  Loader2,
  Package,
} from "lucide-react";
import { deleteItem } from "@/actions/itemsAction";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

const CATEGORIES = [
  { label: "Semua", value: "" },
  { label: "Elektronik", value: "ELEKTRONIK" },
  { label: "Kendaraan", value: "KENDARAAN" },
  { label: "Perhiasan", value: "PERHIASAN" },
  { label: "Dokumen", value: "DOKUMEN" },
  { label: "Furnitur", value: "FURNITUR" },
  { label: "Lainnya", value: "LAINNYA" },
];

export default function TableItem({
  dataItem,
  searchQuery,
  selectedCategory,
}: ItemProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  async function handleDeleteItem(itemId: string, itemName: string) {
    const confirmDelete = window.confirm(
      `Hapus "${itemName}" dari LaciKu? Tindakan ini tidak dapat dibatalkan.`
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

  const handleCopySerial = (serial: string, id: string) => {
    navigator.clipboard.writeText(serial);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleCategoryFilter = (categoryValue: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (categoryValue) {
      params.set("category", categoryValue);
    } else {
      params.delete("category");
    }
    const query = params.toString();
    router.push(query ? `/dashboard/items?${query}` : "/dashboard/items");
  };

  const formatPrice = (price: number | null) => {
    if (price === null || price === undefined) return "Dokumen";
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (date: Date | string | null) => {
    if (!date) return "-";
    return new Date(date).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="w-full mt-4">
      {/* Category Pills Filter Bar - Horizontally Scrollable on Mobile */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 pt-1 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
        {CATEGORIES.map((cat) => {
          const isActive =
            (!selectedCategory && cat.value === "") ||
            selectedCategory === cat.value;

          return (
            <button
              key={cat.label}
              onClick={() => handleCategoryFilter(cat.value)}
              className={`whitespace-nowrap px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all shrink-0 cursor-pointer ${
                isActive
                  ? "bg-gray-900 text-white shadow-xs"
                  : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Active Filter / Search Banner */}
      {(searchQuery || selectedCategory) && (
        <div className="my-4 flex flex-wrap items-center justify-between gap-3 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-700">
          <div className="flex items-center gap-2">
            <Search className="w-4 h-4 text-slate-500 shrink-0" />
            <span>
              Menampilkan <strong>{dataItem.length}</strong> barang{" "}
              {searchQuery && (
                <>
                  untuk &ldquo;<strong>{searchQuery}</strong>&rdquo;
                </>
              )}
              {selectedCategory && (
                <>
                  {" "}
                  di kategori <strong>{selectedCategory}</strong>
                </>
              )}
            </span>
          </div>
          <button
            onClick={() => router.push("/dashboard/items")}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-slate-950 bg-white border border-slate-200 px-3 py-1.5 rounded-lg hover:bg-slate-100 transition-colors shadow-2xs"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset Filter
          </button>
        </div>
      )}

      {/* Empty State */}
      {dataItem.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-14 text-center mt-4 shadow-xs">
          {searchQuery || selectedCategory ? (
            <>
              <div className="w-16 h-16 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">
                Tidak ada barang yang cocok
              </h3>
              <p className="text-slate-500 mb-6 max-w-sm mx-auto text-sm leading-relaxed">
                Tidak ditemukan barang dengan filter saat ini. Coba gunakan kata
                kunci lain atau reset filter.
              </p>
              <button
                onClick={() => router.push("/dashboard/items")}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold text-slate-700 bg-slate-100 rounded-full hover:bg-slate-200 transition-colors"
              >
                <RotateCcw className="w-4 h-4" /> Reset Pencarian
              </button>
            </>
          ) : (
            <>
              <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-4">
                <Package className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">
                Laci Anda Masih Kosong
              </h3>
              <p className="text-slate-500 mb-6 max-w-sm mx-auto text-sm leading-relaxed">
                Mulai catat barang berharga, nomor seri, dan simpan struk garansi
                pertama Anda sekarang.
              </p>
              <Link
                href="/dashboard/addItem"
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-gray-900 rounded-full hover:bg-gray-800 transition-all shadow-md shadow-gray-900/10"
              >
                <Plus className="w-4 h-4" /> Tambah Barang Sekarang
              </Link>
            </>
          )}
        </div>
      ) : (
        <>
          {/* MOBILE CARD LIST VIEW (Block on mobile, hidden on md+) */}
          <div className="block md:hidden space-y-3.5 mt-2">
            {dataItem.map((item) => {
              const photoUrl = item.photos?.[0]?.url;
              return (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-xs transition-shadow hover:shadow-md"
                >
                  {/* Top Header: Image, Title, Brand & Price */}
                  <div className="flex items-start gap-3.5">
                    <div className="shrink-0 w-16 h-16 rounded-xl bg-slate-100 border border-slate-200/80 overflow-hidden flex items-center justify-center relative">
                      {photoUrl ? (
                        <img
                          src={photoUrl}
                          alt={item.name}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      ) : (
                        <ImageIcon className="w-6 h-6 text-slate-300" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <span className="text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                          {item.category}
                        </span>
                        <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                          {formatPrice(item.purchasePrice)}
                        </span>
                      </div>

                      <h3 className="text-base font-bold text-gray-900 leading-snug truncate">
                        {item.name}
                      </h3>

                      <p className="text-xs text-slate-500 mt-0.5 truncate">
                        Merek:{" "}
                        <span className="font-semibold text-slate-700">
                          {item.brand || "-"}
                        </span>
                      </p>
                    </div>
                  </div>

                  {/* Metadata Chips (Serial, Location, Date) */}
                  <div className="mt-3.5 pt-3 border-t border-slate-100 grid grid-cols-2 gap-2 text-xs text-slate-600">
                    {/* Serial number */}
                    <div className="col-span-2 sm:col-span-1 bg-slate-50 p-2 rounded-lg flex items-center justify-between">
                      <div className="flex items-center gap-1.5 min-w-0">
                        <Tag className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="font-mono text-[11px] truncate text-slate-800">
                          SN: {item.serialNumber || "-"}
                        </span>
                      </div>
                      {item.serialNumber && (
                        <button
                          onClick={() =>
                            handleCopySerial(item.serialNumber!, item.id)
                          }
                          className="text-slate-400 hover:text-slate-800 p-1"
                          title="Salin Nomor Seri"
                        >
                          {copiedId === item.id ? (
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      )}
                    </div>

                    {/* Location */}
                    <div className="bg-slate-50 p-2 rounded-lg flex items-center gap-1.5 truncate">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="text-[11px] truncate">
                        {item.location || "Lokasi -"}
                      </span>
                    </div>

                    {/* Purchase Date */}
                    <div className="bg-slate-50 p-2 rounded-lg flex items-center gap-1.5 truncate">
                      <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="text-[11px] truncate">
                        {formatDate(item.purchaseDate)}
                      </span>
                    </div>
                  </div>

                  {/* Bottom Action Buttons (Touch Friendly) */}
                  <div className="mt-3.5 pt-3 border-t border-slate-100 flex items-center gap-2">
                    <button
                      onClick={() =>
                        router.push(`/dashboard/editItem/${item.id}`)
                      }
                      className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition-colors cursor-pointer"
                    >
                      <Edit className="w-3.5 h-3.5" />
                      Edit Barang
                    </button>
                    <button
                      onClick={() => handleDeleteItem(item.id, item.name)}
                      disabled={deleteId === item.id}
                      className="inline-flex items-center justify-center p-2.5 rounded-xl border border-rose-200 text-rose-600 hover:bg-rose-50 text-xs font-semibold transition-colors disabled:opacity-50 cursor-pointer"
                      title="Hapus Barang"
                      aria-label="Hapus Barang"
                    >
                      {deleteId === item.id ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Trash2 className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* DESKTOP TABLE VIEW (Hidden on mobile, visible on md+) */}
          <div className="hidden md:block bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs mt-3">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-slate-50/80">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider"
                    >
                      Item &amp; Lokasi
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider"
                    >
                      Merek &amp; SN
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider"
                    >
                      Kategori
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider"
                    >
                      Harga Beli
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3.5 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider"
                    >
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-100">
                  {dataItem.map((item) => {
                    const photoUrl = item.photos?.[0]?.url;
                    return (
                      <tr
                        key={item.id}
                        className="hover:bg-slate-50/70 transition-colors group"
                      >
                        {/* Name & Location */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-3.5">
                            <div className="shrink-0 h-11 w-11 bg-slate-100 rounded-xl overflow-hidden flex items-center justify-center border border-slate-200/80">
                              {photoUrl ? (
                                <img
                                  className="h-full w-full object-cover"
                                  src={photoUrl}
                                  alt={item.name}
                                  loading="lazy"
                                />
                              ) : (
                                <ImageIcon className="w-5 h-5 text-slate-300" />
                              )}
                            </div>
                            <div className="min-w-0">
                              <div className="text-sm font-bold text-gray-900 group-hover:text-emerald-700 transition-colors truncate max-w-xs">
                                {item.name}
                              </div>
                              <div className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                                <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                                <span className="truncate max-w-[180px]">
                                  {item.location || "Lokasi belum dicatat"}
                                </span>
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* Brand & Serial Number */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-800">
                            {item.brand || "-"}
                          </div>
                          <div className="text-xs font-mono text-slate-400 mt-0.5 flex items-center gap-1.5">
                            <span className="truncate max-w-[140px]">
                              {item.serialNumber || "No SN"}
                            </span>
                            {item.serialNumber && (
                              <button
                                onClick={() =>
                                  handleCopySerial(item.serialNumber!, item.id)
                                }
                                className="text-slate-400 hover:text-slate-700 p-0.5"
                                title="Salin Serial Number"
                              >
                                {copiedId === item.id ? (
                                  <Check className="w-3 h-3 text-emerald-600" />
                                ) : (
                                  <Copy className="w-3 h-3" />
                                )}
                              </button>
                            )}
                          </div>
                        </td>

                        {/* Category */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2.5 py-1 inline-flex text-xs font-semibold rounded-md bg-slate-100 text-slate-700 border border-slate-200">
                            {item.category}
                          </span>
                        </td>

                        {/* Purchase Price */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm font-semibold text-gray-900">
                            {formatPrice(item.purchasePrice)}
                          </span>
                          {item.purchaseDate && (
                            <div className="text-[11px] text-slate-400">
                              {formatDate(item.purchaseDate)}
                            </div>
                          )}
                        </td>

                        {/* Action buttons */}
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                              title="Edit"
                              onClick={() =>
                                router.push(`/dashboard/editItem/${item.id}`)
                              }
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              disabled={deleteId === item.id}
                              className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors disabled:opacity-50 cursor-pointer"
                              title="Hapus"
                              onClick={() =>
                                handleDeleteItem(item.id, item.name)
                              }
                            >
                              {deleteId === item.id ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                              ) : (
                                <Trash2 className="w-4 h-4" />
                              )}
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
