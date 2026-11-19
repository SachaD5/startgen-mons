import Image from "next/image";
import PageBanner from "@/components/ui/PageBanner";
import SectionTitle from "@/components/ui/SectionTitle";
import Button from "@/components/ui/Button";
import { Ico, ICONES } from "@/components/ui/Ico";
import { partners } from "@/data/partners";

export const metadata = { title: "Partenaires" };

export default function PartenairesPage() {
    return (
        <>
            <PageBanner
                badge="Partenaires"
                title="Ceux qui rendent Startgen Mons possible"
                subtitle="Comme LJE, Startgen Mons est soutenu par des sponsors et des partenaires qui croient en l'entrepreneuriat étudiant."
                image="/startgen-036.jpg"
                position="50% 40%"
            />

            <section className="px-6 py-24">
                <div className="mx-auto max-w-6xl">
                    <SectionTitle
                        title={`${partners.length} partenaires à nos côtés`}
                        subtitle="Grâce à eux, nous pouvons organiser des événements et orienter les étudiants vers les bonnes ressources pour avancer."
                    />
                    <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {partners.map((p) => (
                            <li key={p.name}>
                                <a
                                    href={p.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group flex h-full flex-col rounded-3xl border border-white/10 bg-black/30 p-6 transition hover:border-brand/50"
                                >
                                    <div className="relative h-28 rounded-2xl bg-white">
                                        <Image src={p.logo} alt={`Logo ${p.name}`} fill sizes="320px" className="object-contain p-5" />
                                    </div>
                                    <h3 className="mt-5 text-lg font-bold">{p.name}</h3>
                                    <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-400">{p.role ?? "Partenaire du réseau Startgen."}</p>
                                    <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand">
                                        Visiter le site <Ico d={ICONES.ext} className="h-4 w-4" />
                                    </span>
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            <section className="px-6 pb-24">
                <div className="mx-auto max-w-4xl rounded-3xl border border-brand/30 bg-gradient-to-br from-brand/15 via-black/40 to-black/40 p-10 text-center md:p-14">
                    <h2 className="text-2xl font-extrabold tracking-tight md:text-3xl">Envie de nous soutenir ?</h2>
                    <p className="mx-auto mt-3 max-w-xl text-gray-300">
                        Partenariat, sponsoring, intervention lors d&apos;un événement : écris-nous et on en discute.
                    </p>
                    <div className="mt-7">
                        <Button href="/contact">Devenir partenaire</Button>
                    </div>
                </div>
            </section>
        </>
    );
}
