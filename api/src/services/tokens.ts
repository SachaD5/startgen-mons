import jwt, { type SignOptions } from "jsonwebtoken";
import { env } from "../config.js";
import { UnauthorizedError } from "../errors.js";
import type { AuthPayload, Role } from "../types/express.js";

// Un JWT est un jeton signé avec JWT_SECRET : le serveur peut vérifier qu'il l'a bien émis,
// sans rien stocker. On y met l'identifiant (sub) et le rôle.
export function signToken(user: { id: string; role: string }): string {
    return jwt.sign({ role: user.role }, env.JWT_SECRET, {
        subject: user.id,
        expiresIn: env.JWT_EXPIRES_IN as SignOptions["expiresIn"],
        algorithm: "HS256",
    });
}

export function verifyToken(token: string): AuthPayload {
    try {
        const payload = jwt.verify(token, env.JWT_SECRET, { algorithms: ["HS256"] });
        if (typeof payload === "string" || !payload.sub) throw new Error("payload invalide");
        return { userId: payload.sub, role: payload.role as Role };
    } catch {
        throw new UnauthorizedError("Session invalide ou expirée");
    }
}
