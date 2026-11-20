type Props = { prenom: string; nom: string; size?: "sm" | "md" | "lg" };

const tailles = {
    sm: "h-9 w-9 text-xs",
    md: "h-12 w-12 text-sm",
    lg: "h-24 w-24 text-3xl",
};

// Rond avec les initiales de la personne (ex : "SD")
export default function Avatar({ prenom, nom, size = "md" }: Props) {
    const initiales = `${prenom[0] ?? ""}${nom[0] ?? ""}`.toUpperCase();
    return (
        <div
            aria-hidden
            className={`flex shrink-0 items-center justify-center rounded-full border-2 border-brand/40 bg-brand/10 font-bold text-brand ${tailles[size]}`}
        >
            {initiales}
        </div>
    );
}
