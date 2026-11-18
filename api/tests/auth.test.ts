import { describe, it, expect } from "vitest";
import request from "supertest";
import { app, validUser, registerAndGetToken } from "./helpers/utils.js";
import * as users from "./helpers/memoryUsers.js";

describe("POST /auth/register", () => {
    it("crée un compte et renvoie un jeton, sans jamais renvoyer le mot de passe", async () => {
        const res = await request(app).post("/auth/register").send(validUser);

        expect(res.status).toBe(201);
        expect(res.body.token).toEqual(expect.any(String));
        expect(res.body.user).toMatchObject({ email: validUser.email, nom: "Dupont", prenom: "Jean", role: "USER" });
        expect(res.body.user.password).toBeUndefined();
        // Le mot de passe est stocké haché, pas en clair
        expect(users.store[0].password).not.toBe(validUser.password);
    });

    it("ignore un rôle envoyé par le client (pas d'auto-promotion en ADMIN)", async () => {
        const res = await request(app).post("/auth/register").send({ ...validUser, role: "ADMIN" });

        expect(res.status).toBe(201);
        expect(res.body.user.role).toBe("USER");
        expect(users.store[0].role).toBe("USER");
    });

    it("met l'e-mail en minuscules", async () => {
        const res = await request(app)
            .post("/auth/register")
            .send({ ...validUser, email: "  Jean.DUPONT@Student.HELHA.be " });

        expect(res.status).toBe(201);
        expect(res.body.user.email).toBe("jean.dupont@student.helha.be");
    });

    it("refuse un e-mail déjà utilisé (409)", async () => {
        await request(app).post("/auth/register").send(validUser);
        const res = await request(app).post("/auth/register").send(validUser);

        expect(res.status).toBe(409);
        expect(res.body.error).toMatch(/déjà utilisé/);
    });

    it("refuse des données invalides (400) avec le détail champ par champ", async () => {
        const res = await request(app)
            .post("/auth/register")
            .send({ nom: "", prenom: "Jean", email: "pas-un-email", password: "court" });

        expect(res.status).toBe(400);
        const fields = res.body.details.fieldErrors;
        expect(fields.nom).toBeDefined();
        expect(fields.email).toBeDefined();
        expect(fields.password).toBeDefined();
        expect(fields.prenom).toBeUndefined();
        expect(users.store).toHaveLength(0);
    });

    it("exige une lettre et un chiffre dans le mot de passe", async () => {
        const res = await request(app).post("/auth/register").send({ ...validUser, password: "uniquementlettres" });

        expect(res.status).toBe(400);
        expect(res.body.details.fieldErrors.password[0]).toMatch(/chiffre/);
    });

    it("refuse un corps vide ou du JSON mal formé", async () => {
        const empty = await request(app).post("/auth/register");
        expect(empty.status).toBe(400);

        const broken = await request(app)
            .post("/auth/register")
            .set("Content-Type", "application/json")
            .send('{"email": ');
        expect(broken.status).toBe(400);
    });
});

describe("POST /auth/login", () => {
    it("connecte avec les bons identifiants", async () => {
        await request(app).post("/auth/register").send(validUser);
        const res = await request(app)
            .post("/auth/login")
            .send({ email: validUser.email, password: validUser.password });

        expect(res.status).toBe(200);
        expect(res.body.token).toEqual(expect.any(String));
        expect(res.body.user.email).toBe(validUser.email);
        expect(res.body.user.password).toBeUndefined();
    });

    it("renvoie le même message pour un mauvais mot de passe et pour un e-mail inconnu", async () => {
        await request(app).post("/auth/register").send(validUser);

        const wrongPassword = await request(app)
            .post("/auth/login")
            .send({ email: validUser.email, password: "MauvaisMdp1" });
        const unknownEmail = await request(app)
            .post("/auth/login")
            .send({ email: "inconnu@exemple.be", password: "Motdepasse1" });

        expect(wrongPassword.status).toBe(401);
        expect(unknownEmail.status).toBe(401);
        expect(wrongPassword.body.error).toBe(unknownEmail.body.error);
    });
});

describe("GET /auth/me", () => {
    it("refuse sans jeton (401)", async () => {
        const res = await request(app).get("/auth/me");
        expect(res.status).toBe(401);
    });

    it("refuse un faux jeton (401)", async () => {
        const res = await request(app).get("/auth/me").set("Authorization", "Bearer faux.jeton.ici");
        expect(res.status).toBe(401);
    });

    it("renvoie le profil avec un jeton valide", async () => {
        const token = await registerAndGetToken();
        const res = await request(app).get("/auth/me").set("Authorization", `Bearer ${token}`);

        expect(res.status).toBe(200);
        expect(res.body.user).toMatchObject({ email: validUser.email, role: "USER" });
    });
});

describe("Divers", () => {
    it("GET /health répond ok", async () => {
        const res = await request(app).get("/health");
        expect(res.status).toBe(200);
        expect(res.body).toEqual({ status: "ok" });
    });

    it("une route inconnue renvoie 404 en JSON", async () => {
        const res = await request(app).get("/nimporte-quoi");
        expect(res.status).toBe(404);
        expect(res.body.error).toBeDefined();
    });
});
