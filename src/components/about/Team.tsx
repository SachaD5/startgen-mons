import SectionTitle from "@/components/ui/SectionTitle";
import { Ico, ICONES } from "@/components/ui/Ico";
import { DEPARTEMENTS } from "@/data/content";

// L'équipe : une carte par département
export default function Team() {
    return (
        <section className="px-6 py-24">
            <div className="mx-auto max-w-6xl">
                <SectionTitle
                    badge="Notre équipe"
                    title="Six départements, une même équipe"
                    subtitle="Chacun a son rôle, et les départements travaillent ensemble pour que chaque événement et chaque projet réussisse."
                />
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {DEPARTEMENTS.map((d) => (
                        <article key={d.nom} className="flex flex-col rounded-3xl border border-white/10 bg-black/30 p-7 transition hover:border-brand/40">
                            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand/10 text-brand">
                                <Ico d={d.icone} className="h-5 w-5" />
                            </span>
                            <h3 className="mt-5 text-xl font-bold">{d.nom}</h3>
                            <p className="mt-2 text-sm text-gray-300">{d.role}</p>
                            <ul className="mt-4 space-y-2 border-t border-white/10 pt-4 text-sm text-gray-400">
                                {d.missions.map((m) => (
                                    <li key={m} className="flex items-start gap-2">
                                        <Ico d={ICONES.check} className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                                        {m}
                                    </li>
                                ))}
                            </ul>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
