export type Axe = {
    titre: string;
    texte: string;
    image: string;
    alt: string;
};

// Les 3 axes du programme (section "À propos")
export const axes: Axe[] = [
    {
        titre: "Incubation & Suivi Personnalisé",
        texte:
            "À Mons, chaque projet bénéficie d'un suivi sur-mesure. Nous aidons les étudiants à structurer leur business plan, valider leur modèle économique et préparer leurs pitchs face à de véritables investisseurs et partenaires régionaux.",
        image: "/startgen-165.jpg",
        alt: "Incubation et Coaching StartGen Mons",
    },
    {
        titre: "Workshops Pratiques & Formations Tech",
        texte:
            "Parce qu'un projet nécessite des compétences techniques et managériales solides, nous organisons régulièrement des ateliers pratiques axés sur le développement web, le marketing digital, la gestion de projet et la conformité légale.",
        image: "/fond_ecran2.jpg",
        alt: "Workshops StartGen Mons",
    },
    {
        titre: "Networking & Connexion avec LJE",
        texte:
            "Participez à des afterworks exclusifs, des hackathons inter-antennas et des événements de networking avec le réseau national de LJE. Développez votre carnet d'adresses et trouvez vos futurs associés dès les bancs de la HELHa.",
        image: "/startgen-043.jpg   ",
        alt: "Networking StartGen Mons",
    },
];
