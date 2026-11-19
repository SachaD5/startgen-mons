import Image from "next/image";
import Badge from "@/components/ui/Badge";

type Props = {
    badge: string;
    title: string;
    subtitle: string;
    image: string;
    /** Partie de la photo à montrer, ex. "50% 40%" */
    position?: string;
};

// Grand bandeau avec une photo en fond, en haut des pages "À propos", "Localisation", "Partenaires"
export default function PageBanner({ badge, title, subtitle, image, position = "50% 50%" }: Props) {
    return (
        <header className="relative overflow-hidden border-b border-white/10 px-6 py-20 md:py-28">
            <Image src={image} alt="" fill sizes="100vw" className="object-cover" style={{ objectPosition: position }} priority />
            <div className="absolute inset-0 bg-gradient-to-r from-surface/95 via-surface/80 to-brand/20" />
            <div className="relative mx-auto max-w-6xl [text-shadow:0_2px_12px_rgb(0_0_0/0.7)]">
                <Badge>{badge}</Badge>
                <h1 className="mt-4 max-w-3xl text-4xl font-extrabold tracking-tight md:text-5xl">{title}</h1>
                <p className="mt-4 max-w-2xl text-base text-gray-300 md:text-lg">{subtitle}</p>
            </div>
        </header>
    );
}
