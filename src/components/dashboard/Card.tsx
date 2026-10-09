"use client";
import { CardProps } from "../../types/Card";
import { TrendingUp, TrendingDown } from "lucide-react";

export default function Card({
  label,
  value,
  icon,
  description,
  trend,
}: CardProps) {
  return (
    <div className="relative bg-white rounded-2xl p-6 shadow-sm border border-slate-100/80 hover:shadow-md hover:border-slate-200 transition-all duration-300 group overflow-hidden">
      {/* Ambient Background Blur on Hover */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-slate-200 to-transparent opacity-0 group-hover:opacity-30 transition-opacity rounded-full blur-2xl pointer-events-none duration-500" />

      <div className="flex justify-between items-start mb-4 relative z-10">
        <p className="text-sm font-semibold text-slate-500 tracking-wide">
          {label}
        </p>
        {icon && (
          <div className="p-2 bg-slate-50 text-slate-600 rounded-xl group-hover:bg-gray-900 group-hover:text-white transition-colors duration-300 shadow-sm border border-slate-100">
            {icon}
          </div>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-y-2 gap-x-3 relative z-10 mt-1 min-w-0">
        <h3
          className="text-2xl font-bold tracking-tight text-gray-900 truncate"
          title={String(value)}
        >
          {value}
        </h3>

        {trend && (
          <div
            className={`flex items-center gap-1.5 text-xs font-bold px-2 py-0.5 rounded-full ${
              trend.isPositive
                ? "bg-emerald-50 text-emerald-600 border border-emerald-100"
                : "bg-rose-50 text-rose-600 border border-rose-100"
            }`}
          >
            {trend.isPositive ? (
              <TrendingUp className="w-3.5 h-3.5" strokeWidth={2.5} />
            ) : (
              <TrendingDown className="w-3.5 h-3.5" strokeWidth={2.5} />
            )}
            {trend.value}
          </div>
        )}
      </div>

      {description && (
        <p className="mt-3 text-xs text-slate-400 font-medium relative z-10">
          {description}
        </p>
      )}
    </div>
  );
}
