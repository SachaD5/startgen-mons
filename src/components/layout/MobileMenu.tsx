"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Ico, ICONES } from "@/components/ui/Ico";

type Lien = { href: string; label: string };

// Menu des petits écrans (téléphone) : un bouton "burger" qui ouvre la liste des pages
export default function MobileMenu({ liens }: { liens: Lien[] }) {
    const [ouvert, setOuvert] = useState(false);
    const pathname = usePathname();

    // Le menu se referme quand on change de page (calcul pendant l'affichage, sans effet)
    const [pageOuverte, setPageOuverte] = useState(pathname);
    if (pageOuverte !== pathname) {
        setPageOuverte(pathname);
        setOuvert(false);
    }

    return (
        <div className="md:hidden">
            <button
                type="button"
                onClick={() => setOuvert((o) => !o)}
                aria-expanded={ouvert}
                aria-label={ouvert ? "Fermer le menu" : "Ouvrir le menu"}
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 text-gray-200 transition hover:border-brand hover:text-brand"
            >
                {ouvert ? <Ico d={ICONES.close} className="h-5 w-5" /> : <Ico d="M4 7h16M4 12h16M4 17h16" className="h-5 w-5" />}
            </button>

            {ouvert && (
                <nav className="absolute inset-x-0 top-full border-b border-white/10 bg-surface px-6 pb-4 pt-2 shadow-2xl">
                    <ul>
                        {liens.map((l) => (
                            <li key={l.href}>
                                <Link
                                    href={l.href}
                                    className={`block border-b border-white/5 py-3 text-base ${pathname === l.href ? "font-semibold text-brand" : "text-gray-200"}`}
                                >
                                    {l.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            )}
        </div>
    );
}
