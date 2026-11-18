import { randomUUID } from "node:crypto";

type EventRow = {
    id: string;
    title: string;
    date: Date;
    location: string;
    description: string;
    type: string;
    createdById: string;
    createdAt: Date;
};

export const store: EventRow[] = [];

export async function findAll() {
    return [...store].sort((a, b) => a.date.getTime() - b.date.getTime());
}

export async function findById(id: string) {
    return store.find((e) => e.id === id) ?? null;
}

export async function create(data: Omit<EventRow, "id" | "createdAt">) {
    const event: EventRow = { id: randomUUID(), createdAt: new Date(), ...data };
    store.push(event);
    return event;
}

export async function remove(id: string) {
    const index = store.findIndex((e) => e.id === id);
    if (index >= 0) store.splice(index, 1);
}

export function __reset() {
    store.length = 0;
}
