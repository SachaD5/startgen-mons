export default function Hero() {
    return (
        <section
            id="accueil"
            className="relative w-full min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center text-center overflow-hidden bg-cover bg-center px-6"
            style={{ backgroundImage: "url('/fond_ecran.jpg')" }}
        >
            {/* Overlay sombre pour contraster le texte avec l'image de fond */}
            <div className="absolute inset-0 bg-[#1E1E1E]/85 backdrop-blur-[2px]"></div>

            {/* Contenu de la section Hero parfaitement centré à l'écran */}
            <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
        <span className="bg-[#00D9FF]/10 text-[#00D9FF] text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider mb-6 border border-[#00D9FF]/20">
          Antenne Officielle LJE - Mons
        </span>

                <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-6">
                    STARTGEN <span className="text-[#00D9FF]">MONS</span>
                </h1>

                <p className="text-lg md:text-xl text-gray-300 max-w-2xl leading-relaxed mb-10">
                    Rêver, oser, créer. Le tremplin des jeunes entrepreneurs et étudiants montois. Développe tes compétences entrepreneuriales et fais partie du réseau Les Jeunes Entreprises.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                    <a href="#reseau" className="bg-[#00D9FF] hover:bg-[#00bfe6] text-[#1E1E1E] font-bold px-8 py-3.5 rounded-xl transition shadow-md">
                        Voir la carte
                    </a>
                    <a href="/contact" className="border border-white/20 hover:bg-white/5 text-white font-medium px-8 py-3.5 rounded-xl transition text-center">
                        Nous contacter
                    </a>
                </div>
            </div>
        </section>
    );
}
