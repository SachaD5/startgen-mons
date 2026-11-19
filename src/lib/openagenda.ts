import { cacheLife } from "next/cache";

// Lecture des événements depuis OpenAgenda (https://developers.openagenda.com).
// Ça tourne UNIQUEMENT côté serveur : la clé reste secrète (elle n'est jamais envoyée au navigateur).
const API = process.env.OPENAGENDA_API_URL ?? "https://api.openagenda.com/v2";

// Un événement prêt à afficher. Un événement OpenAgenda peut avoir plusieurs dates : "timings".
export type AgendaEvent = {
    uid: number;
    titre: string;
    resume: string; // courte présentation (200 caractères max sur OpenAgenda)
    description: string; // description complète
    prix: string; // champ "conditions" d'OpenAgenda (tarifs, conditions d'accès) : vide si non rempli
    dates: { debut: string; fin: string }[]; // ISO, triées de la plus proche à la plus lointaine
    lieu: string;
    ville: string;
    image: string | null;
    url: string | null;
};

export type AgendaResult = { events: AgendaEvent[]; error: "config" | "api" | null };

// Les textes OpenAgenda sont multilingues : { fr: "...", en: "..." }. On prend le français, sinon le premier dispo.
function texte(valeur: unknown): string {
    if (typeof valeur === "string") return valeur;
    if (valeur && typeof valeur === "object") {
        const v = valeur as Record<string, string>;
        return v.fr ?? Object.values(v)[0] ?? "";
    }
    return "";
}

/* eslint-disable @typescript-eslint/no-explicit-any */
function convertir(e: any, agendaSlug: string | null): AgendaEvent {
    const dates = ((e.timings ?? []) as { begin: string; end: string }[])
        .map((t) => ({ debut: t.begin, fin: t.end }))
        .sort((a, b) => Date.parse(a.debut) - Date.parse(b.debut));

    // L'image existe en plusieurs tailles ("variants") : on prend celle de 700 px de large si elle est là
    const fichier = e.image?.variants?.find((v: any) => v.type === "base")?.filename ?? e.image?.filename;
    const image = e.image?.base && fichier ? `${e.image.base}${fichier}` : null;
    const url = e.canonicalUrl ?? (agendaSlug && e.slug ? `https://openagenda.com/${agendaSlug}/events/${e.uid}_${e.slug}` : null);

    return {
        uid: e.uid,
        titre: texte(e.title),
        resume: texte(e.description),
        description: texte(e.longDescription) || texte(e.description),
        prix: texte(e.conditions),
        dates,
        lieu: e.location?.name ?? "",
        ville: e.location?.city ?? "",
        image,
        url,
    };
}

// Garde le résultat en cache 1 heure : on ne tape pas l'API d'OpenAgenda à chaque visite.
export async function getAgendaEvents(): Promise<AgendaResult> {
    "use cache";
    cacheLife("seconds");

    const key = process.env.OPENAGENDA_KEY;
    const uid = process.env.OPENAGENDA_AGENDA_UID;
    if (!key || !uid) {
        cacheLife("seconds");
        return { events: [], error: "config" };
    }

    try {
        const res = await fetch(`${API}/agendas/${uid}/events?detailed=1&size=300&sort=timings.asc`, {
            headers: { key },
        });
        if (!res.ok) throw new Error(`OpenAgenda ${res.status}`);
        const data = await res.json();
        const slug: string | null = data.events?.[0]?.originAgenda?.slug ?? null;
        const events = (data.events ?? []).map((e: unknown) => convertir(e, slug)).filter((e: AgendaEvent) => e.dates.length > 0);
        return { events, error: null };
    } catch {
        // En cas de souci, on réessaie vite plutôt que de garder l'erreur 1 heure
        cacheLife("minutes");
        return { events: [], error: "api" };
    }
}
