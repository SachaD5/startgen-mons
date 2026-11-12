export type Antenne = {
    id: string;
    nom: string;
    lieu: string;
    statut: string;
    description: string;
    position: [number, number]; // [latitude, longitude]
    active: boolean;
};

export const antennes: Antenne[] = [
    {
        id: "mons",
        nom: "StartGen Mons",
        lieu: "Campus Warocqué / Hub Mons",
        statut: "Actif (Antenne principale du site)",
        description: "Antenne principale - Campus Warocqué / Hub Mons",
        position: [50.4542, 3.9523],
        active: true,
    },
    {
        id: "louvain-la-neuve",
        nom: "StartGen Louvain-la-Neuve",
        lieu: "UCLouvain",
        statut: "Réseau partenaire",
        description: "Antenne partenaire - UCLouvain",
        position: [50.6681, 4.6117],
        active: false,
    },
    {
        id: "namur",
        nom: "StartGen Namur",
        lieu: "UNamur",
        statut: "Réseau partenaire",
        description: "Antenne partenaire - UNamur",
        position: [50.4674, 4.872],
        active: false,
    },
    {
        id: "liege",
        nom: "StartGen Liège",
        lieu: "ULiège",
        statut: "Réseau partenaire",
        description: "Antenne partenaire - ULiège",
        position: [50.6326, 5.5797],
        active: false,
    },
];
