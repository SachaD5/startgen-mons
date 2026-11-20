"use client";

import { JOURS, MAX_PAR_JOUR, fmtHeure, cleDe, couleurVille, teinte, Occurence, Mois } from "@/components/agenda/outils";
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
                    <button onClick={aujourdhuiMois} className="mr-1 rounded-lg border border-white/15 px-3 py-1.5 text-sm text-gray-200 transition hover:border-[#3B82F6] hover:text-[#60A5FA]">
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
                    const choisiDuJour = rang >= 0 ? doc[rang] : null;
                    const visibles = rang >= MAX_PAR_JOUR ? [...doc.slice(0, MAX_PAR_JOUR - 1), doc[rang]] : doc.slice(0, MAX_PAR_JOUR);
                    // Événements qui commencent à la même heure : côte à côte (pas l'un sous l'autre)
                    const groupes: Occurence[][] = [];
                    for (const o of visibles) {
                        const g = groupes[groupes.length - 1];
                        if (g && g[0].debut === o.debut) g.push(o);
                        else groupes.push([o]);
                    }
                    // Couleur du jour présent : celle du 1er événement pas encore fini (en cours ou à venir).
                    // À égalité d'heure, celui créé en premier (plus petit numéro). Sinon : bleu par défaut.
                    const encore = now && estAujourdhui ? doc.filter((o) => Date.parse(o.fin) >= now.getTime()).sort((a, b) => Date.parse(a.debut) - Date.parse(b.debut) || a.event.uid - b.event.uid) : [];
                    const couleurJour = encore[0] ? couleurVille(encore[0].event.ville) : null;

                    return (
                        <div
                            key={cle}
                            style={
                                choisiDuJour
                                    ? { borderColor: couleurVille(choisiDuJour.event.ville), backgroundColor: teinte(couleurVille(choisiDuJour.event.ville), 0.1) }
                                    : couleurJour
                                      ? { borderColor: teinte(couleurJour, 0.6), backgroundColor: teinte(couleurJour, 0.07) }
                                      : undefined
                            }
                            className={[
                                doc.length === 0 ? "min-h-12 sm:min-h-14" : "min-h-20 sm:min-h-28",
                                "rounded-xl border p-1.5 sm:p-2",
                                "transition-opacity duration-200",
                                contientChoisie ? "" : estAujourdhui && !couleurJour ? "border-[#3B82F6]/50 bg-white/[0.05]" : "border-white/5 bg-white/[0.03]",
                                choisie && !contientChoisie ? "opacity-45 hover:opacity-100" : "",
                            ].join(" ")}
                        >
                            <span
                                style={estAujourdhui && couleurJour ? { backgroundColor: couleurJour } : undefined}
                                className={`inline-flex h-6 min-w-6 items-center justify-center rounded-full px-1 text-xs font-semibold sm:text-sm ${
                                    estAujourdhui ? (couleurJour ? "text-black" : "bg-[#3B82F6] text-white") : doc.length ? "text-white" : "text-gray-500"
                                }`}
                            >
                                {i + 1}
                            </span>

                            <div className="mt-1 space-y-1">
                                {groupes.map((g) => (
                                    <div key={cleDe(g[0])} className="flex gap-1">
                                    {g.map((o) => {
                                    const actif = cleDe(o) === choisie;
                                    const fini = now ? Date.parse(o.fin) < now.getTime() : false;
                                    const c = couleurVille(o.event.ville);
                                    return (
                                        <button
                                            key={cleDe(o)}
                                            onClick={() => onChoisir(o)}
                                            title={`${o.event.titre}, ${fmtHeure(o.debut)}${o.event.prix ? `, ${o.event.prix}` : ""}`}
                                            style={
                                                actif
                                                    ? { backgroundColor: c, color: "#000", boxShadow: `0 6px 16px ${teinte(c, 0.35)}` }
                                                    : fini
                                                      ? { borderLeft: `3px solid ${c}` }
                                                      : { backgroundColor: teinte(c, 0.16), color: c, borderLeft: `3px solid ${c}` }
                                            }
                                            className={[
                                                "block min-w-0 flex-1 overflow-hidden rounded-md px-1.5 py-1 text-left text-[11px] leading-tight transition hover:brightness-125 sm:text-xs",
                                                actif ? "font-semibold" : fini ? "bg-white/10 text-gray-300" : "",
                                            ].join(" ")}
                                        >
                                            {/* Petit écran : un simple trait coloré. Grand écran : heure, titre et prix. */}
                                            <span className="hidden sm:block">
                                                <span className="font-semibold">{o.event.titre}</span>
                                                {o.event.prix && <span className="mt-0.5 block text-[10px] font-normal italic opacity-80 sm:text-[11px]">{o.event.prix}</span>}
                                            </span>
                                            <span style={{ backgroundColor: actif ? "#000" : c }} className="block h-1.5 rounded-full sm:hidden" />
                                        </button>
                                    );
                                    })}
                                    </div>
                                ))}
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
