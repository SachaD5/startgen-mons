"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import Avatar from "@/components/ui/Avatar";
import { Ico } from "@/components/ui/Ico";
import { IconLock, IconUser } from "@/components/ui/icons";
import { useAuth } from "@/components/auth/AuthProvider";

const ICONE_DECONNEXION = "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9";
const ICONE_CHEVRON = "M6 9l6 6 6-6";

const lienMenu =
    "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-gray-200 transition hover:bg-white/5 hover:text-brand";

// Bouton de la Navbar : "Connexion" si visiteur, menu du compte (profil, paramètres, déconnexion) si connecté
export default function AuthButton() {
    const { status, user, logout } = useAuth();
    const router = useRouter();
    const pathname = usePathname();
    const [ouvert, setOuvert] = useState(false);
    const racine = useRef<HTMLDivElement>(null);

    // Le menu se referme quand on change de page (calcul pendant l'affichage, sans effet)
    const [pageOuverte, setPageOuverte] = useState(pathname);
    if (pageOuverte !== pathname) {
        setPageOuverte(pathname);
        setOuvert(false);
    }

    // Ferme le menu : clic en dehors, ou touche Échap
    useEffect(() => {
        if (!ouvert) return;
        const clic = (e: MouseEvent) => {
            if (!racine.current?.contains(e.target as Node)) setOuvert(false);
        };
        const touche = (e: KeyboardEvent) => {
            if (e.key === "Escape") setOuvert(false);
        };
        document.addEventListener("mousedown", clic);
        document.addEventListener("keydown", touche);
        return () => {
            document.removeEventListener("mousedown", clic);
            document.removeEventListener("keydown", touche);
        };
    }, [ouvert]);

    // Pendant la vérification de la session : un emplacement vide de la même taille (évite que la Navbar "saute")
    if (status === "loading") {
        return <div aria-hidden className="h-11 w-28 animate-pulse rounded-full bg-white/5" />;
    }

    if (!user) return <Button href="/login">Connexion</Button>;

    return (
        <div ref={racine} className="relative">
            <button
                type="button"
                onClick={() => setOuvert((o) => !o)}
                aria-haspopup="menu"
                aria-expanded={ouvert}
                aria-label="Menu du compte"
                className={`flex items-center gap-2.5 rounded-full border py-1 pl-1 pr-2.5 transition hover:border-brand/60 sm:pr-3.5 ${
                    ouvert ? "border-brand/60 bg-white/5" : "border-white/10"
                }`}
            >
                <Avatar prenom={user.prenom} nom={user.nom} size="sm" />
                <span className="hidden text-sm font-medium text-white sm:block">{user.prenom}</span>
                <Ico d={ICONE_CHEVRON} className={`h-4 w-4 text-gray-400 transition ${ouvert ? "rotate-180" : ""}`} />
            </button>

            {ouvert && (
                <div
                    role="menu"
                    className="animate-fade-up absolute right-0 top-full z-50 mt-3 w-72 overflow-hidden rounded-2xl border border-white/10 bg-surface shadow-2xl shadow-black/50"
                >
                    <div className="flex items-center gap-3 border-b border-white/10 p-4">
                        <Avatar prenom={user.prenom} nom={user.nom} size="md" />
                        <div className="min-w-0">
                            <p className="truncate font-semibold text-white">
                                {user.prenom} {user.nom}
                            </p>
                            <p className="truncate text-xs text-gray-400">{user.email}</p>
                            <span className="mt-1.5 inline-block rounded-full border border-brand/30 bg-brand/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-brand">
                                {user.role === "ADMIN" ? "Administrateur" : "Membre"}
                            </span>
                        </div>
                    </div>

                    <div className="p-2">
                        <Link href="/compte" role="menuitem" onClick={() => setOuvert(false)} className={lienMenu}>
                            <IconUser className="h-5 w-5" />
                            Mon profil
                        </Link>
                        <Link href="/compte#securite" role="menuitem" onClick={() => setOuvert(false)} className={lienMenu}>
                            <IconLock className="h-5 w-5" />
                            Paramètres et sécurité
                        </Link>
                    </div>

                    <div className="border-t border-white/10 p-2">
                        <button
                            type="button"
                            role="menuitem"
                            onClick={() => {
                                setOuvert(false);
                                logout();
                                router.push("/");
                            }}
                            className={`${lienMenu} w-full text-left`}
                        >
                            <Ico d={ICONE_DECONNEXION} className="h-5 w-5" />
                            Déconnexion
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
