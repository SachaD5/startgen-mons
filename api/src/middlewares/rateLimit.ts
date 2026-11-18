import { rateLimit } from "express-rate-limit";
import { env } from "../config.js";

function limiter(windowMinutes: number, limit: number, message: string) {
    return rateLimit({
        windowMs: windowMinutes * 60 * 1000,
        limit,
        standardHeaders: "draft-7",
        legacyHeaders: false,
        skip: () => env.NODE_ENV === "test",
        handler: (_req, res) => {
            res.status(429).json({ error: message, details: null });
        },
    });
}

// Ralentit les tentatives de force brute sur la connexion / l'inscription
export const authLimiter = limiter(15, 20, "Trop de tentatives, réessaie dans quelques minutes.");

// Évite le spam du formulaire de contact
export const contactLimiter = limiter(60, 8, "Trop de messages envoyés, réessaie plus tard.");
