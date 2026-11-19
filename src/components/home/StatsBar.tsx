import { CHIFFRES } from "@/data/content";

// Les chiffres clés, juste sous la grande image d'accueil
export default function StatsBar() {
    return (
        <section className="border-b border-white/10 bg-black/30 px-6 py-10">
            <dl className="mx-auto grid max-w-6xl grid-cols-2 gap-y-8 md:grid-cols-4 md:divide-x md:divide-white/10">
                {CHIFFRES.map((c) => (
                    <div key={c.label} className="px-4 text-center">
                        <dt className="text-4xl font-extrabold text-brand md:text-5xl">{c.valeur}</dt>
                        <dd className="mx-auto mt-2 max-w-[14rem] text-sm text-gray-400">{c.label}</dd>
                    </div>
                ))}
            </dl>
        </section>
    );
}
