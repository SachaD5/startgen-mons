"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { antennes } from "@/data/antennes";

export default function MapComponent() {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const customIcon = L.icon({
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
    });

    if (!isMounted) {
        return (
            <div className="flex h-[450px] items-center justify-center rounded-2xl border border-white/10 bg-surface text-gray-400">
                Chargement de la carte interactive...
            </div>
        );
    }

    return (
        <div className="relative z-0 h-[450px] w-full overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
            <MapContainer
                center={[50.5, 4.6]}
                zoom={8}
                scrollWheelZoom={false}
                style={{ height: "100%", width: "100%", background: "#1E1E1E" }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {antennes.map((antenne) => (
                    <Marker key={antenne.id} position={antenne.position} icon={customIcon}>
                        <Popup>
                            <div className="p-1 text-gray-900">
                                <strong>{antenne.nom}</strong>
                                <p className="mt-1 text-xs">{antenne.description}</p>
                                {antenne.active && (
                                    <span className="mt-2 inline-block rounded bg-cyan-100 px-2 py-0.5 text-[10px] font-bold text-cyan-900">
                    Actif ici
                  </span>
                                )}
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
}
