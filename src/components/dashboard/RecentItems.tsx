"use client";

import { DataRecentItemsProps } from "@/types/Items";
import { Image as ImageIcon, ArrowRight, Package, Clock, MapPin } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RecentItems({
  dataRecentItems,
  totalItemsCount,
}: DataRecentItemsProps) {
  const router = useRouter();

  const formatPrice = (price: number | null) => {
    if (price === null || price === undefined) return "Dokumen";
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
      {/* Header with Title and "Lihat Semua" Link */}
      <div className="p-4 sm:p-6 border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center">
            <Clock className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-gray-900 leading-tight">
              Barang Terakhir Ditambahkan
            </h2>
            <p className="text-xs text-slate-400 mt-0.5 hidden sm:block">
              Akses cepat barang yang baru saja Anda arsipkan
            </p>
          </div>
        </div>

        <Link
          href="/dashboard/items"
          className="inline-flex items-center gap-1 text-xs sm:text-sm font-semibold text-slate-700 hover:text-emerald-700 transition-colors py-1 px-2.5 rounded-lg hover:bg-slate-50"
        >
          Lihat Semua {totalItemsCount ? `(${totalItemsCount})` : ""}
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Item List / Empty state */}
      <div className="p-4 sm:p-6">
        {dataRecentItems.length === 0 ? (
          <div className="py-8 text-center">
            <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-3">
              <Package className="w-6 h-6" />
            </div>
            <p className="text-sm font-medium text-gray-700">Belum ada barang yang dicatat</p>
            <p className="text-xs text-slate-400 mt-1 mb-4">
              Mulai catat barang berharga Anda ke dalam LaciKu.
            </p>
            <Link
              href="/dashboard/addItem"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-gray-900 text-white text-xs font-semibold hover:bg-gray-800 transition-all shadow-xs"
            >
              Tambah Barang Pertama
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-3">
            {dataRecentItems.map((item) => {
              const photoUrl = item.photos?.[0]?.url;

              return (
                <div
                  key={item.id}
                  onClick={() => router.push(`/dashboard/editItem/${item.id}`)}
                  className="group flex items-center justify-between p-3.5 sm:p-4 rounded-xl border border-slate-100 hover:border-slate-300 hover:bg-slate-50/70 transition-all duration-200 cursor-pointer gap-3 sm:gap-4"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    {/* Thumbnail */}
                    <div className="shrink-0 w-14 h-14 sm:w-16 sm:h-16 bg-slate-100 rounded-xl overflow-hidden border border-slate-200/80 flex items-center justify-center relative">
                      {photoUrl ? (
                        <img
                          src={photoUrl}
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                      ) : (
                        <ImageIcon className="w-6 h-6 text-slate-300" />
                      )}
                    </div>

                    {/* Information */}
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md">
                          {item.category}
                        </span>
                        {item.brand && (
                          <span className="text-xs text-slate-400 font-medium truncate hidden sm:inline">
                            • {item.brand}
                          </span>
                        )}
                      </div>
                      <h3 className="text-sm sm:text-base font-bold text-gray-900 group-hover:text-emerald-700 transition-colors truncate">
                        {item.name}
                      </h3>
                      <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
                        <span className="flex items-center gap-1 truncate">
                          <MapPin className="w-3 h-3 text-slate-400" />
                          {item.location || "Lokasi belum dicatat"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Price and Arrow */}
                  <div className="text-right shrink-0 flex items-center gap-2 sm:gap-3">
                    <div>
                      <span className="text-xs sm:text-sm font-bold text-gray-900 block">
                        {formatPrice(item.purchasePrice)}
                      </span>
                      <span className="text-[10px] text-slate-400 hidden sm:block">
                        {item.purchaseDate
                          ? new Date(item.purchaseDate).toLocaleDateString("id-ID", {
                              day: "numeric",
                              month: "short",
                            })
                          : "Tercatat"}
                      </span>
                    </div>
                    <div className="w-7 h-7 rounded-lg bg-slate-100 text-slate-400 group-hover:bg-gray-900 group-hover:text-white flex items-center justify-center transition-colors">
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
