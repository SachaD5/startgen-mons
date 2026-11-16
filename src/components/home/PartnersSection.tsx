// src/components/home/PartnersSection.tsx
export default function PartnersSection() {
    const partners = [
        { name: "CWB", logo: "/Partenaire1.png", url: "https://www.cwb.fr", customSize: "max-h-14 max-w-[100px]" },
        { name: "BNP Paribas Fortis", logo: "/Partenaire2.png", url: "https://www.bnpparibasfortis.be", customSize: "max-h-28 max-w-[180px]" }, // Logo 2 plus grand
        { name: "Wallonie", logo: "/Partenaire3.png", url: "https://www.wallonie.be", customSize: "max-h-28 max-w-[180px]" }, // Logo 3 plus grand
        { name: "Wallonie Entreprendre", logo: "/Partenaire4.png", url: "https://wallonie-entreprendre.be", customSize: "max-h-28 max-w-[180px]" }, // Logo 4 plus grand
        { name: "UCM", logo: "/Partenaire5.png", url: "https://www.ucm.be", customSize: "max-h-28 max-w-[180px]" }, // Logo 5 plus grand
        { name: "Deloitte", logo: "/Partenaire6.png", url: "https://www.deloitte.com", customSize: "max-h-28 max-w-[180px]" }, // Logo 6 plus grand aussi
        { name: "LJE", logo: "/Partenaire7.png", url: "https://lje.be", customSize: "max-h-20 max-w-[140px]" },
    ];

    return (
        <section id="partners" className="py-24 px-6 bg-[#1A1A1A] border-b border-white/10 text-white relative overflow-hidden">
            <div className="max-w-7xl mx-auto text-center">

                {/* En-tête de section */}
                <div className="max-w-3xl mx-auto mb-16">
                    <span className="text-[11px] font-bold uppercase tracking-widest text-[#00D9FF] bg-[#00D9FF]/10 px-4 py-1.5 rounded-full border border-[#00D9FF]/20">
                        Écosystème & Partenariats
                    </span>
                    <h3 className="text-2xl md:text-4xl font-extrabold tracking-tight mt-4 text-white">
                        Nos 7 Partenaires Officiels
                    </h3>
                    <p className="text-sm md:text-base text-gray-400 mt-4 leading-relaxed">
                        Grâce à l'engagement de nos partenaires de référence, StartGen Mons offre aux étudiants un pont direct entre l'apprentissage académique et la réalité du monde entrepreneurial belge.
                    </p>
                </div>

                {/* Grille des partenaires */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-4 items-center justify-center">
                    {partners.map((partner, index) => (
                        <a
                            key={index}
                            href={partner.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-gradient-to-b from-[#242424] to-[#1E1E1E] border border-white/15 p-3 rounded-2xl flex flex-col items-center justify-center h-28 hover:border-[#00D9FF] hover:shadow-[0_0_20px_rgba(0,217,255,0.3)] transition-all duration-300 group relative shadow-md overflow-hidden"
                        >
                            {/* Logo avec taille spécifique */}
                            <img
                                src={partner.logo}
                                alt={partner.name}
                                className={`${partner.customSize} w-full object-contain group-hover:scale-110 transition-transform duration-300 filter drop-shadow-sm`}
                            />

                            {/* Petit message discret qui apparaît au survol */}
                            <span className="absolute bottom-1.5 text-[9px] text-[#00D9FF] font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-1 group-hover:translate-y-0">
                                Cliquer pour découvrir
                            </span>
                        </a>
                    ))}
                </div>

            </div>
        </section>
    );
}
