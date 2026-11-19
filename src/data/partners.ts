export type Partner = {
    name: string;
    logo: string;
    url: string;
    /** Ce que le partenaire apporte (laisser vide si on ne sait pas) */
    role?: string;
};

export const partners: Partner[] = [
    { name: "LJE – Les Jeunes Entreprises", logo: "/Partenaire7.png", url: "https://lje.be", role: "Le programme dont fait partie Startgen : il coordonne le réseau Startgen Belgium." },
    { name: "Wallonie Entreprendre", logo: "/Partenaire4.png", url: "https://wallonie-entreprendre.be", role: "Sponsor. Vers qui nous orientons les membres qui cherchent un subside." },
    { name: "BNP Paribas Fortis", logo: "/Partenaire2.png", url: "https://www.bnpparibasfortis.be", role: "Sponsor. Vers qui nous orientons les membres qui ont besoin de conseils financiers." },
    { name: "UCM", logo: "/Partenaire5.png", url: "https://www.ucm.be", role: "Sponsor. L'Union des classes moyennes." },
    { name: "Deloitte", logo: "/Partenaire6.png", url: "https://www.deloitte.com", role: "Sponsor." },
    { name: "CWB", logo: "/Partenaire1.png", url: "https://www.cwb.fr", role: "Sponsor. Le Cercle Wallonie-Bruxelles." }, // à vérifier : domaine .fr
    { name: "Wallonie", logo: "/Partenaire3.png", url: "https://www.wallonie.be" },
];
