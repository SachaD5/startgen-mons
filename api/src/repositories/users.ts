import { prisma } from "../lib/prisma.js";

// Les repositories sont les SEULS fichiers qui parlent à la base de données.

export function findByEmail(email: string) {
    return prisma.user.findUnique({ where: { email } });
}

export function findById(id: string) {
    return prisma.user.findUnique({ where: { id } });
}

export function create(data: { email: string; password: string; nom: string; prenom: string }) {
    return prisma.user.create({ data });
}
