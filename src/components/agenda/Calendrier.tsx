"use client";

import { JOURS, MAX_PAR_JOUR, fmtHeure, cleDe, Occurence, Mois } from "@/components/agenda/outils";
import { Ico, ICONES } from "@/components/ui/Ico";

export function Calendrier({
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
                        <Ico d={ICONES.left} className="h-5 w-5" />
                    </button>
                    <button onClick={() => aller(1)} aria-label="Mois suivant" className="rounded-lg p-2 text-gray-300 transition hover:bg-white/10">
                        <Ico d={ICONES.right} className="h-5 w-5" />
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
