import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
    return (
        <header className="border-b border-white/10 sticky top-0 bg-[#1E1E1E]/90 backdrop-blur-md z-50 w-full">
            <div className="w-full px-8 h-16 flex items-center justify-between">

                {/* Logo et Nom à gauche (Corrigé sans div imbriquée dans Link) */}
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="relative w-9 h-9 overflow-hidden rounded-full border border-[#00D9FF]/40 flex-shrink-0">
                        <Image
                            src="/logo_startgen"
                            alt="Logo StartGen Mons"
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className="flex items-center gap-1.5 font-extrabold text-lg tracking-tight text-white">
                        <span>STARTGEN</span>
                        <span className="text-[#00D9FF]">MONS</span>
                    </div>
                </Link>

                {/* Navigation centrale bien espacée */}
                <nav className="hidden md:flex items-center gap-10 text-sm font-medium text-gray-300">
                    <Link href="/" className="hover:text-[#00D9FF] transition">Accueil</Link>
                    <Link href="/#reseau" className="hover:text-[#00D9FF] transition">Nos Antennes</Link>
                    <Link href="/contact" className="hover:text-[#00D9FF] transition">Contact</Link>
                </nav>

                {/* Bouton de Connexion à droite */}
                <div className="flex items-center">
                    <Link href="/login" className="bg-[#00D9FF] hover:bg-[#00bfe6] text-[#1E1E1E] font-bold text-sm px-4 py-2 rounded-lg transition shadow-sm">
                        Se connecter
                    </Link>
                </div>

            </div>
        </header>
    );
}
