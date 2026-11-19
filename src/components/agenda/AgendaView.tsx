"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import type { AgendaEvent } from "@/lib/openagenda";
import { createPortal } from "react-dom";

/* ------------------------------------------------------------------ */
/*  Outils : dates, textes                                             */
/* ------------------------------------------------------------------ */

const TZ = "Europe/Brussels";
const JOURS = ["lun", "mar", "mer", "jeu", "ven", "sam", "dim"];
const MAX_PAR_JOUR = 3; // événements affichés dans une case du calendrier avant "+ X autres"

// "2026-11-18" : le jour d'une date, vu depuis la Belgique
const jourDe = (iso: string | Date) => new Intl.DateTimeFormat("sv-SE", { timeZone: TZ }).format(new Date(iso));
const fmt = (iso: string, o: Intl.DateTimeFormatOptions) => new Intl.DateTimeFormat("fr-BE", { timeZone: TZ, ...o }).format(new Date(iso));
const fmtJourLong = (iso: string) => fmt(iso, { weekday: "long", day: "numeric", month: "long", year: "numeric" });
const fmtHeure = (iso: string) => fmt(iso, { hour: "2-digit", minute: "2-digit" });
const fmtMoisAnnee = (iso: string) => fmt(iso, { month: "long", year: "numeric" });

type Occurence = { event: AgendaEvent; debut: string; fin: string };
type Mois = { y: number; m: number };
type Vue = "calendrier" | "liste";

// Identifiant d'une date précise d'un événement (un événement peut avoir plusieurs dates)
const cleDe = (o: Occurence) => `${o.event.uid}|${o.debut}`;
const moisDe = (iso: string): Mois => {
    const [y, m] = jourDe(iso).split("-").map(Number);
    return { y, m: m - 1 };
};

