// Tous les textes des pages "Accueil" et "À propos" sont ici : pour changer un texte, on modifie ce fichier.
// (Source : document "Présentation générale de Startgen Mons", version 2025-2026.)
import { ICONES } from "@/components/ui/Ico";

export const CHIFFRES = [
    { valeur: "250", label: "étudiants touchés chaque année : notre objectif" },
    { valeur: "4", label: "événements par an, 2 par quadrimestre" },
    { valeur: "4", label: "clubs StartGen en Belgique" },
    { valeur: "5", label: "sponsors qui nous soutiennent" },
];

// Les 3 piliers affichés sur l'accueil
export const PILIERS = [
    {
        icone: ICONES.bulb,
        titre: "Être inspiré",
        texte: "Des conférences et des rencontres avec des entrepreneurs, pour montrer que se lancer est accessible, même quand on est étudiant.",
    },
    {
        icone: ICONES.cap,
        titre: "Apprendre en faisant",
        texte: "Des workshops et des activités pour développer l'art du pitch, l'audace et l'organisation. Ici, on ose et on teste ses idées.",
    },
    {
        icone: ICONES.users,
        titre: "Se connecter",
        texte: "Un réseau pour trouver des partenaires, des mentors et des aides, et donner de la visibilité à ton projet.",
    },
];

// Mission / objectif / vision (page "À propos")
export const NOTRE_ASSOCIATION = [
    {
        titre: "La mission",
        texte: [
            "Promouvoir l'entrepreneuriat auprès des étudiants de Mons et leur donner envie de se lancer. Pour cela, nous organisons des conférences inspirantes, des workshops et des événements qui montrent que l'entrepreneuriat est accessible à tout le monde.",
            "Nous voulons aussi créer un réseau qui permet aux étudiants entrepreneurs de trouver des partenaires, des mentors ou de l'aide pour leurs projets, et mettre en avant des projets innovants pour leur donner de la visibilité.",
        ],
    },
    {
        titre: "L'objectif",
        texte: [
            "Toucher 250 étudiants par an grâce à des événements qui inspirent et motivent : environ quatre par an, deux par quadrimestre, selon la participation.",
            "Startgen Mons, c'est aussi un accompagnement concret. Un membre cherche un subside ? Nous le guidons vers Wallonie Entreprendre. Il a besoin de conseils financiers ? Nous l'orientons vers BNP Paribas Fortis.",
        ],
    },
    {
        titre: "La vision",
        texte: [
            "Créer une génération d'étudiants audacieux, capables de transformer leurs idées en projets concrets, en faisant de l'entrepreneuriat une opportunité accessible et attractive pour tous.",
            "Nous favorisons l'action, la créativité et la confiance en soi, pour que chaque étudiant puisse oser, expérimenter et développer son potentiel.",
        ],
    },
];

// L'équipe : un département = un rôle + ses missions
export type Departement = { nom: string; icone: string; role: string; missions: string[] };

export const DEPARTEMENTS: Departement[] = [
    {
        nom: "Président",
        icone: ICONES.star,
        role: "Représente et dirige Startgen Mons, avec une ligne claire et cohérente.",
        missions: [
            "Fixe les objectifs et la vision annuelle",
            "Supervise les départements",
            "Représente le club auprès de l'administration, des partenaires et des autres clubs",
        ],
    },
    {
        nom: "Vice-président",
        icone: ICONES.link,
        role: "Soutient le président et coordonne les départements.",
        missions: [
            "Participe à la planification et au suivi des projets",
            "Remplace le président en cas d'absence",
            "Coordonne les équipes RH, Events et Communication",
        ],
    },
    {
        nom: "Ressources humaines",
        icone: ICONES.users,
        role: "S'occupe du recrutement, de la cohésion et du bien-être des membres.",
        missions: [
            "Recrute et intègre les nouveaux membres",
            "Rédige les comptes rendus de réunion",
            "Organise team buildings et sorties, et gère les intervenants des événements",
        ],
    },
    {
        nom: "Trésorier",
        icone: ICONES.euro,
        role: "Gère les finances du club et veille au bon usage des ressources.",
        missions: [
            "Élabore et suit le budget annuel",
            "Gère les dépenses et les recettes",
            "Conseille sur le budget de chaque département et projet",
        ],
    },
    {
        nom: "Events",
        icone: ICONES.cal,
        role: "Conçoit et planifie les événements du club.",
        missions: [
            "Organise les événements avec les autres départements",
            "Prépare le déroulé de chaque événement",
            "Évalue les retombées pour s'améliorer à chaque édition",
        ],
    },
    {
        nom: "Communication",
        icone: ICONES.megaphone,
        role: "Valorise Startgen Mons sur les réseaux sociaux et assure sa visibilité.",
        missions: [
            "Crée des posts, stories, affiches et vidéos",
            "Gère les comptes Instagram, LinkedIn, TikTok et autres",
            "Couvre les événements et développe une identité visuelle cohérente",
        ],
    },
];

export const CONTACT = {
    email: "contact@startgen-mons.be",
    ville: "Mons",
};
