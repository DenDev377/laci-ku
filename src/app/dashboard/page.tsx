
import Card from "@/components/dashboard/Card"
import { Package, DollarSign, Folders, FileText } from "lucide-react";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import type { Metadata } from "next";


export const metadata: Metadata = {
    title: "Laci — Laci Digital untuk Barang Berhargamu",
    description:
        "Catat barang berharga, unggah foto & struk, dan simpan bukti kepemilikan di satu tempat. Tenang kalau suatu saat hilang.",
};

export default async function DahsboardPage() {
    const session = await getServerSession(authOptions);
    const userName = session?.user?.name || "Banyak"
    const dummyRecentItems = [
        {
            id: "item_01",
            name: "MacBook Pro M3 Max",
            category: "ELEKTRONIK",
            brand: "Apple",
            purchasePrice: 65000000,
            purchaseDate: new Date("2024-01-15"),
            location: "Kamar Utama - Laci Meja",
            photos: [
                { id: "img_01", url: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=80" },
            ],
            createdAt: new Date("2024-02-10T08:00:00Z"),
        },
        {
            id: "item_02",
            name: "Cincin Emas Putih 18K",
            category: "PERHIASAN",
            brand: "Frank & Co",
            purchasePrice: 24500000,
            purchaseDate: new Date("2023-11-20"),
            location: "Brankas Bawah Tangga",
            photos: [
                { id: "img_02", url: "https://images.unsplash.com/photo-1605100804763-247f66150ce8?w=800&q=80" },
            ],
            createdAt: new Date("2024-02-11T09:30:00Z"),
        },
        {
            id: "item_03",
            name: "BPKB Honda HRV RS",
            category: "DOKUMEN",
            brand: "Honda",
            purchasePrice: null, // Dokumen biasanya tidak ada harga belinya
            purchaseDate: new Date("2022-05-10"),
            location: "Lemari Dokumen (Map Merah)",
            photos: [
                { id: "img_03", url: "https://images.unsplash.com/photo-1588523793610-85fbdcd5ae0a?w=800&q=80" }, // Foto ilustrasi dokumen
            ],
            createdAt: new Date("2024-02-12T14:20:00Z"),
        },
    ];

    const statCard = [
        {
            label: "Total Barang",
            value: 12,
            icon: <Package className="w-5 h-5" />,
            trend: { value: "+2 Bulan ini", isPositive: true },
            description: "Seluruh inventaris Anda"
        },

        {
            label: "Estimasi Nilai",
            value: "Rp 24.5 Juta",
            icon: <DollarSign className="w-5 h-5" />,
            trend: { value: "+12% dari lalu", isPositive: true },
            description: "Berdasarkan harga pembelian"
        },


        {
            label: "Kategori Barang",
            value: "8",
            icon: <Folders className="w-5 h-5" />,
            description: "Grup barang yang dicatat"
        },
        {
            label: "Total Dokumen",
            value: "4",
            icon: <FileText className="w-5 h-5" />,
            trend: { value: "Ingat Simpan Struk!", isPositive: false },
            description: "Garansi & Bukti Pembelian"
        }
    ]
    return (
        <div className="flex flex-col w-full mx-auto px-4 sm:px-6 md:px-8">
            <h1 className="text-3xl text-gray-900 tracking-tight">Dashboard</h1>
            <div className="mt-2 text-gray-700">
                <p>
                    Halo {userName} , kamu punya totalbarang tercatat.
                </p>
            </div>

            <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-4">
                {statCard.map((stat) => (
                    <Card
                        key={stat.label}
                        label={stat.label}
                        value={stat.value}
                        icon={stat.icon}
                        trend={stat.trend}
                        description={stat.description}
                    />
                ))}

            </div>

            <div className="mt-16">
                <div className="bg-white rounded-xl border border-slate-200">
                    <div className="w-full mx-auto p-6">
                        <div className="flex flex-col gap-4">
                            {dummyRecentItems.map((item) => (
                                <div key={item.id} className="flex flex-col sm:flex-row items-start sm:items-center p-4 border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors gap-5">
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
            </div>
        </div>
    )

}