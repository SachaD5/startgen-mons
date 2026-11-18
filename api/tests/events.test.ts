import { describe, it, expect } from "vitest";
import request from "supertest";
import { app, registerAndGetToken, adminToken } from "./helpers/utils.js";
import * as events from "./helpers/memoryEvents.js";

const validEvent = {
    title: "Workshop pitch",
    date: "2026-12-03T18:00:00Z",
    location: "HELHa Mons",
    description: "Apprendre à présenter son projet en 3 minutes.",
    type: "workshop",
};

describe("GET /events", () => {
    it("est public et renvoie les événements triés par date", async () => {
        const token = await adminToken();
        await request(app).post("/events").set("Authorization", `Bearer ${token}`)
            .send({ ...validEvent, title: "Plus tard", date: "2026-12-20T18:00:00Z" });
        await request(app).post("/events").set("Authorization", `Bearer ${token}`)
            .send({ ...validEvent, title: "Plus tôt", date: "2026-12-01T18:00:00Z" });

        const res = await request(app).get("/events");
        expect(res.status).toBe(200);
        expect(res.body.map((e: { title: string }) => e.title)).toEqual(["Plus tôt", "Plus tard"]);
    });
});

describe("POST /events", () => {
    it("refuse sans connexion (401)", async () => {
        const res = await request(app).post("/events").send(validEvent);
        expect(res.status).toBe(401);
        expect(events.store).toHaveLength(0);
    });

    it("refuse un utilisateur normal (403)", async () => {
        const token = await registerAndGetToken();
        const res = await request(app).post("/events").set("Authorization", `Bearer ${token}`).send(validEvent);
        expect(res.status).toBe(403);
        expect(events.store).toHaveLength(0);
    });

    it("crée l'événement pour un administrateur, avec lui comme auteur (pas un userId du client)", async () => {
        const token = await adminToken();
        const res = await request(app)
            .post("/events")
            .set("Authorization", `Bearer ${token}`)
            .send({ ...validEvent, createdById: "pirate", userId: "pirate" });

        expect(res.status).toBe(201);
        expect(res.body).toMatchObject({ title: "Workshop pitch", type: "workshop" });
        expect(res.body.createdById).not.toBe("pirate");
    });

    it("refuse des données invalides (400)", async () => {
        const token = await adminToken();
        const res = await request(app)
            .post("/events")
            .set("Authorization", `Bearer ${token}`)
            .send({ title: "x", date: "pas-une-date", location: "", description: "" });

        expect(res.status).toBe(400);
        expect(Object.keys(res.body.details.fieldErrors)).toEqual(
            expect.arrayContaining(["title", "date", "location", "description"]),
        );
    });
});

describe("DELETE /events/:id", () => {
    it("supprime pour un administrateur, 404 si l'événement n'existe pas", async () => {
        const token = await adminToken();
        const created = await request(app).post("/events").set("Authorization", `Bearer ${token}`).send(validEvent);

        const ok = await request(app).delete(`/events/${created.body.id}`).set("Authorization", `Bearer ${token}`);
        expect(ok.status).toBe(204);
        expect(events.store).toHaveLength(0);

        const again = await request(app).delete(`/events/${created.body.id}`).set("Authorization", `Bearer ${token}`);
        expect(again.status).toBe(404);
    });

    it("refuse un utilisateur normal (403)", async () => {
        const token = await registerAndGetToken();
        const res = await request(app).delete("/events/abc").set("Authorization", `Bearer ${token}`);
        expect(res.status).toBe(403);
    });
});
