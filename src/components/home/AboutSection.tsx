// src/components/home/AboutSection.tsx
import Link from "next/link";

export default function AboutSection() {
    return (
        <section id="about" className="py-28 px-6 bg-[#171717] border-b border-white/10 text-white scroll-mt-20">
            <div className="max-w-6xl mx-auto">

                {/* En-tête de section (Titre simplifié sans LJE et sans ligne de séparation bizarre) */}
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <span className="bg-[#00D9FF]/10 text-[#00D9FF] text-xs font-semibold px-4 py-1.5 rounded-full uppercase tracking-widest mb-4 inline-block border border-[#00D9FF]/25">
                        Nos Origines & Notre Vision
                    </span>
                    <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-6">
                        D'où vient <span className="text-[#00D9FF]">StartGen</span> ?
                    </h2>
                    <p className="text-gray-400 text-base md:text-lg leading-relaxed">
                        Né de la dynamique entrepreneuriale impulsée par <strong className="text-white font-semibold">LJE (Les Jeunes Entreprises) à Liège</strong> (<a href="https://lje.be" target="_blank" rel="noopener noreferrer" className="text-[#00D9FF] underline hover:text-[#00bfe6] transition">découvrir le site de LJE</a>), le mouvement StartGen s'est développé pour devenir un tremplin incontournable en Belgique, avant de s'implanter à <strong className="text-white font-semibold">Mons</strong> en partenariat avec la HELHa.
                    </p>
                </div>

                {/* Bloc narratif sur l'origine et l'expansion */}
                <div className="grid md:grid-cols-2 gap-12 items-center mb-28 bg-black/40 border border-white/10 p-8 md:p-12 rounded-3xl backdrop-blur-sm">
                    <div>
                        <h3 className="text-2xl font-bold mb-4 text-white tracking-tight">De Liège (LJE) à l'antenne de Mons</h3>
                        <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-4">
                            L'histoire commence à Liège sous l'impulsion de <strong>LJE (Les Jeunes Entreprises)</strong>, avec une vision claire : connecter le monde académique et l'entrepreneuriat de terrain. C'est cette structure de référence qui a permis de libérer le potentiel créatif des jeunes.
                        </p>
                        <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                            Aujourd'hui, l'antenne de <strong>Mons</strong> (portée par les étudiants de la HELHa) pérennise cet héritage en offrant un accès direct à ce réseau national d'experts, de mentors et de programmes d'accompagnement éprouvés.
                        </p>
                    </div>
                    <div className="border-l border-white/15 pl-6 md:pl-10 space-y-8">
                        <div>
                            <h4 className="text-white font-semibold text-base mb-2 tracking-wide uppercase text-xs text-[#00D9FF]">L'héritage LJE</h4>
                            <p className="text-gray-400 text-sm leading-relaxed">S'appuyer sur l'expertise reconnue de LJE pour offrir un cadre d'apprentissage concret et professionnalisant.</p>
                        </div>
                        <div>
                            <h4 className="text-white font-semibold text-base mb-2 tracking-wide uppercase text-xs text-[#00D9FF]">Synergie Régionale</h4>
                            <p className="text-gray-400 text-sm leading-relaxed">Créer des ponts solides entre les écosystèmes entrepreneuriaux de Liège, de Mons et de toute la Fédération Wallonie-Bruxelles.</p>
                        </div>
                    </div>
                </div>

                {/* Titre de la section Programme à Mons */}
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h3 className="text-2xl md:text-4xl font-bold mb-3 tracking-tight">Le Programme à l'antenne de Mons</h3>
                    <p className="text-gray-400 text-sm">Découvrez concrètement ce que nous mettons en place pour nos étudiants entrepreneurs.</p>
                </div>

                {/* Blocs alternés (Image à gauche / Texte à droite puis inverse) */}
                <div className="space-y-16">

                    {/* Bloc 1 : Image à gauche, Texte à droite */}
                    <div className="grid md:grid-cols-2 gap-8 items-center bg-black/30 border border-white/10 p-6 md:p-8 rounded-3xl">
                        <div className="w-full h-64 md:h-80 rounded-2xl bg-white/5 border border-white/10 overflow-hidden flex items-center justify-center relative">
                            <img src="/esteban.jpg" alt="Incubation et Coaching StartGen Mons" className="w-full h-full object-cover" />
                        </div>
                        <div className="space-y-4">
                            <span className="text-xs font-mono text-[#00D9FF] uppercase tracking-wider">Axe 01</span>
                            <h4 className="text-2xl font-bold text-white">Incubation & Suivi Personnalisé</h4>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                À Mons, chaque projet bénéficie d'un suivi sur-mesure. Nous aidons les étudiants à structurer leur business plan, valider leur modèle économique et préparer leurs pitchs face à de véritables investisseurs et partenaires régionaux.
                            </p>
                        </div>
                    </div>

                    {/* Bloc 2 : Texte à gauche, Image à droite */}
                    <div className="grid md:grid-cols-2 gap-8 items-center bg-black/30 border border-white/10 p-6 md:p-8 rounded-3xl">
                        <div className="space-y-4 order-2 md:order-1">
                            <span className="text-xs font-mono text-[#00D9FF] uppercase tracking-wider">Axe 02</span>
                            <h4 className="text-2xl font-bold text-white">Workshops Pratiques & Formations Tech</h4>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                Parce qu'un projet nécessite des compétences techniques et managériales solides, nous organisons régulièrement des ateliers pratiques axés sur le développement web, le marketing digital, la gestion de projet et la conformité légale.
                            </p>
                        </div>
                        <div className="w-full h-64 md:h-80 rounded-2xl bg-white/5 border border-white/10 overflow-hidden flex items-center justify-center relative order-1 md:order-2">
                            <img src="/fond_ecran2.jpg" alt="Workshops StartGen Mons" className="w-full h-full object-cover" />
                        </div>
                    </div>

                    {/* Bloc 3 : Image à gauche, Texte à droite */}
                    <div className="grid md:grid-cols-2 gap-8 items-center bg-black/30 border border-white/10 p-6 md:p-8 rounded-3xl">
                        <div className="w-full h-64 md:h-80 rounded-2xl bg-white/5 border border-white/10 overflow-hidden flex items-center justify-center relative">
                            <img src="/fond_ecran.jpg" alt="Networking StartGen Mons" className="w-full h-full object-cover" />
                        </div>
                        <div className="space-y-4">
                            <span className="text-xs font-mono text-[#00D9FF] uppercase tracking-wider">Axe 03</span>
                            <h4 className="text-2xl font-bold text-white">Networking & Connexion avec LJE</h4>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                Participez à des afterworks exclusifs, des hackathons inter-antennes et des événements de networking avec le réseau national de LJE. Développez votre carnet d'adresses et trouvez vos futurs associés dès les bancs de la HELHa.
                            </p>
                        </div>
                    </div>

                </div>

            </div>
        </section>
    );
}
