import { prisma } from "../lib/prisma.js";

export async function findAll() {
    return prisma.event.findMany({
        include: { createdBy: { select: { id: true, nom: true, email: true } } },
        orderBy: { date: "asc" }
    });
}

export async function create(data: any) {
    return prisma.event.create({ data });
}
