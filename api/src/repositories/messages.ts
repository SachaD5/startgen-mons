import { prisma } from "../lib/prisma.js";

export function create(data: { nom: string; email: string; sujet: string; message: string }) {
    return prisma.contactMessage.create({ data });
}

export function findAll() {
    return prisma.contactMessage.findMany({ orderBy: { createdAt: "desc" } });
}

export function findById(id: string) {
    return prisma.contactMessage.findUnique({ where: { id } });
}

export function markRead(id: string) {
    return prisma.contactMessage.update({ where: { id }, data: { lu: true } });
}