// OpenAgenda renvoie la description en "markdown" (**gras**, [lien](url)...) : on la rend lisible
const paragraphes = (t: string) =>
    t
        .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
        .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
        .replace(/[*_`#>]+/g, "")
        .split(/\n{2,}/)
        .map((p) => p.trim())
        .filter(Boolean);

const estGratuit = (prix: string) => /^\s*(gratuit|free|entrée libre)/i.test(prix);

// Fichier .ics : s'ouvre dans Google Agenda, Outlook, Apple Calendar...
function telechargerIcs(o: Occurence) {
    const utc = (iso: string) => new Date(iso).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
    const esc = (t: string) => t.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\r?\n/g, "\\n");
    const lieu = [o.event.lieu, o.event.ville].filter(Boolean).join(", ");
    const contenu = [
        "BEGIN:VCALENDAR",
        "VERSION:2.0",
        "PRODID:-//StartGen Mons//Agenda//FR",
        "BEGIN:VEVENT",
        `UID:${o.event.uid}-${utc(o.debut)}@startgen-mons`,
        `DTSTAMP:${utc(new Date().toISOString())}`,
        `DTSTART:${utc(o.debut)}`,
        `DTEND:${utc(o.fin)}`,
        `SUMMARY:${esc(o.event.titre)}`,
        `LOCATION:${esc(lieu)}`,
        `DESCRIPTION:${esc(o.event.resume || "")}${o.event.url ? esc(`\n${o.event.url}`) : ""}`,
        "END:VEVENT",
        "END:VCALENDAR",
    ].join("\r\n");
    const url = URL.createObjectURL(new Blob([contenu], { type: "text/calendar;charset=utf-8" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = `${o.event.titre.replace(/[^\w-]+/g, "-").toLowerCase()}.ics`;
    a.click();
    URL.revokeObjectURL(url);
}

/* ------------------------------------------------------------------ */
/*  Petites icônes (SVG intégrés)                                      */
/* ------------------------------------------------------------------ */

function Ico({ d, className = "h-4 w-4" }: { d: string; className?: string }) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
            <path d={d} />
        </svg>
    );
}
const D = {
    pin: "M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11zM12 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z",
    clock: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 7v5l3 2",
    euro: "M17 6.5A6 6 0 0 0 7.5 9M17 17.5A6 6 0 0 1 7.5 15M5 10.5h8M5 13.5h8",
    cal: "M7 3v4M17 3v4M4 9h16M5 5h14a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1z",
    close: "M6 6l12 12M18 6L6 18",
    search: "M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14zM20 20l-4-4",
    ext: "M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5",
    left: "M15 6l-6 6 6 6",
    right: "M9 6l6 6-6 6",
};

/* ------------------------------------------------------------------ */
/*  Composant principal                                                */
/* ------------------------------------------------------------------ */

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
                        <Ico d={D.search} className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
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

function BadgePrix({ prix }: { prix: string }) {
    return (
        <span
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
                estGratuit(prix) ? "bg-emerald-500/15 text-emerald-300" : "bg-brand/15 text-brand"
            }`}
        >
            <Ico d={D.euro} className="h-3.5 w-3.5" />
            {prix}
        </span>
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

/* ------------------------------------------------------------------ */
/*  Fiche détaillée d'un événement                                     */
/* ------------------------------------------------------------------ */

function Fiche({ o, now, onFermer, fermerLabel }: { o: Occurence; now: Date | null; onFermer: () => void; fermerLabel: string }) {
    const { event } = o;
    const lieu = [event.lieu, event.ville].filter(Boolean).join(", ");
    const fini = now ? Date.parse(o.fin) < now.getTime() : false;
    const textes = paragraphes(event.description);
    const bouton = useRef<HTMLButtonElement>(null);
    useEffect(() => bouton.current?.focus({ preventScroll: true }), [o]);

    return (
        <article className="animate-fade-up overflow-hidden rounded-3xl border border-brand/40 bg-[#141414] shadow-2xl">
            {event.image && (
                <div className="relative h-44 w-full sm:h-56">
                    <Image src={event.image} alt="" fill sizes="(min-width: 1280px) 500px, 100vw" className="object-cover" unoptimized />
                </div>
            )}
            <div className="space-y-5 p-6">
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <div className="mb-2 flex flex-wrap gap-2">
                            {fini && <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-gray-300">Terminé</span>}
                            {event.prix && <BadgePrix prix={event.prix} />}
                        </div>
                        <h2 className="text-2xl font-bold leading-tight text-white">{event.titre}</h2>
                    </div>
                    <button ref={bouton} onClick={onFermer} aria-label={fermerLabel} className="shrink-0 rounded-lg p-2 text-gray-400 transition hover:bg-white/10 hover:text-white">
                        <Ico d={D.close} className="h-5 w-5" />
                    </button>
                </div>

                <ul className="space-y-3 text-sm text-gray-200">
                    <Ligne icone={D.cal}><span className="capitalize">{fmtJourLong(o.debut)}</span></Ligne>
                    <Ligne icone={D.clock}>De {fmtHeure(o.debut)} à {fmtHeure(o.fin)}</Ligne>
                    {lieu && <Ligne icone={D.pin}>{lieu}</Ligne>}
                    <Ligne icone={D.euro}>{event.prix || "Prix non précisé"}</Ligne>
                </ul>

                {textes.length > 0 && (
                    <div className="max-w-prose space-y-3 border-t border-white/10 pt-5 text-sm leading-relaxed text-gray-300">
                        {textes.map((p, i) => (
                            <p key={i} className="whitespace-pre-line">{p}</p>
                        ))}
                    </div>
                )}

                <div className="flex flex-wrap gap-3 border-t border-white/10 pt-5">
                    {event.url && (
                        <a href={event.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-brand-hover">
                            Voir sur OpenAgenda <Ico d={D.ext} className="h-4 w-4" />
                        </a>
                    )}
                    {!fini && (
                        <button onClick={() => telechargerIcs(o)} className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold text-white transition hover:border-brand hover:text-brand">
                            <Ico d={D.cal} className="h-4 w-4" /> Ajouter à mon agenda
                        </button>
                    )}
                </div>
            </div>
        </article>
    );
}

function Ligne({ icone, children }: { icone: string; children: React.ReactNode }) {
    return (
        <li className="flex items-start gap-3">
            <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-brand/10 text-brand">
                <Ico d={icone} className="h-4 w-4" />
            </span>
            <span className="pt-0.5">{children}</span>
        </li>
    );
}

/* ------------------------------------------------------------------ */
/*  Listes                                                             */
/* ------------------------------------------------------------------ */

// Colonne de droite de la vue calendrier : tous les événements à partir du mois affiché (ça continue après la fin du mois)
function ListeDuMois({
    mois, occurences, now, choisie, onChoisir,
}: {
    mois: Mois;
    occurences: Occurence[];
    now: Date | null;
    choisie: string | null;
    onChoisir: (o: Occurence) => void;
}) {
    const debutMois = `${mois.y}-${String(mois.m + 1).padStart(2, "0")}-01`;
    const suite = occurences.filter((o) => jourDe(o.debut) >= debutMois);
    const titre = new Intl.DateTimeFormat("fr-BE", { timeZone: "UTC", month: "long", year: "numeric" }).format(new Date(Date.UTC(mois.y, mois.m, 1)));
    const jours = [...new Set(suite.map((o) => jourDe(o.debut)))];
    const moisDuJour = (j: string) => j.slice(0, 7);

    return (
        <div className="scroll-discret rounded-2xl bg-white/[0.04] p-5 xl:max-h-[calc(100vh-8rem)] xl:overflow-y-auto">
            <h3 className="text-lg font-bold text-white">À partir de <span className="capitalize">{titre}</span></h3>
            <p className="mb-4 text-sm text-gray-400">
                {suite.length === 0 ? "Aucun événement à partir de ce mois." : `${suite.length} événement${suite.length > 1 ? "s" : ""}. Clique pour voir la fiche.`}
            </p>
            <div className="space-y-5">
                {jours.map((jour, i) => {
                    const duJour = suite.filter((o) => jourDe(o.debut) === jour);
                    const estAujourdhui = now ? jourDe(now) === jour : false;
                    const nouveauMois = i > 0 && moisDuJour(jour) !== moisDuJour(jours[i - 1]);
                    return (
                        <section key={jour}>
                            {/* Quand on passe au mois suivant : un séparateur bien visible */}
                            {nouveauMois && (
                                <p className="mb-4 mt-2 rounded-lg bg-brand/10 px-3 py-2 text-sm font-bold capitalize text-brand">{fmtMoisAnnee(duJour[0].debut)}</p>
                            )}
                            {/* En-tête de date : sépare clairement chaque journée */}
                            <div className="mb-2.5 flex items-center gap-3">
                                <h4 className={`text-sm font-bold capitalize ${estAujourdhui ? "text-brand" : "text-white"}`}>
                                    {fmt(duJour[0].debut, { weekday: "long", day: "numeric", month: "long" })}
                                    {estAujourdhui && <span className="ml-2 rounded-full bg-brand px-2 py-0.5 text-[11px] font-semibold text-black">Aujourd&apos;hui</span>}
                                </h4>
                                <span className="h-px flex-1 bg-white/15" />
                            </div>
                            <ul className="space-y-2.5">
                                {duJour.map((o) => (
                                    <Carte key={cleDe(o)} o={o} now={now} actif={choisie === cleDe(o)} onChoisir={() => onChoisir(o)} compact />
                                ))}
                            </ul>
                        </section>
                    );
                })}
            </div>
        </div>
    );
}

// Vue « liste » : tout, groupé par mois
function ListeParMois({
    aVenir, termines, passes, onPasses, now, choisie, onChoisir, filtresActifs,
}: {
    aVenir: Occurence[];
    termines: Occurence[];
    passes: boolean;
    onPasses: (v: boolean) => void;
    now: Date | null;
    choisie: string | null;
    onChoisir: (o: Occurence) => void;
    filtresActifs: boolean;
}) {
    const groupes = (items: Occurence[]) => {
        const map = new Map<string, Occurence[]>();
        for (const o of items) {
            const k = fmtMoisAnnee(o.debut);
            map.set(k, [...(map.get(k) ?? []), o]);
        }
        return [...map.entries()];
    };

    return (
        <div className="space-y-10">
            {aVenir.length === 0 && (
                <p className="rounded-2xl border border-white/10 bg-black/40 p-8 text-center text-gray-400">
                    Rien de prévu pour le moment{filtresActifs ? " avec ces filtres" : ""}.
                </p>
            )}
            {groupes(aVenir).map(([titre, items]) => (
                <section key={titre}>
                    <h2 className="mb-4 text-xl font-bold capitalize text-white">{titre}</h2>
                    <ul className="grid gap-4 lg:grid-cols-2">
                        {items.map((o) => (
                            <Carte key={cleDe(o)} o={o} now={now} actif={choisie === cleDe(o)} onChoisir={() => onChoisir(o)} />
                        ))}
                    </ul>
                </section>
            ))}

            {termines.length > 0 && (
                <div>
                    <button onClick={() => onPasses(!passes)} aria-expanded={passes} className="rounded-full border border-white/15 px-5 py-2 text-sm font-semibold text-gray-300 transition hover:border-white/40 hover:text-white">
                        {passes ? "Masquer" : "Afficher"} les {termines.length} événement{termines.length > 1 ? "s" : ""} passé{termines.length > 1 ? "s" : ""}
                    </button>
                    {passes && (
                        <div className="mt-8 space-y-10">
                            {groupes(termines).map(([titre, items]) => (
                                <section key={titre}>
                                    <h2 className="mb-4 text-xl font-bold capitalize text-gray-400">{titre}</h2>
                                    <ul className="grid gap-4 opacity-70 lg:grid-cols-2">
                                        {items.map((o) => (
                                            <Carte key={cleDe(o)} o={o} now={now} actif={choisie === cleDe(o)} onChoisir={() => onChoisir(o)} />
                                        ))}
                                    </ul>
                                </section>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

function Carte({ o, now, actif, onChoisir, compact }: { o: Occurence; now: Date | null; actif: boolean; onChoisir: () => void; compact?: boolean }) {
    const { event } = o;
    const lieu = [event.lieu, event.ville].filter(Boolean).join(", ");
    const fini = now ? Date.parse(o.fin) < now.getTime() : false;

    return (
        <li>
            <button
                onClick={onChoisir}
                aria-pressed={actif}
                className={`flex h-full w-full gap-4 rounded-2xl border p-4 text-left transition ${
                    actif ? "border-brand bg-brand/10" : "border-white/10 bg-black/40 hover:border-brand/50"
                }`}
            >
                {compact ? (
                    <div className={`flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-xl text-sm font-bold ${fini ? "bg-white/10 text-gray-300" : "bg-brand/10 text-brand"}`}>
                        <span>{fmtHeure(o.debut)}</span>
                        <span className="text-[11px] font-medium opacity-70">{fmtHeure(o.fin)}</span>
                    </div>
                ) : (
                    <div className={`flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-xl ${fini ? "bg-white/10 text-gray-300" : "bg-brand/10 text-brand"}`}>
                        <span className="text-2xl font-extrabold leading-none">{fmt(o.debut, { day: "numeric" })}</span>
                        <span className="mt-1 text-[11px] font-semibold uppercase">{fmt(o.debut, { month: "short" }).replace(".", "")}</span>
                    </div>
                )}
                <div className="min-w-0 flex-1">
                    <h3 className="font-semibold leading-snug text-white">{event.titre}</h3>
                    <p className="mt-1 text-xs text-gray-400">
                        {compact ? lieu : (
                            <>
                                <span className="capitalize">{fmt(o.debut, { weekday: "long" })}</span>, {fmtHeure(o.debut)} – {fmtHeure(o.fin)}
                                {lieu && ` · ${lieu}`}
                            </>
                        )}
                    </p>
                    {!compact && event.resume && <p className="mt-2 line-clamp-2 text-sm text-gray-300">{event.resume}</p>}
                    {event.prix && (
                        <p className={`mt-2 text-xs font-semibold ${estGratuit(event.prix) ? "text-emerald-300" : "text-brand"}`}>{event.prix}</p>
                    )}
                </div>
                {!compact && event.image && (
                    <div className="relative hidden h-20 w-24 shrink-0 overflow-hidden rounded-lg sm:block">
                        <Image src={event.image} alt="" fill sizes="96px" className="object-cover" unoptimized />
                    </div>
                )}
            </button>
        </li>
    );
}

/* ------------------------------------------------------------------ */
/*  Grand calendrier                                                   */
/* ------------------------------------------------------------------ */

function Calendrier({
    mois, onMois, parJour, aujourdhui, now, choisie, onChoisir,
}: {
    mois: Mois;
    onMois: (m: Mois) => void;
    parJour: Map<string, Occurence[]>;
    aujourdhui: string | null;
    now: Date | null;
    choisie: string | null;
    onChoisir: (o: Occurence) => void;
}) {
    const premier = new Date(Date.UTC(mois.y, mois.m, 1));
    const nbJours = new Date(Date.UTC(mois.y, mois.m + 1, 0)).getUTCDate();
    const decalage = (premier.getUTCDay() + 6) % 7; // lundi = 0
    const titre = new Intl.DateTimeFormat("fr-BE", { timeZone: "UTC", month: "long", year: "numeric" }).format(premier);
    const aller = (delta: number) => {
        const d = new Date(Date.UTC(mois.y, mois.m + delta, 1));
        onMois({ y: d.getUTCFullYear(), m: d.getUTCMonth() });
    };
    const aujourdhuiMois = () => aujourdhui && onMois({ y: Number(aujourdhui.slice(0, 4)), m: Number(aujourdhui.slice(5, 7)) - 1 });

    return (
        <>
            <div className="mb-5 flex items-center justify-between gap-2">
                <h2 className="text-xl font-bold capitalize text-white sm:text-2xl">{titre}</h2>
                <div className="flex items-center gap-1">
                    <button onClick={aujourdhuiMois} className="mr-1 rounded-lg border border-white/15 px-3 py-1.5 text-sm text-gray-200 transition hover:border-brand hover:text-brand">
                        Aujourd&apos;hui
                    </button>
                    <button onClick={() => aller(-1)} aria-label="Mois précédent" className="rounded-lg p-2 text-gray-300 transition hover:bg-white/10">
                        <Ico d={D.left} className="h-5 w-5" />
                    </button>
                    <button onClick={() => aller(1)} aria-label="Mois suivant" className="rounded-lg p-2 text-gray-300 transition hover:bg-white/10">
                        <Ico d={D.right} className="h-5 w-5" />
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
                {JOURS.map((j) => (
                    <span key={j} className="pb-1 text-center text-xs font-semibold text-gray-500">{j}</span>
                ))}
                {Array.from({ length: decalage }).map((_, i) => (
                    <span key={`v${i}`} />
                ))}
                {Array.from({ length: nbJours }).map((_, i) => {
                    const cle = `${mois.y}-${String(mois.m + 1).padStart(2, "0")}-${String(i + 1).padStart(2, "0")}`;
                    const doc = parJour.get(cle) ?? [];
                    const estAujourdhui = aujourdhui === cle;
                    const contientChoisie = doc.some((o) => cleDe(o) === choisie);
                    // Si l'événement choisi est dans les "+ X autres", on le fait remonter pour qu'il reste visible
                    const rang = doc.findIndex((o) => cleDe(o) === choisie);
                    const visibles = rang >= MAX_PAR_JOUR ? [...doc.slice(0, MAX_PAR_JOUR - 1), doc[rang]] : doc.slice(0, MAX_PAR_JOUR);

                    return (
                        <div
                            key={cle}
                            className={[
                                doc.length === 0 ? "min-h-12 sm:min-h-14" : "min-h-20 sm:min-h-28",
                                "rounded-xl border p-1.5 sm:p-2",
                                "transition-opacity duration-200",
                                contientChoisie ? "border-brand bg-brand/10" : estAujourdhui ? "border-brand/50 bg-white/[0.05]" : "border-white/5 bg-white/[0.03]",
                                choisie && !contientChoisie ? "opacity-45 hover:opacity-100" : "",
                            ].join(" ")}
                        >
                            <span
                                className={`inline-flex h-6 min-w-6 items-center justify-center rounded-full px-1 text-xs font-semibold sm:text-sm ${
                                    estAujourdhui ? "bg-brand text-black" : doc.length ? "text-white" : "text-gray-500"
                                }`}
                            >
                                {i + 1}
                            </span>

                            <div className="mt-1 space-y-1">
                                {visibles.map((o) => {
                                    const actif = cleDe(o) === choisie;
                                    const fini = now ? Date.parse(o.fin) < now.getTime() : false;
                                    return (
                                        <button
                                            key={cleDe(o)}
                                            onClick={() => onChoisir(o)}
                                            title={`${o.event.titre}, ${fmtHeure(o.debut)}${o.event.prix ? `, ${o.event.prix}` : ""}`}
                                            className={[
                                                "block w-full rounded-md px-1.5 py-1 text-left text-[11px] leading-tight transition sm:text-xs",
                                                actif
                                                    ? "bg-brand font-semibold text-black shadow-lg shadow-brand/30"
                                                    : fini
                                                      ? "bg-white/10 text-gray-300 hover:bg-white/20"
                                                      : "bg-brand/15 text-brand hover:bg-brand/30",
                                            ].join(" ")}
                                        >
                                            {/* Petit écran : un simple trait coloré. Grand écran : heure, titre et prix. */}
                                            <span className="hidden sm:block">
                                                <span className="font-bold">{fmtHeure(o.debut)}</span> {o.event.titre}
                                                {o.event.prix && <span className="block opacity-80">{o.event.prix}</span>}
                                            </span>
                                            <span className="block h-1 sm:hidden" />
                                        </button>
                                    );
                                })}
                                {doc.length > MAX_PAR_JOUR && (
                                    <button onClick={() => onChoisir(doc[MAX_PAR_JOUR])} className="block w-full px-1 text-left text-[11px] text-gray-400 hover:text-white">
                                        + {doc.length - MAX_PAR_JOUR} autre{doc.length - MAX_PAR_JOUR > 1 ? "s" : ""}
                                    </button>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
}
