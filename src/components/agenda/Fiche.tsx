"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import type { AgendaEvent } from "@/lib/openagenda";
import { fmtJourLong, fmtHeure, paragraphes, estGratuit, telechargerIcs, Occurence } from "@/components/agenda/outils";
import { Ico, ICONES } from "@/components/ui/Ico";

export function BadgePrix({ prix }: { prix: string }) {
    return (
        <span
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
                estGratuit(prix) ? "bg-emerald-500/15 text-emerald-300" : "bg-brand/15 text-brand"
            }`}
        >
            <Ico d={ICONES.euro} className="h-3.5 w-3.5" />
            {prix}
        </span>
    );
}

export function Fiche({ o, now, onFermer, fermerLabel }: { o: Occurence; now: Date | null; onFermer: () => void; fermerLabel: string }) {
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
                        <Ico d={ICONES.close} className="h-5 w-5" />
                    </button>
                </div>

                <ul className="space-y-3 text-sm text-gray-200">
                    <Ligne icone={ICONES.cal}><span className="capitalize">{fmtJourLong(o.debut)}</span></Ligne>
                    <Ligne icone={ICONES.clock}>De {fmtHeure(o.debut)} à {fmtHeure(o.fin)}</Ligne>
                    {lieu && <Ligne icone={ICONES.pin}>{lieu}</Ligne>}
                    <Ligne icone={ICONES.euro}>{event.prix || "Prix non précisé"}</Ligne>
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
                            Voir sur OpenAgenda <Ico d={ICONES.ext} className="h-4 w-4" />
                        </a>
                    )}
                    {!fini && (
                        <button onClick={() => telechargerIcs(o)} className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold text-white transition hover:border-brand hover:text-brand">
                            <Ico d={ICONES.cal} className="h-4 w-4" /> Ajouter à mon agenda
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
