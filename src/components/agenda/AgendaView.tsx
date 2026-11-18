"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import type { AgendaEvent } from "@/lib/openagenda";

const TZ = "Europe/Brussels";
const JOURS = ["lun", "mar", "mer", "jeu", "ven", "sam", "dim"];

const jourDe = (iso: string | Date) => new Intl.DateTimeFormat("sv-SE", { timeZone: TZ }).format(new Date(iso));
const fmtJour = (iso: string) =>
    new Intl.DateTimeFormat("fr-BE", { timeZone: TZ, weekday: "long", day: "numeric", month: "long", year: "numeric" }).format(new Date(iso));
const fmtHeure = (iso: string) =>
    new Intl.DateTimeFormat("fr-BE", { timeZone: TZ, hour: "2-digit", minute: "2-digit" }).format(new Date(iso));

type Occurence = { event: AgendaEvent; debut: string; fin: string };

export default function AgendaView({ events, error }: { events: AgendaEvent[]; error: "config" | "api" | null }) {
    const [now, setNow] = useState<Date | null>(null);
    const [mois, setMois] = useState<{ y: number; m: number } | null>(null);
    const [jourChoisi, setJourChoisi] = useState<string | null>(null);

    useEffect(() => {
        const d = new Date();
        setNow(d);
        const [y, m] = jourDe(d).split("-").map(Number);
        setMois({ y, m: m - 1 });
    }, []);

    const occurences = useMemo<Occurence[]>(
        () => events.flatMap((event) => event.dates.map((d) => ({ event, ...d }))),
        [events],
    );

    const parJour = useMemo(() => {
        const map = new Map<string, number>();
        for (const o of occurences) map.set(jourDe(o.debut), (map.get(jourDe(o.debut)) ?? 0) + 1);
        return map;
    }, [occurences]);

    if (error) {
        return (
            <p className="rounded-2xl border border-white/10 bg-black/40 p-6 text-center text-sm text-gray-400">
                {error === "config"
                    ? "Le calendrier n'est pas encore configuré (clé OpenAgenda manquante)."
                    : "Impossible de charger les événements pour le moment. Réessaie dans quelques minutes."}
            </p>
        );
    }

    const aujourdhui = now ? jourDe(now) : null;
    const liste = jourChoisi ? occurences.filter((o) => jourDe(o.debut) === jourChoisi) : occurences;
    const aVenir = now ? liste.filter((o) => Date.parse(o.fin) >= now.getTime()).sort((a, b) => Date.parse(a.debut) - Date.parse(b.debut)) : [];
    const passes = now ? liste.filter((o) => Date.parse(o.fin) < now.getTime()).sort((a, b) => Date.parse(b.debut) - Date.parse(a.debut)) : [];

    return (
        <div className="animate-fade-up w-full space-y-6">
            {/* Grille principale prenant toute la largeur, sans hauteur bloquée */}
            <div className="grid w-full gap-8 lg:grid-cols-12 items-start">
                {/* Calendrier (agrandi en longueur/largeur et bien plus visible) */}
                <div className="lg:col-span-5">
                    <div className="rounded-3xl border border-white/10 bg-black/40 p-8 shadow-2xl">
                        {mois ? (
                            <Calendrier
                                mois={mois}
                                onMois={setMois}
                                parJour={parJour}
                                aujourdhui={aujourdhui}
                                choisi={jourChoisi}
                                onChoisir={(j) => setJourChoisi((c) => (c === j ? null : j))}
                            />
                        ) : (
                            <div className="h-96 animate-pulse rounded-xl bg-white/5" />
                        )}
                    </div>
                </div>

                {/* Événements (colonne de droite, défilement global avec la page) */}
                <div className="space-y-6 lg:col-span-7">
                    {jourChoisi && (
                        <div className="flex items-center justify-between">
                            <button
                                onClick={() => setJourChoisi(null)}
                                className="rounded-full border border-brand/40 px-4 py-1.5 text-xs font-semibold text-brand transition hover:bg-brand/10"
                            >
                                {fmtJour(`${jourChoisi}T12:00:00`)} · Tout afficher
                            </button>
                        </div>
                    )}

                    {events.length === 0 && <p className="text-sm text-gray-400">Aucun événement pour l&apos;instant. Reviens bientôt !</p>}

                    <Section titre="À venir" items={aVenir} vide={events.length > 0 ? "Rien de prévu pour le moment." : null} />
                    <Section titre="Événements passés" items={passes} vide={null} discret />
                </div>
            </div>
        </div>
    );
}

function Section({ titre, items, vide, discret }: { titre: string; items: Occurence[]; vide: string | null; discret?: boolean }) {
    if (items.length === 0 && !vide) return null;
    return (
        <section className="space-y-4">
            <h2 className="text-xl font-bold text-white">{titre}</h2>
            {items.length === 0 ? (
                <p className="text-sm text-gray-400">{vide}</p>
            ) : (
                <ul className={`grid gap-4 sm:grid-cols-2 ${discret ? "opacity-70" : ""}`}>
                    {items.map((o) => (
                        <Carte key={`${o.event.uid}-${o.debut}`} o={o} />
                    ))}
                </ul>
            )}
        </section>
    );
}

