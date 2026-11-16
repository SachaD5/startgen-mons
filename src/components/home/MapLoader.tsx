"use client";

import dynamic from "next/dynamic";

// Leaflet a besoin du navigateur : on charge la carte uniquement côté client.
// ssr:false n'est permis que dans un composant client, d'où ce petit fichier à part
// (ça évite de rendre toute MapSection "use client").
const MapComponent = dynamic(() => import("@/components/home/MapComponent"), {
    ssr: false,
    loading: () => (
        <div className="flex h-[450px] items-center justify-center rounded-2xl border border-white/10 bg-surface text-gray-400">
            Chargement de la carte interactive...
        </div>
    ),
});

export default function MapLoader() {
    return <MapComponent />;
}
