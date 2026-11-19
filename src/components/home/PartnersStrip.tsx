import Image from "next/image";
import Link from "next/link";
import SectionTitle from "@/components/ui/SectionTitle";
import { Ico, ICONES } from "@/components/ui/Ico";
import { partners } from "@/data/partners";

// Bandeau de logos sur l'accueil (le détail est sur la page Partenaires)
export default function PartnersStrip() {
    return (
        <section className="border-t border-white/10 bg-black/30 px-6 py-24">
            <div className="mx-auto max-w-6xl">
                <SectionTitle badge="Partenaires" title="Ils nous font confiance" subtitle="Des sponsors et des partenaires qui soutiennent les étudiants entrepreneurs." />
                <ul className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-7">
                    {partners.map((p) => (
                        <li key={p.name} className="relative h-24 rounded-2xl bg-white p-4 transition hover:scale-105">
                            <Image src={p.logo} alt={p.name} fill sizes="160px" className="object-contain p-4" />
                        </li>
                    ))}
                </ul>
                <p className="mt-10 text-center">
                    <Link href="/partenaires" className="inline-flex items-center gap-2 font-semibold text-brand transition hover:text-brand-hover">
                        Découvrir nos partenaires <Ico d={ICONES.arrow} className="h-4 w-4" />
                    </Link>
                </p>
            </div>
        </section>
    );
}
