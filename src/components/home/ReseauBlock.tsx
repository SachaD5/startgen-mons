import Image from "next/image";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { Ico, ICONES } from "@/components/ui/Ico";

const POINTS = [
    "Aucun lien avec une université ou une haute école : tout étudiant de Mons peut participer",
    "Un club qui fait partie de Startgen Belgium (Mons, Louvain, Liège et Namur)",
    "Un accompagnement concret : subsides, conseils financiers, mentors",
];

// Bloc photo + texte : ce qui rend Startgen Mons différent
export default function ReseauBlock() {
    return (
        <section className="px-6 py-24">
            <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
                <div className="relative h-80 overflow-hidden rounded-3xl border border-white/10 lg:h-[28rem]">
                    <Image src="/startgen-165.jpg" alt="Conférence Startgen Mons devant une salle remplie" fill sizes="(min-width: 1024px) 560px, 100vw" className="object-cover" />
                </div>
                <div>
                    <Badge>Ouvert à tous les étudiants</Badge>
                    <h2 className="mt-4 text-3xl font-extrabold tracking-tight md:text-4xl">Un club étudiant, pour tous les étudiants</h2>
                    <p className="mt-4 text-gray-400 md:text-lg">
                        Startgen Mons est un club d&apos;étudiants qui organise des événements et accompagne celles et ceux qui veulent se lancer.
                    </p>
                    <ul className="mt-6 space-y-3">
                        {POINTS.map((p) => (
                            <li key={p} className="flex items-start gap-3 text-sm text-gray-300">
                                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand/15 text-brand">
                                    <Ico d={ICONES.check} className="h-3.5 w-3.5" />
                                </span>
                                {p}
                            </li>
                        ))}
                    </ul>
                    <div className="mt-8 flex flex-wrap gap-3">
                        <Button href="/a-propos">En savoir plus</Button>
                        <Button href="/localisation" variant="outline">Voir le réseau</Button>
                    </div>
                </div>
            </div>
        </section>
    );
}
