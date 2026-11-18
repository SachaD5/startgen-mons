import { prisma } from "../lib/prisma.js";

export function findAll() {
    return prisma.event.findMany({
        // On n'expose que le nom de l'auteur (jamais son e-mail)
        include: { createdBy: { select: { id: true, prenom: true, nom: true } } },
        orderBy: { date: "asc" },
    });
}

export function findById(id: string) {
    return prisma.event.findUnique({ where: { id } });
}

export function create(data: {
    title: string;
    date: Date;
    location: string;
    description: string;
    type: string;
    createdById: string;
}) {
    return prisma.event.create({ data });
}

export function remove(id: string) {
    return prisma.event.delete({ where: { id } });
}
