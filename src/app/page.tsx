// src/app/page.tsx : l'accueil. Chaque bloc est un composant ; le détail est sur les autres pages.
import { Suspense } from "react";
import Hero from "@/components/home/Hero";
import StatsBar from "@/components/home/StatsBar";
import Piliers from "@/components/home/Piliers";
import UpcomingEvents from "@/components/home/UpcomingEvents";
import ReseauBlock from "@/components/home/ReseauBlock";
import PartnersStrip from "@/components/home/PartnersStrip";
import JoinBand from "@/components/home/JoinBand";

export default function HomePage() {
    return (
        <>
            <Hero />
            <StatsBar />
            <Piliers />
            {/* Les événements viennent d'OpenAgenda : ils arrivent juste après le reste de la page */}
            <Suspense fallback={<div className="h-96 border-y border-white/10 bg-black/30" />}>
                <UpcomingEvents />
            </Suspense>
            <ReseauBlock />
            <PartnersStrip />
            <JoinBand />
        </>
    );
}