function Carte({ o }: { o: Occurence }) {
    const { event } = o;
    const d = new Date(o.debut);
    const jour = new Intl.DateTimeFormat("fr-BE", { timeZone: TZ, day: "numeric" }).format(d);
    const moisCourt = new Intl.DateTimeFormat("fr-BE", { timeZone: TZ, month: "short" }).format(d).replace(".", "");
    const lieu = [event.lieu, event.ville].filter(Boolean).join(", ");

    const contenu = (
        <div className="h-full overflow-hidden rounded-2xl border border-white/10 bg-black/40 transition hover:border-brand/40">
            {event.image && (
                <div className="relative h-32 w-full">
                    <Image src={event.image} alt="" fill sizes="(min-width: 1024px) 350px, 100vw" className="object-cover" unoptimized />
                </div>
            )}
            <div className="flex gap-4 p-4">
                <div className="flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-xl bg-brand/10 text-brand">
                    <span className="text-xl font-extrabold leading-none">{jour}</span>
                    <span className="text-[10px] font-semibold uppercase">{moisCourt}</span>
                </div>
                <div className="min-w-0 flex-1">
                    <h3 className="text-sm font-semibold text-white">{event.titre}</h3>
                    <p className="mt-0.5 text-[11px] capitalize text-gray-400">
                        {fmtJour(o.debut)} · {fmtHeure(o.debut)} – {fmtHeure(o.fin)}
                    </p>
                    {lieu && <p className="mt-0.5 text-[11px] text-gray-400">{lieu}</p>}
                    {event.description && <p className="mt-2 line-clamp-2 text-xs text-gray-300">{event.description}</p>}
                </div>
            </div>
        </div>
    );

    return (
        <li>
            {event.url ? (
                <a href={event.url} target="_blank" rel="noopener noreferrer" className="block h-full">
                    {contenu}
                </a>
            ) : (
                contenu
            )}
        </li>
    );
}

function Calendrier({
                        mois, onMois, parJour, aujourdhui, choisi, onChoisir,
                    }: {
    mois: { y: number; m: number };
    onMois: (m: { y: number; m: number }) => void;
    parJour: Map<string, number>;
    aujourdhui: string | null;
    choisi: string | null;
    onChoisir: (jour: string) => void;
}) {
    const premier = new Date(Date.UTC(mois.y, mois.m, 1));
    const nbJours = new Date(Date.UTC(mois.y, mois.m + 1, 0)).getUTCDate();
    const decalage = (premier.getUTCDay() + 6) % 7;
    const titre = new Intl.DateTimeFormat("fr-BE", { timeZone: "UTC", month: "long", year: "numeric" }).format(premier);
    const aller = (delta: number) => {
        const d = new Date(Date.UTC(mois.y, mois.m + delta, 1));
        onMois({ y: d.getUTCFullYear(), m: d.getUTCMonth() });
    };

    return (
        <div className="w-full">
            {/* En-tête du calendrier agrandi */}
            <div className="mb-8 flex items-center justify-between">
                <button onClick={() => aller(-1)} aria-label="Mois précédent" className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-2xl text-white transition hover:bg-white/10">
                    ‹
                </button>
                <h2 className="text-xl font-bold capitalize text-white tracking-wide">{titre}</h2>
                <button onClick={() => aller(1)} aria-label="Mois suivant" className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-2xl text-white transition hover:bg-white/10">
                    ›
                </button>
            </div>

            {/* Jours de la semaine plus lisibles */}
            <div className="grid grid-cols-7 gap-3 text-center text-sm font-bold text-gray-300 mb-4">
                {JOURS.map((j) => (
                    <span key={j} className="py-2 uppercase tracking-wider">{j}</span>
                ))}
            </div>

            {/* Grille des jours bien plus grande et aérée */}
            <div className="grid grid-cols-7 gap-3 text-center">
                {Array.from({ length: decalage }).map((_, i) => (
                    <span key={`v${i}`} />
                ))}
                {Array.from({ length: nbJours }).map((_, i) => {
                    const cle = `${mois.y}-${String(mois.m + 1).padStart(2, "0")}-${String(i + 1).padStart(2, "0")}`;
                    const nb = parJour.get(cle) ?? 0;
                    const estChoisi = choisi === cle;
                    return (
                        <button
                            key={cle}
                            onClick={() => nb > 0 && onChoisir(cle)}
                            disabled={nb === 0}
                            className={[
                                "relative flex aspect-square items-center justify-center rounded-2xl text-lg transition-all font-bold",
                                estChoisi
                                    ? "bg-brand text-black shadow-lg shadow-brand/30 scale-105"
                                    : nb > 0
                                        ? "bg-white/10 text-white hover:bg-brand/20 hover:border-brand/50 border border-white/10 shadow-sm"
                                        : "text-gray-600 bg-white/[0.02]",
                                aujourdhui === cle && !estChoisi ? "ring-2 ring-brand ring-offset-2 ring-offset-black" : "",
                            ].join(" ")}
                        >
                            {i + 1}
                            {nb > 0 && !estChoisi && (
                                <span className="absolute bottom-2.5 h-2 w-2 rounded-full bg-brand animate-pulse shadow-md shadow-brand" />
                            )}
                        </button>
                    );
                })}
            </div>

            <p className="mt-8 text-center text-xs text-gray-400 border-t border-white/10 pt-6 leading-relaxed">
                💡 Les jours avec un point lumineux contiennent un ou plusieurs événements. Clique sur une date pour filtrer.
            </p>
        </div>
    );
}
