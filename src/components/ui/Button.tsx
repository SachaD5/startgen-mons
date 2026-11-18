import Link from "next/link";
import { IconSpinner } from "@/components/ui/icons";

type Props = {
    children: React.ReactNode;
    href?: string;
    variant?: "solid" | "outline";
    type?: "button" | "submit";
    disabled?: boolean;
    /** Affiche un petit cercle qui tourne et bloque le bouton (envoi en cours) */
    loading?: boolean;
    onClick?: () => void;
    className?: string;
};

const base =
    "inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-center transition disabled:cursor-not-allowed disabled:opacity-60";
const variants = {
    solid: "bg-brand text-black hover:bg-brand-hover",
    outline: "border border-brand text-brand hover:bg-brand/10",
};

export default function Button({
                                   children, href, variant = "solid", type = "button", disabled, loading, onClick, className = "",
                               }: Props) {
    const classes = `${base} ${variants[variant]} ${className}`;
    if (href) {
        return <Link href={href} className={classes}>{children}</Link>;
    }
    return (
        <button type={type} disabled={disabled || loading} onClick={onClick} className={classes}>
            {loading && <IconSpinner className="h-4 w-4" />}
            {children}
        </button>
    );
}
