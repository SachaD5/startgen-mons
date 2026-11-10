import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import MapSection from "@/components/MapSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
      <div className="min-h-screen bg-[#1E1E1E] text-white">
        {/* 1. Barre de navigation avec logo */}
        <Navbar />

        {/* 2. Section Hero (Titre & Description) */}
        <Hero />

        {/* 3. Section Carte & Réseau des antennes */}
        <MapSection />

        {/* 4. Footer */}
        <Footer />
      </div>
  );
}
