import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/components/AuthProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Laci — Laci Digital untuk Barang Berhargamu",
  description:
    "Catat barang berharga, unggah foto & struk, dan simpan bukti kepemilikan di satu tempat. Tenang kalau suatu saat hilang.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-gray-900">

        <AuthProvider>
          <main className="flex-1 w-full h-full">
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}
