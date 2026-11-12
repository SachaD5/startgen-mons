import Link from "next/link";

type Props = {
    children: React.ReactNode;
    href?: string;
    variant?: "solid" | "outline";
    type?: "button" | "submit";
    disabled?: boolean;
    onClick?: () => void;
    className?: string;
};

const base =
    "inline-block rounded-xl px-6 py-3 text-sm font-semibold text-center transition disabled:opacity-50";
const variants = {
    solid: "bg-brand text-black hover:bg-brand-hover",
    outline: "border border-brand text-brand hover:bg-brand/10",
};

export default function Button({
                                   children, href, variant = "solid", type = "button", disabled, onClick, className = "",
                               }: Props) {
    const classes = `${base} ${variants[variant]} ${className}`;
    if (href) {
        return <Link href={href} className={classes}>{children}</Link>;
    }
    return (
        <button type={type} disabled={disabled} onClick={onClick} className={classes}>
            {children}
        </button>
    );
}
