import Badge from "./Badge";

type Props = { badge?: string; title: string; subtitle?: string };

export default function PageHeader({ badge, title, subtitle }: Props) {
    return (
        <div className="mb-10 text-center">
            {badge && <Badge>{badge}</Badge>}
            <h1 className="mt-4 text-3xl font-bold md:text-4xl">{title}</h1>
            {subtitle && <p className="mt-3 text-gray-400">{subtitle}</p>}
        </div>
    );
}
