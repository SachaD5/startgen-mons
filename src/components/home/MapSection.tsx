"use client";

import dynamic from "next/dynamic";
import Badge from "@/components/ui/Badge";
import { antennes } from "@/data/antennes";

const MapComponent = dynamic(() => import("@/components/home/MapComponent"), {
    ssr: false,
    loading: () => (
        <div className="flex h-[450px] items-center justify-center rounded-2xl bg-surface text-gray-400">
            Chargement de la carte interactive...
        </div>
    ),
});

export default function MapSection() {
    return (
        <section id="reseau" className="border-t border-white/10 bg-black/30 py-20">
            <div className="mx-auto max-w-7xl px-6">
                <div className="mb-16 text-center">
                    <Badge>Réseau & Implantation</Badge>
                    <h2 className="mb-4 mt-4 text-3xl font-bold tracking-tight text-white md:text-4xl">
                        Carte et antennes StartGen en Belgique
                    </h2>
                    <p className="mx-auto max-w-xl text-gray-400">
                        Retrouvez l'antenne de Mons ainsi que les autres pôles du réseau StartGen à travers le pays.
                    </p>
                </div>

                <div className="grid items-center gap-8 lg:grid-cols-3">
                    <div className="lg:col-span-2">
                        <MapComponent />
                    </div>

                    <div className="space-y-3">
                        <h3 className="mb-4 text-lg font-semibold text-white">Antennes disponibles :</h3>
                        {antennes.map((antenne) => (
                            <div
                                key={antenne.id}
                                className={`rounded-xl border p-4 transition ${
                                    antenne.active
                                        ? "border-brand bg-surface shadow-md shadow-brand/10"
                                        : "border-white/10 bg-surface/50 opacity-70 hover:opacity-100"
                                }`}
                            >
                                <div className="mb-1 flex items-center justify-between">
                                    <h4 className="text-sm font-bold text-white">{antenne.nom}</h4>
                                    {antenne.active && (
                                        <span className="rounded bg-brand px-2 py-0.5 text-[10px] font-bold text-surface">
                      Actif ici
                    </span>
                                    )}
                                </div>
                                <p className="mb-2 text-xs text-gray-400">{antenne.lieu}</p>
                                <span className="text-xs font-medium text-brand">{antenne.statut}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
