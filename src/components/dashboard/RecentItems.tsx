"use client";

import { DataRecentItemsProps } from "@/types/Items";
export default function RecentItems({ dataRecentItems }: DataRecentItemsProps) {
  return (
    <div className="bg-white rounded-xl border border-slate-200">
      <div className="w-full mx-auto p-6">
        <div className="flex flex-col gap-4">
          {dataRecentItems.map((item) => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row items-start sm:items-center p-4 border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors gap-5"
            >
              <div className="shrink-0 w-24 h-24 sm:w-20 sm:h-20 bg-slate-200 rounded-lg overflow-hidden relative">
                <img
                  src={item.photos?.[0]?.url || "/placeholder-image.jpg"}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex flex-col flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-base font-semibold text-gray-900 truncate">
                    {item.name}
                  </h3>
                  <span className="text-[10px] bg-slate-200 text-slate-600 px-2 py-0.5 rounded-full font-bold tracking-wide">
                    {item.category}
                  </span>
                </div>

                <div className="flex items-center gap-3 text-sm text-gray-500 mt-1">
                  <span className="truncate">Merk: {item.brand || "-"}</span>
                  <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                  <span className="truncate">{item.location || "-"}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
