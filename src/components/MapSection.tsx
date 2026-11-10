"use client";

import dynamic from "next/dynamic";

const MapComponent = dynamic(() => import("@/components/MapComponent"), {
    ssr: false,
    loading: () => <div className="h-[450px] bg-[#1E1E1E] rounded-2xl flex items-center justify-center text-gray-400">Chargement de la carte interactive...</div>
});

export default function MapSection() {
    const antennes = [
        { nom: "StartGen Mons", statut: "Actif (Antenne principale du site)", coord: "📍 Campus Warocqué / Hub Mons", active: true },
        { nom: "StartGen Louvain-la-Neuve", statut: "Réseau partenaire", coord: "📍 UCLouvain", active: false },
        { nom: "StartGen Namur", statut: "Réseau partenaire", coord: "📍 UNamur", active: false },
        { nom: "StartGen Liège", statut: "Réseau partenaire", coord: "📍 ULiège", active: false },
    ];

    return (
        <section id="reseau" className="bg-black/30 py-20 border-t border-white/10">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
          <span className="bg-[#00D9FF]/10 text-[#00D9FF] text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider mb-4 inline-block border border-[#00D9FF]/20">
            Réseau & Implantation
          </span>
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-4">
                         Carte et Antennes StartGen en Belgique
                    </h2>
                    <p className="text-gray-400 max-w-xl mx-auto">
                        Retrouvez l'antenne de Mons ainsi que les autres pôles du réseau StartGen à travers le pays.
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8 items-center">

                    {/* Carte interactive sans erreur d'API */}
                    <div className="lg:col-span-2">
                        <MapComponent />
                    </div>

                    {/* Liste des 4 antennes */}
                    <div className="space-y-3">
                        <h3 className="text-lg font-semibold text-white mb-4">Antennes disponibles :</h3>
                        {antennes.map((antenne, index) => (
                            <div
                                key={index}
                                className={`p-4 rounded-xl border transition ${
                                    antenne.active
                                        ? "bg-[#1E1E1E] border-[#00D9FF] shadow-md shadow-[#00D9FF]/10"
                                        : "bg-[#1E1E1E]/50 border-white/10 opacity-70 hover:opacity-100"
                                }`}
                            >
                                <div className="flex justify-between items-center mb-1">
                                    <h4 className="font-bold text-white text-sm">{antenne.nom}</h4>
                                    {antenne.active && (
                                        <span className="text-[10px] font-bold bg-[#00D9FF] text-[#1E1E1E] px-2 py-0.5 rounded">
                      Actif ici
                    </span>
                                    )}
                                </div>
                                <p className="text-xs text-gray-400 mb-2">{antenne.coord}</p>
                                <span className="text-xs text-[#00D9FF] font-medium">{antenne.statut}</span>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
}
