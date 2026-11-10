import { prisma } from "../lib/prisma.js";

export async function findByEmail(email: string) {
    return prisma.user.findUnique({ where: { email } });
}

export async function createUser(data: any) {
    return prisma.user.create({ data });
}
