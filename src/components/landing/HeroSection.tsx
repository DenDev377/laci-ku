"use client";

import Link from "next/link";
import {
  ShieldCheck,
  ArrowRight,
  Sparkles,
  Receipt,
  FileCheck2,
  Lock,
  Laptop,
  CheckCircle2,
  Copy,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  Package,
} from "lucide-react";
import { useState } from "react";

export default function HeroSection() {
  const [copied, setCopied] = useState(false);

  const handleCopySerial = () => {
    navigator.clipboard.writeText("C02ZT14KMD6T");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative overflow-hidden pt-12 pb-24 md:pt-20 md:pb-32 bg-gradient-to-b from-slate-50 via-white to-slate-50/50">
      {/* Ambient background glow elements */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[550px] bg-gradient-to-tr from-emerald-100/40 via-teal-100/30 to-blue-100/20 rounded-full blur-3xl -z-10 pointer-events-none opacity-80"
        aria-hidden="true"
      />
      <div
        className="absolute top-1/3 -left-32 w-80 h-80 bg-emerald-200/20 rounded-full blur-3xl -z-10 pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute top-1/4 -right-32 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl -z-10 pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Announcement Pill */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border border-slate-200/80 shadow-xs text-xs font-medium text-slate-700 backdrop-blur-sm transition-all hover:border-slate-300">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-semibold text-gray-900">LaciKu v2.0</span>
            <span className="text-slate-300">|</span>
            <span>Brankas Digital Bukti Kepemilikan & Struk Garansi</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          </div>
        </div>

        {/* Main Headline */}
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-950 leading-[1.12]">
            Catat Barang Berharga,{" "}
            <span className="relative whitespace-nowrap">
              <span className="bg-gradient-to-r from-gray-950 via-slate-800 to-emerald-700 bg-clip-text text-transparent">
                Simpan Struk & Garansi
              </span>
              <svg
                aria-hidden="true"
                viewBox="0 0 418 11"
                fill="none"
                className="absolute -bottom-1 left-0 w-full text-emerald-400/50 -z-10"
              >
                <path
                  d="M0 6.5C139.333 1.5 278.667 1.5 418 6.5"
                  stroke="currentColor"
                  strokeWidth="6"
                  strokeLinecap="round"
                />
              </svg>
            </span>{" "}
            di Satu Tempat.
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Struk thermal kasir memudar dalam hitungan bulan. Amankan nomor seri, foto fisik, dan
            kartu garansi seluruh barang berhargamu di <strong>LaciKu</strong>. Tenang saat butuh
            klaim asuransi atau jika terjadi kehilangan.
          </p>

          {/* Action CTAs */}
          <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/auth/register"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-gray-900 hover:bg-gray-800 text-white font-semibold text-base shadow-lg shadow-gray-900/15 hover:shadow-xl hover:shadow-gray-900/20 hover:-translate-y-0.5 transition-all duration-200"
            >
              Mulai Catat Sekarang — Gratis
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/dashboard"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white hover:bg-slate-50 text-gray-800 font-semibold text-base border border-slate-200 shadow-xs hover:border-slate-300 transition-all duration-200"
            >
              <Sparkles className="w-4 h-4 text-emerald-600" />
              Buka Dashboard Demo
            </Link>
          </div>

          {/* Trust points */}
          <div className="mt-10 pt-6 border-t border-slate-200/60 flex flex-wrap items-center justify-center gap-y-3 gap-x-8 text-xs sm:text-sm text-slate-500">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>100% Gratis Digunakan</span>
            </div>
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-emerald-600" />
              <span>Privasi Terlindungi & Terenkripsi</span>
            </div>
            <div className="flex items-center gap-2">
              <Receipt className="w-4 h-4 text-emerald-600" />
              <span>Struk & Garansi Anti-Hilang</span>
            </div>
          </div>
        </div>

        {/* Hero Visual Showcase: Interactive Product Card & Floating Badges */}
        <div className="mt-16 sm:mt-20 relative max-w-5xl mx-auto">
          {/* Subtle Outer Glow & Frame */}
          <div className="relative rounded-3xl bg-gradient-to-b from-slate-200 via-slate-100 to-slate-200 p-2 sm:p-3 shadow-2xl shadow-slate-900/10">
            {/* The Main Mockup Container */}
            <div className="rounded-2xl bg-white border border-slate-200/90 overflow-hidden shadow-inner">
              {/* Window Bar Header */}
              <div className="h-12 bg-slate-50/90 border-b border-slate-200 px-5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-400/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-400/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-400/80" />
                  <span className="ml-3 text-xs font-mono text-slate-400 hidden sm:inline">
                    laciku.app/dashboard/items/detail-01
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                    Terverifikasi
                  </span>
                </div>
              </div>

              {/* Mockup Body: Two Columns */}
              <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-radial from-white via-white to-slate-50/50">
                {/* Column 1: Featured Item Preview */}
                <div className="lg:col-span-7 space-y-6">
                  {/* Category Pill + Title */}
                  <div>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold mb-3">
                      <Laptop className="w-3.5 h-3.5" />
                      ELEKTRONIK & GADGET
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
                      MacBook Pro 16&quot; (M3 Pro, 36GB RAM)
                    </h2>
                    <p className="text-sm text-slate-500 mt-1">
                      Brand: <span className="font-semibold text-slate-700">Apple</span> • Lokasi:{" "}
                      <span className="font-medium text-slate-700">Meja Studio Kerja</span>
                    </p>
                  </div>

                  {/* Serial Number & Verification box */}
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                        Nomor Seri (Serial Number)
                      </span>
                      <span className="font-mono text-base font-bold text-slate-900 tracking-wide">
                        C02ZT14KMD6T
                      </span>
                    </div>
                    <button
                      onClick={handleCopySerial}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-colors shadow-2xs self-start sm:self-auto cursor-pointer"
                    >
                      <Copy className="w-3.5 h-3.5 text-slate-400" />
                      {copied ? "Tersalin!" : "Salin SN"}
                    </button>
                  </div>

                  {/* Pricing and Purchase Date */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3.5 rounded-xl bg-emerald-50/60 border border-emerald-100">
                      <span className="text-xs text-emerald-800 font-medium block">
                        Harga Pembelian
                      </span>
                      <span className="text-xl sm:text-2xl font-extrabold text-emerald-950 mt-0.5 block">
                        Rp 38.999.000
                      </span>
                    </div>
                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                      <span className="text-xs text-slate-500 font-medium block">
                        Tanggal Pembelian
                      </span>
                      <span className="text-base sm:text-lg font-bold text-slate-800 mt-0.5 block">
                        14 Maret 2024
                      </span>
                    </div>
                  </div>

                  {/* Documents & Receipts attached */}
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
                      Dokumen Pendukung Tersimpan (2)
                    </span>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-3 rounded-xl border border-slate-200 hover:border-slate-300 bg-white transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
                            <Receipt className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-slate-900 leading-tight">
                              Invoice Resmi Pembelian iBox.pdf
                            </p>
                            <span className="text-xs text-slate-400">
                              Struk Kasir Asli • Format PDF • 1.4 MB
                            </span>
                          </div>
                        </div>
                        <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md">
                          Aman
                        </span>
                      </div>

                      <div className="flex items-center justify-between p-3 rounded-xl border border-slate-200 hover:border-slate-300 bg-white transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                            <FileCheck2 className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-slate-900 leading-tight">
                              Sertifikat AppleCare+ Coverage
                            </p>
                            <span className="text-xs text-slate-400">
                              Garansi Resmi Berlaku s/d Mar 2027
                            </span>
                          </div>
                        </div>
                        <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded-md">
                          Aktif
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Column 2: Live Portfolio Widget Preview */}
                <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 text-white p-6 sm:p-7 rounded-2xl shadow-xl flex flex-col justify-between space-y-6">
                  <div>
                    <div className="flex items-center justify-between pb-4 border-b border-slate-700/60">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                          <Package className="w-4 h-4" />
                        </div>
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                          Ringkasan Brankas
                        </span>
                      </div>
                      <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                        <TrendingUp className="w-3.5 h-3.5" />
                        Sinkron Cloud
                      </span>
                    </div>

                    <div className="mt-5">
                      <span className="text-xs text-slate-400">Total Estimasi Nilai Aset</span>
                      <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-1">
                        Rp 148.650.000
                      </div>
                      <span className="text-xs text-slate-400 mt-1 block">
                        Tersebar di <span className="text-emerald-400 font-bold">18 Barang</span> &{" "}
                        <span className="text-blue-400 font-bold">24 Dokumen Bukti</span>
                      </span>
                    </div>

                    {/* Breakdown bars */}
                    <div className="mt-6 space-y-3">
                      <div>
                        <div className="flex justify-between text-xs font-medium text-slate-300 mb-1">
                          <span>Elektronik (8 barang)</span>
                          <span className="font-bold text-white">Rp 74.500.000</span>
                        </div>
                        <div className="w-full bg-slate-800 rounded-full h-2">
                          <div className="bg-emerald-500 h-2 rounded-full w-[65%]" />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-xs font-medium text-slate-300 mb-1">
                          <span>Kendaraan & Dokumen (3 barang)</span>
                          <span className="font-bold text-white">Rp 48.000.000</span>
                        </div>
                        <div className="w-full bg-slate-800 rounded-full h-2">
                          <div className="bg-blue-500 h-2 rounded-full w-[42%]" />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-xs font-medium text-slate-300 mb-1">
                          <span>Perhiasan & Lainnya (7 barang)</span>
                          <span className="font-bold text-white">Rp 26.150.000</span>
                        </div>
                        <div className="w-full bg-slate-800 rounded-full h-2">
                          <div className="bg-amber-400 h-2 rounded-full w-[28%]" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Vault Protection Status */}
                  <div className="pt-4 border-t border-slate-700/60 bg-slate-800/40 -mx-3 -mb-3 p-4 rounded-xl flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <ShieldCheck className="w-5 h-5 text-emerald-400" />
                      <span className="text-xs font-semibold text-slate-200">
                        Keamanan Brankas Aktif
                      </span>
                    </div>
                    <Link
                      href="/dashboard"
                      className="text-xs font-bold text-emerald-400 hover:text-emerald-300 inline-flex items-center gap-1 group"
                    >
                      Buka Laci
                      <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Floating Highlight Badge 1 (Top Left) */}
          <div className="hidden md:flex absolute -top-6 -left-6 bg-white/95 backdrop-blur-md border border-slate-200/80 rounded-2xl p-4 shadow-xl shadow-slate-900/10 items-center gap-3 animate-bounce [animation-duration:4s]">
            <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center shadow-md shadow-emerald-500/20">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-900 leading-tight">
                Garansi Resmi Tersimpan
              </p>
              <p className="text-[11px] text-slate-500 mt-0.5">Notifikasi sebelum masa garansi habis</p>
            </div>
          </div>

          {/* Floating Highlight Badge 2 (Bottom Right) */}
          <div className="hidden md:flex absolute -bottom-6 -right-6 bg-white/95 backdrop-blur-md border border-slate-200/80 rounded-2xl p-4 shadow-xl shadow-slate-900/10 items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-500/20">
              <Receipt className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-900 leading-tight">
                Struk Thermal Anti-Pudar
              </p>
              <p className="text-[11px] text-slate-500 mt-0.5">Arsip foto beresolusi tinggi di cloud</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
