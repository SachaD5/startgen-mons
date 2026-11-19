"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { AgendaEvent } from "@/lib/openagenda";
import { jourDe, cleDe, moisDe, Occurence, Mois, Vue } from "@/components/agenda/outils";
import { Fiche } from "@/components/agenda/Fiche";
import { Calendrier } from "@/components/agenda/Calendrier";
import { ListeDuMois, ListeParMois } from "@/components/agenda/Listes";
import { Ico, ICONES } from "@/components/ui/Ico";

export default function AgendaView({ events, error }: { events: AgendaEvent[]; error: "config" | "api" | null }) {
    // "Maintenant" est calculé dans le navigateur (après affichage) : évite tout décalage serveur / navigateur
    const [now, setNow] = useState<Date | null>(null);
    const [mois, setMois] = useState<Mois | null>(null);
    const [vue, setVue] = useState<Vue>("calendrier");
    const [choisie, setChoisie] = useState<string | null>(null); // clé de l'occurrence sélectionnée
    const [fenetre, setFenetre] = useState(false); // fiche ouverte en fenêtre (vue liste)
    const [ville, setVille] = useState<string | null>(null);
    const [recherche, setRecherche] = useState("");
    const [passes, setPasses] = useState(false); // vue liste : afficher aussi les événements passés
    const zoneRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const d = new Date();
        setNow(d);
        setMois(moisDe(d.toISOString()));
        if (window.innerWidth < 768) setVue("liste"); // sur téléphone, la liste est plus lisible
    }, []);

    const villes = useMemo(() => [...new Set(events.map((e) => e.ville).filter(Boolean))].sort((a, b) => a.localeCompare(b, "fr")), [events]);

    // Une ligne par date, filtrée (ville + recherche), triée de la plus proche à la plus lointaine
    const occurences = useMemo<Occurence[]>(() => {
        const q = recherche.trim().toLowerCase();
        return events
            .filter((e) => (ville ? e.ville === ville : true))
            .filter((e) => (q ? `${e.titre} ${e.resume} ${e.lieu} ${e.ville}`.toLowerCase().includes(q) : true))
            .flatMap((event) => event.dates.map((d) => ({ event, ...d })))
            .sort((a, b) => Date.parse(a.debut) - Date.parse(b.debut));
    }, [events, ville, recherche]);

    const parJour = useMemo(() => {
        const map = new Map<string, Occurence[]>();
        for (const o of occurences) {
            const j = jourDe(o.debut);
            map.set(j, [...(map.get(j) ?? []), o]);
        }
        return map;
    }, [occurences]);

    const selection = occurences.find((o) => cleDe(o) === choisie) ?? null;

    // Verrou du défilement + touche Échap quand la fenêtre est ouverte
    useEffect(() => {
        if (!(fenetre && selection)) return;
        const fermer = (e: KeyboardEvent) => e.key === "Escape" && setFenetre(false);
        document.addEventListener("keydown", fermer);
        const avant = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.removeEventListener("keydown", fermer);
            document.body.style.overflow = avant;
        };
    }, [fenetre, selection]);

    // Un événement est choisi (liste, calendrier ou bandeau) : on le met en évidence et on affiche son mois
    function ouvrir(o: Occurence) {
        setChoisie(cleDe(o));
        setMois(moisDe(o.debut));
        if (vue === "liste") setFenetre(true);
        else if (window.innerWidth < 1280) zoneRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    if (error) {
        return (
            <p className="rounded-2xl border border-white/10 bg-black/40 p-8 text-center text-sm text-gray-400">
                {error === "config"
                    ? "Le calendrier n'est pas encore configuré : il manque la clé OpenAgenda dans le fichier .env.local."
                    : "Impossible de charger les événements pour le moment. Réessaie dans quelques minutes."}
            </p>
        );
    }

    const aujourdhui = now ? jourDe(now) : null;
    const aVenir = now ? occurences.filter((o) => Date.parse(o.fin) >= now.getTime()) : [];
    const termines = now ? occurences.filter((o) => Date.parse(o.fin) < now.getTime()).reverse() : [];
    const filtresActifs = ville !== null || recherche.trim() !== "";

    return (
        <div className="space-y-6">
            {/* Barre d'outils */}
            <div className="flex flex-col gap-4 border-b border-white/10 pb-6 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex flex-wrap items-center gap-3">
                    <div role="tablist" aria-label="Affichage" className="inline-flex rounded-xl bg-white/5 p-1">
                        {(["calendrier", "liste"] as const).map((v) => (
                            <button
                                key={v}
                                role="tab"
                                aria-selected={vue === v}
                                onClick={() => {
                                    setVue(v);
                                    setFenetre(false);
                                }}
                                className={`rounded-lg px-4 py-1.5 text-sm font-semibold capitalize transition ${
                                    vue === v ? "bg-brand text-black" : "text-gray-300 hover:text-white"
                                }`}
                            >
                                {v}
                            </button>
                        ))}
                    </div>

                    <label className="relative block">
                        <span className="sr-only">Rechercher un événement</span>
                        <Ico d={ICONES.search} className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                        <input
                            type="search"
                            value={recherche}
                            onChange={(e) => setRecherche(e.target.value)}
                            placeholder="Rechercher un événement"
                            className="w-full rounded-xl border border-white/10 bg-white/5 py-2 pl-9 pr-3 text-sm text-white placeholder:text-gray-500 focus:border-brand focus:outline-none sm:w-64"
                        />
                    </label>
                </div>

                {villes.length > 1 && (
                    <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filtrer par ville">
                        <Puce actif={ville === null} onClick={() => setVille(null)}>Toutes les villes</Puce>
                        {villes.map((v) => (
                            <Puce key={v} actif={ville === v} onClick={() => setVille(ville === v ? null : v)}>
                                {v}
                            </Puce>
                        ))}
                    </div>
                )}
            </div>

            {events.length === 0 && (
                <p className="rounded-2xl border border-white/10 bg-black/40 p-10 text-center text-gray-400">
                    Aucun événement publié pour l&apos;instant. Reviens bientôt !
                </p>
            )}

            {events.length > 0 && occurences.length === 0 && (
                <div className="rounded-2xl border border-white/10 bg-black/40 p-10 text-center">
                    <p className="text-gray-300">Aucun événement ne correspond à ta recherche.</p>
                    <button
                        onClick={() => {
                            setVille(null);
                            setRecherche("");
                        }}
                        className="mt-4 rounded-full border border-brand/50 px-5 py-2 text-sm font-semibold text-brand transition hover:bg-brand/10"
                    >
                        Effacer les filtres
                    </button>
                </div>
            )}

            {occurences.length > 0 && vue === "calendrier" && (
                <div ref={zoneRef} className="grid scroll-mt-24 items-start gap-6 xl:grid-cols-12">
                    <div className="xl:col-span-8">
                        {mois ? (
                            <Calendrier mois={mois} onMois={setMois} parJour={parJour} aujourdhui={aujourdhui} now={now} choisie={choisie} onChoisir={ouvrir} />
                        ) : (
                            <div className="h-[36rem] animate-pulse rounded-xl bg-white/5" />
                        )}
                    </div>

                    {/* Colonne de droite : la fiche de l'événement choisi, sinon les événements du mois affiché */}
                    <aside className="xl:sticky xl:top-24 xl:col-span-4">
                        {selection ? (
                            <Fiche o={selection} now={now} onFermer={() => setChoisie(null)} fermerLabel="Retour au mois" />
                        ) : (
                            mois && <ListeDuMois mois={mois} occurences={occurences} now={now} choisie={choisie} onChoisir={ouvrir} />
                        )}
                    </aside>
                </div>
            )}

            {occurences.length > 0 && vue === "liste" && (
                <ListeParMois
                    aVenir={aVenir}
                    termines={termines}
                    passes={passes}
                    onPasses={setPasses}
                    now={now}
                    choisie={choisie}
                    onChoisir={ouvrir}
                    filtresActifs={filtresActifs}
                />
            )}
            {/* Fiche en fenêtre (vue liste).
                Elle est "téléportée" tout en haut de la page (document.body) : sinon elle se place par rapport au grand cadre
                de la page (qui a une animation) au lieu de l'écran, et se retrouve décalée ou coupée. */}
            {vue === "liste" && fenetre && selection && createPortal(
                <div className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center sm:p-6" role="dialog" aria-modal="true" aria-label={selection.event.titre}>
                    <button aria-label="Fermer" onClick={() => setFenetre(false)} className="absolute inset-0 cursor-default bg-black/70 backdrop-blur-sm" />
                    <div className="scroll-discret relative max-h-[90dvh] w-full max-w-2xl overflow-y-auto rounded-t-3xl sm:rounded-3xl">
                        <Fiche o={selection} now={now} onFermer={() => setFenetre(false)} fermerLabel="Fermer" />
                    </div>
                </div>,
                document.body,
            )}
        </div>
    );
}

function Puce({ actif, onClick, children }: { actif: boolean; onClick: () => void; children: React.ReactNode }) {
    return (
        <button
            onClick={onClick}
            aria-pressed={actif}
            className={`rounded-full border px-3.5 py-1.5 text-sm transition ${
                actif ? "border-brand bg-brand/15 font-semibold text-brand" : "border-white/10 text-gray-300 hover:border-white/30"
            }`}
        >
            {children}
        </button>
    );
}
