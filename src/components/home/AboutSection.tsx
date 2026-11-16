import Badge from "@/components/ui/Badge";
import AxeBlock from "@/components/home/AxeBlock";
import { axes } from "@/data/axes";

export default function AboutSection() {
    return (
        <section id="about" className="scroll-mt-20 border-b border-white/10 bg-surface px-6 py-28 text-white">
            <div className="mx-auto max-w-6xl">
                {/* En-tête */}
                <div className="mx-auto mb-20 max-w-3xl text-center">
                    <Badge>Nos Origines & Notre Vision</Badge>
                    <h2 className="mb-6 mt-4 text-3xl font-extrabold tracking-tight md:text-5xl">
                        D&apos;où vient <span className="text-brand">StartGen</span> ?
                    </h2>
                    <p className="text-base leading-relaxed text-gray-400 md:text-lg">
                        Né de la dynamique entrepreneuriale impulsée par{" "}
                        <strong className="font-semibold text-white">LJE (Les Jeunes Entreprises) à Liège</strong> (
                        <a
                            href="https://lje.be"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-brand underline transition hover:text-brand-hover"
                        >
                            découvrir le site de LJE
                        </a>
                        ), le mouvement StartGen s&apos;est développé pour devenir un tremplin incontournable en
                        Belgique, avant de s&apos;implanter à <strong className="font-semibold text-white">Mons</strong>{" "}
                        en partenariat avec la HELHa.
                    </p>
                </div>

                {/* Origine et expansion */}
                <div className="mb-28 grid items-center gap-12 rounded-3xl border border-white/10 bg-black/40 p-8 backdrop-blur-sm md:grid-cols-2 md:p-12">
                    <div>
                        <h3 className="mb-4 text-2xl font-bold tracking-tight text-white">
                            De Liège (LJE) à l&apos;antenne de Mons
                        </h3>
                        <p className="mb-4 text-sm leading-relaxed text-gray-400 md:text-base">
                            L&apos;histoire commence à Liège sous l&apos;impulsion de{" "}
                            <strong>LJE (Les Jeunes Entreprises)</strong>, avec une vision claire : connecter le monde
                            académique et l&apos;entrepreneuriat de terrain. C&apos;est cette structure de référence qui a
                            permis de libérer le potentiel créatif des jeunes.
                        </p>
                        <p className="text-sm leading-relaxed text-gray-400 md:text-base">
                            Aujourd&apos;hui, l&apos;antenne de <strong>Mons</strong> (portée par les étudiants de la
                            HELHa) pérennise cet héritage en offrant un accès direct à ce réseau national d&apos;experts,
                            de mentors et de programmes d&apos;accompagnement éprouvés.
                        </p>
                    </div>

                    <div className="space-y-8 border-l border-white/15 pl-6 md:pl-10">
                        <div>
                            <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-brand">
                                L&apos;héritage LJE
                            </h4>
                            <p className="text-sm leading-relaxed text-gray-400">
                                S&apos;appuyer sur l&apos;expertise reconnue de LJE pour offrir un cadre d&apos;apprentissage
                                concret et professionnalisant.
                            </p>
                        </div>
                        <div>
                            <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-brand">
                                Synergie Régionale
                            </h4>
                            <p className="text-sm leading-relaxed text-gray-400">
                                Créer des ponts solides entre les écosystèmes entrepreneuriaux de Liège, de Mons et de
                                toute la Fédération Wallonie-Bruxelles.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Programme */}
                <div className="mx-auto mb-16 max-w-2xl text-center">
                    <h3 className="mb-3 text-2xl font-bold tracking-tight md:text-4xl">
                        Le Programme à l&apos;antenne de Mons
                    </h3>
                    <p className="text-sm text-gray-400">
                        Découvrez concrètement ce que nous mettons en place pour nos étudiants entrepreneurs.
                    </p>
                </div>

                <div className="space-y-16">
                    {axes.map((axe, i) => (
                        <AxeBlock key={axe.titre} numero={i + 1} inverse={i % 2 === 1} {...axe} />
                    ))}
                </div>
            </div>
        </section>
    );
}
