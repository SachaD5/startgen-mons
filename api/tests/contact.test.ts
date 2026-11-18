import { describe, it, expect } from "vitest";
import request from "supertest";
import { app, registerAndGetToken, adminToken } from "./helpers/utils.js";
import * as messages from "./helpers/memoryMessages.js";

const validMessage = {
    nom: "Marie Curie",
    email: "marie@exemple.be",
    sujet: "partenariat",
    message: "Bonjour, nous aimerions devenir partenaires de StartGen Mons.",
};

describe("POST /contact", () => {
    it("enregistre un message sans être connecté", async () => {
        const res = await request(app).post("/contact").send(validMessage);

        expect(res.status).toBe(201);
        expect(res.body).toEqual({ ok: true });
        expect(messages.store).toHaveLength(1);
        expect(messages.store[0]).toMatchObject({ nom: "Marie Curie", sujet: "partenariat", lu: false });
    });

    it("refuse un message invalide avec le détail des erreurs", async () => {
        const res = await request(app)
            .post("/contact")
            .send({ nom: "M", email: "oups", sujet: "inconnu", message: "court" });

        expect(res.status).toBe(400);
        const fields = res.body.details.fieldErrors;
        expect(Object.keys(fields).sort()).toEqual(["email", "message", "nom", "sujet"]);
        expect(messages.store).toHaveLength(0);
    });

    it("ignore les robots : le champ piège rempli répond ok mais ne stocke rien", async () => {
        const res = await request(app).post("/contact").send({ ...validMessage, website: "http://spam.example" });

        expect(res.status).toBe(201);
        expect(messages.store).toHaveLength(0);
    });
});

describe("GET /contact (administrateurs)", () => {
    it("refuse sans connexion (401)", async () => {
        const res = await request(app).get("/contact");
        expect(res.status).toBe(401);
    });

    it("refuse un utilisateur normal (403)", async () => {
        const token = await registerAndGetToken();
        const res = await request(app).get("/contact").set("Authorization", `Bearer ${token}`);
        expect(res.status).toBe(403);
    });

    it("liste les messages pour un administrateur, puis permet de les marquer comme lus", async () => {
        await request(app).post("/contact").send(validMessage);
        const token = await adminToken();

        const list = await request(app).get("/contact").set("Authorization", `Bearer ${token}`);
        expect(list.status).toBe(200);
        expect(list.body).toHaveLength(1);

        const id = list.body[0].id;
        const read = await request(app).patch(`/contact/${id}/read`).set("Authorization", `Bearer ${token}`);
        expect(read.status).toBe(200);
        expect(read.body.lu).toBe(true);

        const missing = await request(app).patch("/contact/inexistant/read").set("Authorization", `Bearer ${token}`);
        expect(missing.status).toBe(404);
    });
});
