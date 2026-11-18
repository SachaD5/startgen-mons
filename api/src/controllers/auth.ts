import type { Request, Response } from "express";
import * as authService from "../services/auth.js";
import type { LoginInput, RegisterInput } from "../schemas/auth.js";

// Pas de try/catch : Express 5 envoie automatiquement les erreurs (même async)
// au gestionnaire global (middlewares/errorHandler.ts).
// req.body a déjà été validé par le middleware validate(...) des routes.

export async function register(req: Request, res: Response) {
    const result = await authService.registerUser(req.body as RegisterInput);
    res.status(201).json(result);
}

export async function login(req: Request, res: Response) {
    const result = await authService.loginUser(req.body as LoginInput);
    res.json(result);
}

export async function me(req: Request, res: Response) {
    res.json({ user: await authService.getProfile(req.auth!.userId) });
}
