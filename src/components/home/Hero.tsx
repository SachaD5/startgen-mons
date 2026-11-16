// src/components/home/Hero.tsx
import Link from "next/link";

export default function Hero() {
    return (
        <section className="relative h-[calc(100vh-73px)] text-white flex flex-col items-center justify-center text-center px-6 overflow-hidden border-b border-white/10">

            {/* Image de fond + filtre sombre */}
            <div
                className="absolute inset-0 -z-20 bg-cover bg-center"
                style={{ backgroundImage: "url('/fond_ecran.jpg')" }} // <--- Mets le nom de ton image de fond dans public/
            />
            <div className="absolute inset-0 -z-10 bg-[#1E1E1E]/85 backdrop-blur-[2px]" />

            {/* Petit badge */}
            <span className="bg-[#00D9FF]/10 text-[#00D9FF] text-xs font-semibold px-4 py-1.5 rounded-full uppercase tracking-wider mb-6 inline-block border border-[#00D9FF]/20">
                Antenne de Mons
            </span>

            {/* Titre principal */}
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-6 leading-tight">
                Entreprends, <span className="text-[#00D9FF]">ensemble</span>
            </h1>

            {/* Description */}
            <p className="text-gray-300 text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
                Sois acteur du changement, développe tes compétences, crée ton réseau et booste ton parcours avec StartGen Mons.
            </p>

            {/* Boutons d'action */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center w-full max-w-md">
                <Link
                    href="/register"
                    className="bg-[#00D9FF] hover:bg-[#00bfe6] text-[#1E1E1E] font-bold py-3.5 px-8 rounded-xl transition shadow-lg text-sm text-center"
                >
                    Rejoindre StartGen Mons
                </Link>
                <Link
                    href="/contact"
                    className="bg-black/40 hover:bg-black/60 border border-white/10 text-white font-semibold py-3.5 px-8 rounded-xl transition text-sm text-center backdrop-blur-sm"
                >
                    Nous contacter
                </Link>
            </div>
        </section>
    );
}
