export type Antenne = {
    id: string;
    nom: string;
    /** Nom court de la ville, écrit sur la carte */
    ville: string;
    lieu: string;
    statut: string;
    description: string;
    position: [number, number]; // [latitude, longitude]
    active: boolean;
};

// Pour ajouter une antenne : un bloc ici, elle apparaît toute seule sur la carte, dans la liste et dans les chiffres.
export const antennas: Antenne[] = [
    {
        id: "mons",
        nom: "StartGen Mons",
        ville: "Mons",
        lieu: "Campus Warocqué / Hub Mons",
        statut: "Actif (Antenne principale du site)",
        description: "Antenne principale - Campus Warocqué / Hub Mons",
        position: [50.4542, 3.9523],
        active: true,
    },
    {
        id: "tournai",
        nom: "StartGen Tournai",
        ville: "Tournai",
        lieu: "Tournai",
        statut: "Réseau partenaire",
        description: "Antenne partenaire - Tournai",
        position: [50.6056, 3.3888],
        active: false,
    },
    {
        id: "louvain-la-neuve",
        nom: "StartGen Louvain-la-Neuve",
        ville: "Louvain-la-Neuve",
        lieu: "UCLouvain",
        statut: "Réseau partenaire",
        description: "Antenne partenaire - UCLouvain",
        position: [50.6681, 4.6117],
        active: false,
    },
    {
        id: "namur",
        nom: "StartGen Namur",
        ville: "Namur",
        lieu: "UNamur",
        statut: "Réseau partenaire",
        description: "Antenne partenaire - UNamur",
        position: [50.4674, 4.872],
        active: false,
    },
    {
        id: "liege",
        nom: "StartGen Liège",
        ville: "Liège",
        lieu: "ULiège",
        statut: "Réseau partenaire",
        description: "Antenne partenaire - ULiège",
        position: [50.6326, 5.5797],
        active: false,
    },
    {
        id: "arlon",
        nom: "StartGen Arlon",
        ville: "Arlon",
        lieu: "Arlon",
        statut: "Réseau partenaire",
        description: "Antenne partenaire - Arlon",
        position: [49.6833, 5.8167],
        active: false,
    },
];

/** Lien Google Maps vers une antenne */
export function lienItineraire(a: Antenne): string {
    return `https://www.google.com/maps/search/?api=1&query=${a.position[0]},${a.position[1]}`;
}
