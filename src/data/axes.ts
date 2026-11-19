export type Axe = {
    titre: string;
    texte: string;
    image: string;
    alt: string;
};

// Ce que fait Startgen Mons concrètement (page "À propos")
export const axes: Axe[] = [
    {
        titre: "Des conférences qui donnent envie",
        texte:
            "Des conférences inspirantes et des rencontres avec des entrepreneurs, pour démontrer que l'entrepreneuriat est accessible, même quand on est étudiant.",
        image: "/startgen-165.jpg",
        alt: "Conférence Startgen Mons devant une salle remplie",
    },
    {
        titre: "Des workshops pour passer à l'action",
        texte:
            "Des activités pour développer les compétences entrepreneuriales : l'art du pitch, l'audace, l'organisation. Dans un environnement bienveillant, on ose, on teste et on met ses idées au jour.",
        image: "/startgen-036.jpg",
        alt: "Interview sur scène lors d'un événement Startgen Mons",
    },
    {
        titre: "Un réseau pour avancer ensemble",
        texte:
            "Un réseau qui permet aux étudiants entrepreneurs de trouver des partenaires, des mentors ou de l'aide : subsides via Wallonie Entreprendre, conseils financiers via BNP Paribas Fortis, et bien d'autres ressources.",
        image: "/startgen-043.jpg",
        alt: "Étudiants qui discutent après un événement Startgen Mons",
    },
    {
        titre: "De la visibilité pour les projets",
        texte:
            "Nous mettons en avant des projets innovants, pour offrir aux étudiants entrepreneurs une visibilité accrue et valoriser leurs initiatives.",
        image: "/fond_ecran2.jpg",
        alt: "Présentation de projets devant un écran lors d'un événement",
    },
];
