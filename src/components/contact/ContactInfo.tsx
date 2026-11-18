import { IconCalendar, IconHandshake, IconUsers } from "@/components/ui/icons";

const raisons = [
    {
        icon: <IconUsers />,
        titre: "Rejoindre l'antenne",
        texte: "Étudiant et curieux d'entreprendre ? Dis-nous ce qui t'intéresse, on t'explique comment participer.",
    },
    {
        icon: <IconHandshake />,
        titre: "Partenariat & sponsoring",
        texte: "Entreprise ou organisation ? Construisons ensemble quelque chose pour les étudiants-entrepreneurs.",
    },
    {
        icon: <IconCalendar />,
        titre: "Événements",
        texte: "Une question sur un atelier, un workshop ou une rencontre du réseau ? Pose-la ici.",
    },
];

const etapes = [
    "Tu nous envoies ton message avec le formulaire.",
    "L'équipe de l'antenne de Mons le reçoit.",
    "On te répond par e-mail.",
];

// Colonne de gauche de la page Contact : pourquoi nous écrire + comment ça se passe
export default function ContactInfo() {
    return (
        <div className="space-y-8">
            <div className="space-y-4">
                {raisons.map((r) => (
                    <div
                        key={r.titre}
                        className="flex gap-4 rounded-2xl border border-white/10 bg-black/40 p-5 transition hover:border-brand/40"
                    >
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand">
                            {r.icon}
                        </div>
                        <div>
                            <h3 className="font-semibold text-white">{r.titre}</h3>
                            <p className="mt-1 text-sm leading-relaxed text-gray-400">{r.texte}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/40 p-5">
                <h3 className="mb-4 font-semibold text-white">Comment ça se passe ?</h3>
                <ol className="space-y-3">
                    {etapes.map((etape, i) => (
                        <li key={etape} className="flex items-center gap-3 text-sm text-gray-300">
                            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand text-xs font-bold text-black">
                                {i + 1}
                            </span>
                            {etape}
                        </li>
                    ))}
                </ol>
            </div>
        </div>
    );
}
