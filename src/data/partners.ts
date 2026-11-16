export type Partner = {
    name: string;
    logo: string;
    url: string;
};

export const partners: Partner[] = [
    { name: "CWB", logo: "/Partenaire1.png", url: "https://www.cwb.fr" }, // à vérifier : domaine .fr
    { name: "BNP Paribas Fortis", logo: "/Partenaire2.png", url: "https://www.bnpparibasfortis.be" },
    { name: "Wallonie", logo: "/Partenaire3.png", url: "https://www.wallonie.be" },
    { name: "Wallonie Entreprendre", logo: "/Partenaire4.png", url: "https://wallonie-entreprendre.be" },
    { name: "UCM", logo: "/Partenaire5.png", url: "https://www.ucm.be" },
    { name: "Deloitte", logo: "/Partenaire6.png", url: "https://www.deloitte.com" },
    { name: "LJE", logo: "/Partenaire7.png", url: "https://lje.be" },
];
