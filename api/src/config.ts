import dotenv from "dotenv";
import { z } from "zod";

dotenv.config({ quiet: true });

// Toute la configuration vient des variables d'environnement (fichier .env en local).
// Si une valeur manque ou est invalide, l'API refuse de démarrer : pas de secret "par défaut" caché dans le code.
const schema = z.object({
    NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
    PORT: z.coerce.number().int().positive().default(3001),
    DATABASE_URL: z.string().min(1, "DATABASE_URL est obligatoire"),
    JWT_SECRET: z.string().min(16, "JWT_SECRET doit contenir au moins 16 caractères"),
    JWT_EXPIRES_IN: z.string().default("1d"),
    CORS_ORIGIN: z.string().default("http://localhost:3000"),
    TRUST_PROXY: z.coerce.number().int().min(0).default(0),
});

const parsed = schema.safeParse(process.env);

if (!parsed.success) {
    console.error("❌ Configuration invalide dans api/.env :", z.flattenError(parsed.error).fieldErrors);
    process.exit(1);
}

export const env = parsed.data;
