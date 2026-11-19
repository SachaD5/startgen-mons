import Badge from "@/components/ui/Badge";

type Props = { badge?: string; title: string; subtitle?: string; center?: boolean };

// Titre de section (badge + titre + phrase d'intro), utilisé sur l'accueil et les autres pages
export default function SectionTitle({ badge, title, subtitle, center = true }: Props) {
    return (
        <div className={`mb-12 max-w-3xl ${center ? "mx-auto text-center" : ""}`}>
            {badge && <Badge>{badge}</Badge>}
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight md:text-4xl">{title}</h2>
            {subtitle && <p className="mt-4 text-gray-400 md:text-lg">{subtitle}</p>}
        </div>
    );
}
