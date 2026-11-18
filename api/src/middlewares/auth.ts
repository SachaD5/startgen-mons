import type { RequestHandler } from "express";
import { verifyToken } from "../services/tokens.js";
import { ForbiddenError, UnauthorizedError } from "../errors.js";
import type { Role } from "../types/express.js";

// Exige un jeton valide : "Authorization: Bearer <token>". Remplit req.auth.
export const requireAuth: RequestHandler = (req, _res, next) => {
    const header = req.headers.authorization;
    if (!header?.startsWith("Bearer ")) {
        throw new UnauthorizedError("Connexion requise");
    }
    req.auth = verifyToken(header.slice("Bearer ".length));
    next();
};

// À placer APRÈS requireAuth : exige un des rôles donnés.
export function requireRole(...roles: Role[]): RequestHandler {
    return (req, _res, next) => {
        if (!req.auth || !roles.includes(req.auth.role)) {
            throw new ForbiddenError("Tu n'as pas les droits pour cette action");
        }
        next();
    };
}
