// Faux "repository" en mémoire : mêmes fonctions que src/repositories/users.ts, sans base de données.
// Les tests l'utilisent à la place de Prisma (vi.mock), ce qui les rend rapides et indépendants de SQLite.
import { randomUUID } from "node:crypto";

type User = {
    id: string;
    email: string;
    password: string;
    nom: string;
    prenom: string;
    role: string;
    createdAt: Date;
};

export const store: User[] = [];

export async function findByEmail(email: string) {
    return store.find((u) => u.email === email) ?? null;
}

export async function findById(id: string) {
    return store.find((u) => u.id === id) ?? null;
}

export async function create(data: { email: string; password: string; nom: string; prenom: string }) {
    const user: User = { id: randomUUID(), role: "USER", createdAt: new Date(), ...data };
    store.push(user);
    return user;
}

export function __reset() {
    store.length = 0;
}
