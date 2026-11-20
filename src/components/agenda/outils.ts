// Outils de dates et de textes partagés par les composants de l'agenda.
import type { AgendaEvent } from "@/lib/openagenda";

export const TZ = "Europe/Brussels";
export const JOURS = ["lun", "mar", "mer", "jeu", "ven", "sam", "dim"];
export const MAX_PAR_JOUR = 3; // événements affichés dans une case du calendrier avant "+ X autres"

// "2026-11-18" : le jour d'une date, vu depuis la Belgique
export const jourDe = (iso: string | Date) => new Intl.DateTimeFormat("sv-SE", { timeZone: TZ }).format(new Date(iso));
export const fmt = (iso: string, o: Intl.DateTimeFormatOptions) => new Intl.DateTimeFormat("fr-BE", { timeZone: TZ, ...o }).format(new Date(iso));
export const fmtJourLong = (iso: string) => fmt(iso, { weekday: "long", day: "numeric", month: "long", year: "numeric" });
export const fmtHeure = (iso: string) => fmt(iso, { hour: "2-digit", minute: "2-digit" });
export const fmtMoisAnnee = (iso: string) => fmt(iso, { month: "long", year: "numeric" });

export type Occurence = { event: AgendaEvent; debut: string; fin: string };
export type Mois = { y: number; m: number };
export type Vue = "calendrier" | "liste";

// Identifiant d'une date précise d'un événement (un événement peut avoir plusieurs dates)
export const cleDe = (o: Occurence) => `${o.event.uid}|${o.debut}`;
export const moisDe = (iso: string): Mois => {
    const [y, m] = jourDe(iso).split("-").map(Number);
    return { y, m: m - 1 };
};

// OpenAgenda renvoie la description en "markdown" (**gras**, [lien](url)...) : on la rend lisible
export const paragraphes = (t: string) =>
    t
        .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
        .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
        .replace(/[*_`#>]+/g, "")
        .split(/\n{2,}/)
        .map((p) => p.trim())
        .filter(Boolean);

export const estGratuit = (prix: string) => /^\s*(gratuit|free|entrée libre)/i.test(prix);

// ---- Couleur par ville : chaque ville a toujours la même couleur dans tout l'agenda ----
const COULEURS_VILLES: [string, string][] = [
    ["mons", "#00D9FF"],
    ["tournai", "#FB923C"],
    ["namur", "#A78BFA"],
    ["liege", "#F87171"],
    ["arlon", "#FACC15"],
    ["louvain", "#F472B6"],
];
const COULEURS_AUTRES = ["#2DD4BF", "#E879F9", "#94A3B8", "#F59E0B", "#A3E635"]; // pas de bleu : le bleu est réservé à Mons (cyan) et à l'interface
const sansAccents = (t: string) => t.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

/** Couleur (hexadécimale) d'une ville. Une ville inconnue reçoit toujours la même couleur de la palette. */
export function couleurVille(ville: string): string {
    const v = sansAccents(ville || "");
    const connue = COULEURS_VILLES.find(([nom]) => v.includes(nom));
    if (connue) return connue[1];
    if (!v) return "#9CA3AF";
    let h = 0;
    for (const c of v) h = (h * 31 + c.charCodeAt(0)) >>> 0;
    return COULEURS_AUTRES[h % COULEURS_AUTRES.length];
}
/** Même couleur, mais transparente (alpha de 0 à 1), pour les fonds */
export const teinte = (hex: string, alpha: number) => `${hex}${Math.round(alpha * 255).toString(16).padStart(2, "0")}`;

// ---- Ajouter à son agenda en un clic (la page de l'agenda s'ouvre déjà remplie, il reste à enregistrer) ----
const compact = (iso: string) => new Date(iso).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
const lieuDe = (o: Occurence) => [o.event.lieu, o.event.ville].filter(Boolean).join(", ");
const detailsDe = (o: Occurence) => [o.event.resume, o.event.url].filter(Boolean).join("\n\n");

export function lienGoogleAgenda(o: Occurence): string {
    const q = new URLSearchParams({
        action: "TEMPLATE",
        text: o.event.titre,
        dates: `${compact(o.debut)}/${compact(o.fin)}`,
        details: detailsDe(o),
        location: lieuDe(o),
        ctz: TZ,
    });
    return `https://calendar.google.com/calendar/render?${q}`;
}
