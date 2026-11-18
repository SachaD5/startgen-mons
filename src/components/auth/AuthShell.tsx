import Image from "next/image";
import Badge from "@/components/ui/Badge";
import { IconCheck } from "@/components/ui/icons";
import { SITE } from "@/data/site";

type Props = {
    badge: string;
    title: string;
    subtitle: string;
    /** Panneau de gauche (visible sur grand écran) */
    panelTitle: string;
    panelPoints: string[];
    /** Photo du panneau de gauche (fichier du dossier public/) */
    image: string;
    /** Partie de la photo à montrer : "20% 50%" = plutôt à gauche, "80% 50%" = plutôt à droite */
    imagePosition?: string;
    /** Agrandit la photo pour ne montrer qu'un morceau (1 = photo entière) */
    imageZoom?: number;
    children: React.ReactNode;
};

// Cadre commun des pages Connexion et Inscription :
// à gauche un panneau avec l'image du site, à droite le formulaire.
export default function AuthShell({
    badge,
    title,
    subtitle,
    panelTitle,
    panelPoints,
    image,
    imagePosition = "50% 50%",
    imageZoom = 1,
    children,
}: Props) {
    return (
        <section className="px-4 py-10 md:py-16">
            <div className="animate-fade-up mx-auto grid max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-black/40 shadow-2xl lg:grid-cols-2">
                {/* Panneau image (caché sur mobile) */}
                <aside className="relative hidden flex-col justify-between overflow-hidden p-10 lg:flex">
                    <Image
                        src={image}
                        alt=""
                        fill
                        sizes="(min-width: 1024px) 1400px, 0px"
                        className="object-cover"
                        style={{
                            objectPosition: imagePosition,
                            transform: `scale(${imageZoom})`,
                            transformOrigin: imagePosition,
                        }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-surface/90 via-surface/80 to-brand/30" />

                    <div className="relative flex items-center gap-3">
                        <div className="relative h-11 w-11 overflow-hidden rounded-full border-2 border-brand/40">
                            <Image src={SITE.logo} alt="" fill sizes="44px" className="object-cover" />
                        </div>
                        <span className="text-lg font-extrabold tracking-tight">
                            {SITE.nom} <span className="text-brand">{SITE.accent}</span>
                        </span>
                    </div>

                    <div className="relative">
                        <h2 className="mb-6 text-3xl font-extrabold leading-tight tracking-tight">{panelTitle}</h2>
                        <ul className="space-y-4">
                            {panelPoints.map((point) => (
                                <li key={point} className="flex items-start gap-3 text-sm text-gray-200">
                                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand/20 text-brand">
                                        <IconCheck className="h-3.5 w-3.5" />
                                    </span>
                                    {point}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <p className="relative text-xs text-gray-400">{SITE.complet} · {SITE.organisation}</p>
                </aside>

                {/* Formulaire */}
                <div className="p-6 sm:p-10 lg:p-12">
                    <Badge>{badge}</Badge>
                    <h1 className="mt-4 text-3xl font-extrabold tracking-tight">{title}</h1>
                    <p className="mb-8 mt-2 text-sm text-gray-400">{subtitle}</p>
                    {children}
                </div>
            </div>
        </section>
    );
}
