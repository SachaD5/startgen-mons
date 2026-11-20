"use client";

import Image from "next/image";
import { jourDe, fmt, fmtHeure, fmtMoisAnnee, cleDe, couleurVille, teinte, Occurence, Mois, Vue } from "@/components/agenda/outils";
import {  } from "@/components/ui/Ico";

export function ListeDuMois({
    mois, occurences, now, choisie, onChoisir,
}: {
    mois: Mois;
    occurences: Occurence[];
    now: Date | null;
    choisie: string | null;
    onChoisir: (o: Occurence) => void;
}) {
    const debutMois = `${mois.y}-${String(mois.m + 1).padStart(2, "0")}-01`;
    // On part d'aujourd'hui (ou du 1er du mois affiché si on a avancé dans le calendrier) : le passé n'intéresse personne
    const aujourdhui = now ? jourDe(now) : null;
    const depuisAujourdhui = aujourdhui !== null && aujourdhui >= debutMois;
    const suite = occurences.filter((o) => {
        if (depuisAujourdhui) return jourDe(o.debut) >= aujourdhui && (!now || Date.parse(o.fin) >= now.getTime());
        return jourDe(o.debut) >= debutMois;
    });
    const titre = new Intl.DateTimeFormat("fr-BE", { timeZone: "UTC", month: "long", year: "numeric" }).format(new Date(Date.UTC(mois.y, mois.m, 1)));
    const jours = [...new Set(suite.map((o) => jourDe(o.debut)))];
    const moisDuJour = (j: string) => j.slice(0, 7);

    return (
        // Sur grand écran, la colonne prend exactement la hauteur du calendrier (même s'il s'agrandit) et défile à l'intérieur
        <div className="relative xl:h-full xl:min-h-[32rem]">
        <div className="scroll-discret rounded-2xl bg-white/[0.04] p-5 xl:absolute xl:inset-0 xl:overflow-y-auto">
            <h3 className="text-lg font-bold text-white">
                {depuisAujourdhui ? "À partir d'aujourd'hui" : <>À partir de <span className="capitalize">{titre}</span></>}
            </h3>
            <p className="mb-4 text-sm text-gray-400">
                {suite.length === 0 ? "Aucun événement à venir." : `${suite.length} événement${suite.length > 1 ? "s" : ""}. Clique pour voir la fiche.`}
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
        </div>
    );
}

// Vue « liste » : tout, groupé par mois
export function ListeParMois({
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
    const c = couleurVille(event.ville);
    const boite = fini ? undefined : { backgroundColor: teinte(c, 0.14), color: c };

    return (
        <li>
            <button
                onClick={onChoisir}
                aria-pressed={actif}
                style={actif ? { borderColor: c, backgroundColor: teinte(c, 0.11) } : { borderColor: teinte(c, 0.25) }}
                className="flex h-full w-full gap-4 rounded-2xl border bg-black/40 p-4 text-left transition hover:brightness-110"
            >
                {compact ? (
                    <div style={boite} className={`flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-xl text-sm font-bold ${fini ? "bg-white/10 text-gray-300" : ""}`}>
                        <span>{fmtHeure(o.debut)}</span>
                        <span className="text-[11px] font-medium opacity-70">{fmtHeure(o.fin)}</span>
                    </div>
                ) : (
                    <div style={boite} className={`flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-xl ${fini ? "bg-white/10 text-gray-300" : ""}`}>
                        <span className="text-2xl font-extrabold leading-none">{fmt(o.debut, { day: "numeric" })}</span>
                        <span className="mt-1 text-[11px] font-semibold uppercase">{fmt(o.debut, { month: "short" }).replace(".", "")}</span>
                    </div>
                )}
                <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                        <span className="h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: c }} />
                        <h3 className="truncate font-semibold leading-snug text-white">{event.titre}</h3>
                    </div>
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
                        <p className="mt-2 text-xs font-semibold text-emerald-300">{event.prix}</p>
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
