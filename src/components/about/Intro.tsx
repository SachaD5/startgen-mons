import SectionTitle from "@/components/ui/SectionTitle";

// Qui sommes-nous : le réseau Startgen Belgium et LJE
export default function Intro() {
    return (
        <section className="px-6 pt-24">
            <div className="mx-auto max-w-6xl">
                <SectionTitle badge="Qui sommes-nous ?" title="Un club étudiant dans un réseau national" center={false} />
                <div className="grid gap-10 text-gray-400 md:grid-cols-2 md:text-lg">
                    <p className="leading-relaxed">
                        <strong className="font-semibold text-white">Startgen Mons</strong> fait partie du réseau{" "}
                        <strong className="font-semibold text-white">Startgen Belgium</strong>, un ensemble de clubs étudiants intégrés au programme{" "}
                        <a href="https://lje.be" target="_blank" rel="noopener noreferrer" className="text-brand underline transition hover:text-brand-hover">
                            LJE – Les Jeunes Entreprises
                        </a>
                        . Pour l&apos;année 2025-2026, il regroupe quatre clubs : Mons, Louvain, Liège et Namur.
                    </p>
                    <p className="leading-relaxed">
                        Ces clubs promeuvent l&apos;entrepreneuriat chez les étudiants de l&apos;enseignement supérieur, sans lien direct avec une université ou une haute
                        école : tout étudiant de la ville peut y participer. Comme LJE, ils bénéficient du soutien de plusieurs sponsors.
                    </p>
                </div>
            </div>
        </section>
    );
}
