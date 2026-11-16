// src/app/page.tsx
import Hero from "@/components/home/Hero";
import AboutSection from "@/components/home/AboutSection";
import MapSection from "@/components/home/MapSection";
import PartnersSection from "@/components/home/PartnersSection";

export default function HomePage() {
    return (
        <>
            <Hero />
            <AboutSection />
            <MapSection />
            <PartnersSection />
        </>
    );
}
