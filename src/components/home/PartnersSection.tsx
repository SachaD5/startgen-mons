import Image from "next/image";
import Badge from "@/components/ui/Badge";
import { partners } from "@/data/partners";

export default function PartnersSection() {
    return (
        <section id="partners" className="relative overflow-hidden border-b border-white/10 bg-surface px-6 py-24 text-white">
            <div className="mx-auto max-w-7xl text-center">
                <div className="mx-auto mb-16 max-w-3xl">
                    <Badge>Écosystème & Partenariats</Badge>
                    <h3 className="mt-4 text-2xl font-extrabold tracking-tight md:text-4xl">
                        Nos {partners.length} Partenaires Officiels
                    </h3>
                    <p className="mt-4 text-sm leading-relaxed text-gray-400 md:text-base">
                        Grâce à l&apos;engagement de nos partenaires de référence, StartGen offre aux étudiants un pont
                        direct entre l&apos;apprentissage académique et la réalité du monde entrepreneurial belge.
                    </p>
                </div>

                <div className="grid grid-cols-2 items-center gap-4 sm:grid-cols-3 lg:grid-cols-7">
                    {partners.map((partner) => (
                        <a
                            key={partner.name}
                            href={partner.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative flex h-28 items-center justify-center overflow-hidden rounded-2xl border border-white/15 bg-black/30 p-4 shadow-md transition-all duration-300 hover:border-brand hover:shadow-[0_0_20px_rgba(0,217,255,0.3)]"
                        >
                            {/* Tous les logos ont la même zone : object-contain les adapte */}
                            <div className="relative h-full w-full">
                                <Image
                                    src={partner.logo}
                                    alt={partner.name}
                                    fill
                                    sizes="180px"
                                    className="object-contain transition-transform duration-300 group-hover:scale-110"
                                />
                            </div>
                            <span className="absolute bottom-1.5 translate-y-1 text-[9px] font-medium text-brand opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                                Cliquer pour découvrir
                            </span>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
}
