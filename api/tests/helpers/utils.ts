import request from "supertest";
import { createApp } from "../../src/app.js";
import * as users from "./memoryUsers.js";

export const app = createApp();

export const validUser = {
    nom: "Dupont",
    prenom: "Jean",
    email: "jean.dupont@student.helha.be",
    password: "Motdepasse1",
};

// Inscrit un utilisateur et renvoie son jeton
export async function registerAndGetToken(overrides: Partial<typeof validUser> = {}) {
    const res = await request(app)
        .post("/auth/register")
        .send({ ...validUser, ...overrides });
    return res.body.token as string;
}

// Inscrit un utilisateur, le passe ADMIN directement en mémoire, se reconnecte et renvoie le jeton
export async function adminToken() {
    const email = "admin@startgen.test";
    await registerAndGetToken({ email });
    const user = users.store.find((u) => u.email === email)!;
    user.role = "ADMIN";
    const res = await request(app).post("/auth/login").send({ email, password: validUser.password });
    return res.body.token as string;
}
