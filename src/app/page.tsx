import LandingNavbar from "@/components/landing/LandingNavbar";
import HeroSection from "@/components/landing/HeroSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import CategoryShowcase from "@/components/landing/CategoryShowcase";
import SecuritySection from "@/components/landing/SecuritySection";
import CtaSection from "@/components/landing/CtaSection";
import LandingFooter from "@/components/landing/LandingFooter";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "LaciKu — Brankas Digital Barang Berharga, Struk & Garansi",
  description:
    "Catat barang berharga, simpan nomor seri, unggah foto fisik & struk kasir sebelum pudar, dan simpan kartu garansi di satu brankas digital yang aman.",
};

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900 selection:bg-emerald-100 selection:text-emerald-900">
      {/* Top Navbar */}
      <LandingNavbar />

      {/* Main Content Area */}
      <main className="flex-1 w-full">
        {/* Hero Section */}
        <HeroSection />

        {/* Feature Highlights */}
        <FeaturesSection />

        {/* How It Works (3 Steps) */}
        <HowItWorksSection />

        {/* Category Breakdown */}
        <CategoryShowcase />

        {/* Security & Privacy */}
        <SecuritySection />

        {/* Bottom CTA Banner */}
        <CtaSection />
      </main>

      {/* Footer */}
      <LandingFooter />
    </div>
  );
}
