import Image from "next/image";
import Link from "next/link";
import AuthButton from "@/components/auth/AuthButton";
import MobileMenu from "@/components/layout/MobileMenu";
import { SITE } from "@/data/site";

// Pour ajouter une page au menu : une ligne ici.
const LIENS = [
    { href: "/", label: "Accueil" },
    { href: "/a-propos", label: "À propos" },
    { href: "/agenda", label: "Agenda" },
    { href: "/localisation", label: "Localisation" },
    { href: "/partenaires", label: "Partenaires" },
    { href: "/contact", label: "Contact" },
];

export default function Navbar() {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-surface px-4 py-4 sm:px-8">
            <div className="flex w-full items-center justify-between">
                {/* Gauche : logo + nom */}
                <Link href="/" className="group flex items-center gap-3">
                    <div className="relative h-11 w-11 overflow-hidden rounded-full border-2 border-brand/40 bg-brand/10 shadow-md transition group-hover:border-brand">
                        <Image src={SITE.logo} alt={`Logo ${SITE.complet}`} fill sizes="44px" className="object-cover" />
                    </div>
                    <div>
                        <span className="block whitespace-nowrap text-xl font-extrabold leading-tight tracking-tight text-white transition group-hover:text-brand">
                            {SITE.nom} <span className="text-brand">{SITE.accent}</span>
                        </span>
                        <span className="hidden text-[11px] font-medium uppercase tracking-wider text-gray-400 sm:block">
                            {SITE.organisation}
                        </span>
                    </div>
                </Link>

                {/* Milieu : liens */}
                <nav className="hidden items-center gap-7 text-sm font-medium text-gray-300 md:flex">
                    {LIENS.map((lien) => (
                        <Link key={lien.href} href={lien.href} className="transition hover:text-brand">
                            {lien.label}
                        </Link>
                    ))}
                </nav>

                {/* Droite : Connexion (ou prénom + Déconnexion si connecté) et menu des petits écrans */}
                <div className="flex items-center gap-3">
                    <AuthButton />
                    <MobileMenu liens={LIENS} />
                </div>
            </div>
        </header>
    );
}
