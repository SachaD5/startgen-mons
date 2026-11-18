// Petit client HTTP pour parler au backend (dossier api/).
// L'adresse de l'API vient de NEXT_PUBLIC_API_URL (voir .env.example).
const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

export type User = {
    id: string;
    email: string;
    nom: string;
    prenom: string;
    role: "USER" | "ADMIN";
};

export type AuthResponse = { token: string; user: User };

// Erreur renvoyée par l'API : message lisible + erreurs champ par champ ({ email: ["Adresse e-mail invalide"] })
export class ApiError extends Error {
    constructor(
        message: string,
        readonly status: number,
        readonly fieldErrors: Record<string, string[]> = {},
    ) {
        super(message);
    }
}

// Transforme n'importe quelle erreur en { message, fieldErrors } prêts à afficher dans un formulaire
export function formError(err: unknown): { message: string; fieldErrors: Record<string, string[]> } {
    if (err instanceof ApiError) {
        const hasFieldErrors = Object.keys(err.fieldErrors).length > 0;
        return {
            // Si des champs sont en erreur, ils affichent déjà leur propre message : on reste bref en haut
            message: hasFieldErrors ? "Vérifie les champs en rouge." : err.message,
            fieldErrors: err.fieldErrors,
        };
    }
    return { message: "Une erreur est survenue. Réessaie.", fieldErrors: {} };
}

type Options = { method?: string; body?: unknown; token?: string | null };

export async function api<T>(path: string, { method, body, token }: Options = {}): Promise<T> {
    let res: Response;
    try {
        res = await fetch(`${API_URL}${path}`, {
            method: method ?? (body === undefined ? "GET" : "POST"),
            headers: {
                ...(body !== undefined && { "Content-Type": "application/json" }),
                ...(token && { Authorization: `Bearer ${token}` }),
            },
            body: body === undefined ? undefined : JSON.stringify(body),
            cache: "no-store",
        });
    } catch {
        // Serveur éteint, pas de réseau, CORS bloqué...
        throw new ApiError("Impossible de joindre le serveur. Réessaie dans un instant.", 0);
    }

    if (res.status === 204) return undefined as T;

    const data = await res.json().catch(() => null);
    if (!res.ok) {
        throw new ApiError(
            data?.error ?? "Une erreur est survenue. Réessaie.",
            res.status,
            data?.details?.fieldErrors ?? {},
        );
    }
    return data as T;
}
