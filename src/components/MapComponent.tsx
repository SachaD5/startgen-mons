"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

export default function MapComponent() {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Liste des antennes StartGen
    const antennes = [
        { nom: "StartGen Mons", position: [50.4542, 3.9523] as [number, number], desc: "Antenne principale - Campus Warocqué / Hub Mons", active: true },
        { nom: "StartGen Louvain-la-Neuve", position: [50.6681, 4.6117] as [number, number], desc: "Antenne partenaire - UCLouvain", active: false },
        { nom: "StartGen Namur", position: [50.4674, 4.8720] as [number, number], desc: "Antenne partenaire - UNamur", active: false },
        { nom: "StartGen Liège", position: [50.6326, 5.5797] as [number, number], desc: "Antenne partenaire - ULiège", active: false },
    ];

    // Icône personnalisée Leaflet
    const customIcon = L.icon({
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });

    if (!isMounted) {
        return (
            <div className="h-[450px] bg-[#1E1E1E] rounded-2xl flex items-center justify-center text-gray-400 border border-white/10">
                Chargement de la carte interactive...
            </div>
        );
    }

    return (
        <div className="h-[450px] w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl z-0 relative">
            <MapContainer
                center={[50.50, 4.60]}
                zoom={8}
                scrollWheelZoom={false}
                style={{ height: "100%", width: "100%", background: "#1E1E1E" }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {antennes.map((antenne, index) => (
                    <Marker key={index} position={antenne.position} icon={customIcon}>
                        <Popup>
                            <div className="p-1 text-gray-900">
                                <strong className="text-blue-600">{antenne.nom}</strong>
                                <p className="text-xs mt-1">{antenne.desc}</p>
                                {antenne.active && <span className="inline-block mt-2 bg-blue-100 text-blue-800 text-[10px] font-bold px-2 py-0.5 rounded">Site Actif (Mons)</span>}
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
}
