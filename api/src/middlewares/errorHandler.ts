import type { ErrorRequestHandler, RequestHandler } from "express";
import { AppError, NotFoundError } from "../errors.js";

export const notFound: RequestHandler = (_req, _res, next) => {
    next(new NotFoundError("Route introuvable"));
};

// Gestionnaire d'erreurs global (Express le reconnaît à ses 4 paramètres).
// Toute erreur lancée dans une route, un middleware ou un service arrive ici.
export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
    if (err instanceof AppError) {
        res.status(err.status).json({ error: err.message, details: err.details ?? null });
        return;
    }

    // Erreurs d'Express lui-même (JSON mal formé, corps trop gros…)
    const status = typeof err?.status === "number" ? err.status : 500;
    if (status === 413) {
        res.status(413).json({ error: "Requête trop volumineuse", details: null });
        return;
    }
    if (status >= 400 && status < 500) {
        res.status(status).json({ error: "Requête invalide", details: null });
        return;
    }

    // Erreur inattendue : on la garde pour nous (console), on ne montre rien au client
    console.error("Erreur serveur :", err);
    res.status(500).json({ error: "Erreur interne du serveur", details: null });
};
