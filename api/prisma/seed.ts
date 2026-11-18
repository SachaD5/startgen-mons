// Crée (ou met à jour) le compte administrateur : npm run db:seed
import "dotenv/config";
import bcrypt from "bcrypt";
import { prisma } from "../src/lib/prisma.js";

const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
const password = process.env.ADMIN_PASSWORD;

if (!email || !password || password.length < 8) {
    console.error("❌ Renseigne ADMIN_EMAIL et ADMIN_PASSWORD (8 caractères min.) dans api/.env");
    process.exit(1);
}

const hash = await bcrypt.hash(password, 10);

const admin = await prisma.user.upsert({
    where: { email },
    update: { password: hash, role: "ADMIN" },
    create: {
        email,
        password: hash,
        role: "ADMIN",
        nom: process.env.ADMIN_NOM ?? "Admin",
        prenom: process.env.ADMIN_PRENOM ?? "StartGen",
    },
});

console.log(`✅ Administrateur prêt : ${admin.email}`);
await prisma.$disconnect();
