import Link from "next/link";
import SectionTitle from "@/components/ui/SectionTitle";
import { Ico, ICONES } from "@/components/ui/Ico";
import { PILIERS } from "@/data/content";

// "Ce qu'on te propose" : 3 cartes + lien vers la page À propos
export default function Piliers() {
    return (
        <section className="px-6 py-24">
            <div className="mx-auto max-w-6xl">
                <SectionTitle
                    badge="Notre mission"
                    title="Donner envie d'entreprendre aux étudiants de Mons"
                    subtitle="Startgen Mons fait partie du réseau Startgen Belgium, dans le programme LJE – Les Jeunes Entreprises. Tout étudiant de la ville peut participer."
                />
                <div className="grid gap-6 md:grid-cols-3">
                    {PILIERS.map((p) => (
                        <article key={p.titre} className="rounded-3xl border border-white/10 bg-black/30 p-8 transition hover:border-brand/40">
                            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand/10 text-brand">
                                <Ico d={p.icone} className="h-6 w-6" />
                            </span>
                            <h3 className="mt-6 text-xl font-bold">{p.titre}</h3>
                            <p className="mt-3 text-sm leading-relaxed text-gray-400">{p.texte}</p>
                        </article>
                    ))}
                </div>
                <p className="mt-10 text-center">
                    <Link href="/a-propos" className="inline-flex items-center gap-2 font-semibold text-brand transition hover:text-brand-hover">
                        Découvrir notre mission et notre équipe <Ico d={ICONES.arrow} className="h-4 w-4" />
                    </Link>
                </p>
            </div>
        </section>
    );
}
