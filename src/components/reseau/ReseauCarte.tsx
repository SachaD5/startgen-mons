"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import AntenneCard from "@/components/reseau/AntenneCard";
import { antennas } from "@/data/antennas";

// Leaflet a besoin du navigateur : on ne le charge pas côté serveur
const CarteLeaflet = dynamic(() => import("@/components/reseau/CarteLeaflet"), {
    ssr: false,
    loading: () => <div className="h-[26rem] w-full animate-pulse rounded-3xl bg-white/5 lg:h-[min(36rem,calc(100dvh-8rem))]" />,
});

// Carte + liste, reliées : cliquer un point sur la carte ou une ville dans la liste sélectionne la même antenne
export default function ReseauCarte() {
    const [choisieId, setChoisieId] = useState(antennas.find((a) => a.active)?.id ?? antennas[0].id);

    return (
        <div className="grid items-start gap-8 lg:grid-cols-5">
            <div className="lg:sticky lg:top-24 lg:col-span-3">
                <CarteLeaflet choisieId={choisieId} onChoisir={setChoisieId} />
            </div>

            <div className="lg:col-span-2">
                <h2 className="mb-1 text-xl font-bold text-white">Les {antennas.length} clubs du réseau</h2>
                <p className="mb-5 text-sm text-gray-400">Clique sur une ville, ici ou sur la carte.</p>
                <ul className="space-y-3">
                    {antennas.map((a) => (
                        <li key={a.id}>
                            <AntenneCard antenne={a} choisie={a.id === choisieId} onChoisir={() => setChoisieId(a.id)} />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
