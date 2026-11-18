import { randomUUID } from "node:crypto";

type Message = {
    id: string;
    nom: string;
    email: string;
    sujet: string;
    message: string;
    lu: boolean;
    createdAt: Date;
};

export const store: Message[] = [];

export async function create(data: { nom: string; email: string; sujet: string; message: string }) {
    const msg: Message = { id: randomUUID(), lu: false, createdAt: new Date(), ...data };
    store.push(msg);
    return msg;
}

export async function findAll() {
    return [...store].reverse();
}

export async function findById(id: string) {
    return store.find((m) => m.id === id) ?? null;
}

export async function markRead(id: string) {
    const msg = store.find((m) => m.id === id)!;
    msg.lu = true;
    return msg;
}

export function __reset() {
    store.length = 0;
}
