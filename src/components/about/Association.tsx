import { NOTRE_ASSOCIATION } from "@/data/content";

// Mission, objectif, vision : trois colonnes
export default function Association() {
    return (
        <section className="px-6 py-20">
            <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
                {NOTRE_ASSOCIATION.map((b) => (
                    <article key={b.titre} className="rounded-3xl border border-white/10 bg-black/30 p-8">
                        <h2 className="text-2xl font-bold text-brand">{b.titre}</h2>
                        <div className="mt-4 space-y-4 text-sm leading-relaxed text-gray-300">
                            {b.texte.map((t) => (
                                <p key={t}>{t}</p>
                            ))}
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
}
