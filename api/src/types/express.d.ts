// Ajoute `req.auth` au type Request d'Express (rempli par le middleware requireAuth).
export type Role = "USER" | "ADMIN";

export interface AuthPayload {
    userId: string;
    role: Role;
}

declare global {
    namespace Express {
        interface Request {
            auth?: AuthPayload;
        }
    }
}
