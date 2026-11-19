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

// Fichier .ics : s'ouvre dans Google Agenda, Outlook, Apple Calendar...
export function telechargerIcs(o: Occurence) {
    const utc = (iso: string) => new Date(iso).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
    const esc = (t: string) => t.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\r?\n/g, "\\n");
    const lieu = [o.event.lieu, o.event.ville].filter(Boolean).join(", ");
    const contenu = [
        "BEGIN:VCALENDAR",
        "VERSION:2.0",
        "PRODID:-//StartGen Mons//Agenda//FR",
        "BEGIN:VEVENT",
        `UID:${o.event.uid}-${utc(o.debut)}@startgen-mons`,
        `DTSTAMP:${utc(new Date().toISOString())}`,
        `DTSTART:${utc(o.debut)}`,
        `DTEND:${utc(o.fin)}`,
        `SUMMARY:${esc(o.event.titre)}`,
        `LOCATION:${esc(lieu)}`,
        `DESCRIPTION:${esc(o.event.resume || "")}${o.event.url ? esc(`\n${o.event.url}`) : ""}`,
        "END:VEVENT",
        "END:VCALENDAR",
    ].join("\r\n");
    const url = URL.createObjectURL(new Blob([contenu], { type: "text/calendar;charset=utf-8" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = `${o.event.titre.replace(/[^\w-]+/g, "-").toLowerCase()}.ics`;
    a.click();
    URL.revokeObjectURL(url);
}
