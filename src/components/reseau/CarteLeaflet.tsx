"use client";

import { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { antennas } from "@/data/antennas";

// La carte s'ajuste toute seule pour montrer toutes les antennes, sur ordinateur comme sur téléphone
const TOUTES = L.latLngBounds(antennas.map((a) => a.position));

type Props = { choisieId: string; onChoisir: (id: string) => void };

// Un point = un petit morceau de HTML (pas d'image externe à charger)
function pastille(nom: string, active: boolean, choisie: boolean) {
    const taille = choisie ? 22 : 16;
    const couleur = active || choisie ? "#00D9FF" : "#ffffff";
    return L.divIcon({
        className: "",
        iconSize: [0, 0],
        html: `
          <div style="position:relative;transform:translate(-50%,-50%);display:flex;flex-direction:column;align-items:center;cursor:pointer">
            <span style="display:block;width:${taille}px;height:${taille}px;border-radius:9999px;background:${couleur};border:3px solid #1E1E1E;box-shadow:0 0 0 ${choisie ? 6 : 3}px rgba(0,217,255,${choisie ? 0.35 : 0.18});transition:all .2s"></span>
            <span style="position:absolute;top:${taille + 6}px;white-space:nowrap;font:${choisie || active ? 700 : 500} 12px Inter,system-ui,sans-serif;color:${choisie || active ? "#00D9FF" : "#e5e7eb"};text-shadow:0 0 4px #1E1E1E,0 0 4px #1E1E1E,0 0 4px #1E1E1E">${nom}</span>
          </div>`,
    });
}

// Quand on choisit une antenne dans la liste et qu'elle est hors de l'écran, la carte glisse jusqu'à elle
function Recentrer({ choisieId }: { choisieId: string }) {
    const map = useMap();
    const precedente = useRef(choisieId);
    useEffect(() => {
        if (precedente.current === choisieId) return; // rien de nouveau : on garde la vue d'ensemble
        precedente.current = choisieId;
        const a = antennas.find((x) => x.id === choisieId);
        // On ne bouge la carte que si la ville est (presque) hors de l'écran
        if (a && !map.getBounds().pad(-0.1).contains(a.position)) map.panTo(a.position, { animate: true, duration: 0.6 });
    }, [choisieId, map]);
    return null;
}

export default function CarteLeaflet({ choisieId, onChoisir }: Props) {
    // Next.js réveille la page au retour en arrière, mais Leaflet ne sait pas se recréer dans un conteneur déjà utilisé :
    // on détruit la carte quand la page est mise de côté et on en recrée une neuve ensuite.
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    return (
        <div className="relative z-0 h-[26rem] w-full overflow-hidden rounded-3xl border border-white/10 shadow-2xl lg:h-[min(36rem,calc(100dvh-8rem))]">
            {mounted && (
                <MapContainer bounds={TOUTES} boundsOptions={{ padding: [60, 60] }} minZoom={6} scrollWheelZoom={false} keyboard={false} style={{ height: "100%", width: "100%", background: "#1E1E1E" }}>
                    {/* Fond OpenStreetMap classique : détaillé, gratuit, sans clé */}
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Recentrer choisieId={choisieId} />
                    {antennas.map((a) => (
                        <Marker
                            key={`${a.id}-${a.id === choisieId}`}
                            position={a.position}
                            icon={pastille(a.ville, a.active, a.id === choisieId)}
                            zIndexOffset={a.id === choisieId ? 1000 : a.active ? 500 : 0}
                            eventHandlers={{ click: () => onChoisir(a.id) }}
                            keyboard
                            title={a.nom}
                        />
                    ))}
                </MapContainer>
            )}
        </div>
    );
}
