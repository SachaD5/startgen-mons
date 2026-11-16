// src/components/layout/Navbar.tsx
import Link from "next/link";

export default function Navbar() {
    return (
        <header className="w-full bg-[#1E1E1E] border-b border-white/10 px-8 py-4 sticky top-0 z-50">
            <div className="w-full flex items-center justify-between">

                {/* GAUCHE : Logo en cercle parfait + Titre + "Les Jeunes Entreprises" */}
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="w-11 h-11 rounded-full bg-[#00D9FF]/10 border-2 border-[#00D9FF]/40 flex items-center justify-center overflow-hidden group-hover:border-[#00D9FF] transition shadow-md">
                        <img
                            src="/logo_startgen"
                            alt="StartGen Mons Logo"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div>
                        <span className="text-xl font-extrabold tracking-tight text-white group-hover:text-[#00D9FF] transition block leading-tight">
                            StartGen <span className="text-[#00D9FF]">Mons</span>
                        </span>
                        <span className="text-[11px] text-gray-400 font-medium tracking-wider uppercase block">
                            Les Jeunes Entreprises
                        </span>
                    </div>
                </Link>

                {/* MILIEU : Tous les liens de navigation (Ancres + Pages) */}
                <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-gray-300">
                    <Link href="/" className="hover:text-[#00D9FF] transition">Accueil</Link>
                    <Link href="/#about" className="hover:text-[#00D9FF] transition">À propos</Link>
                    <Link href="/#map" className="hover:text-[#00D9FF] transition">Localisation</Link>
                    <Link href="/#partners" className="hover:text-[#00D9FF] transition">Partenaires</Link>
                    <Link href="/events" className="hover:text-[#00D9FF] transition">Événements</Link>
                    <Link href="/contact" className="hover:text-[#00D9FF] transition">Contact</Link>
                </nav>

                {/* DROITE : Bouton de connexion */}
                <div>
                    <Link
                        href="/login"
                        className="bg-[#00D9FF] hover:bg-[#00bfe6] text-[#1E1E1E] font-bold text-sm px-6 py-2.5 rounded-xl transition shadow-md inline-block"
                    >
                        Connexion
                    </Link>
                </div>

            </div>
        </header>
    );
}
