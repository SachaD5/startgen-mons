import { z } from "zod";

export const EVENT_TYPES = ["atelier", "workshop", "hackathon", "networking", "concours", "autre"] as const;

export const eventSchema = z.object({
    title: z.string({ error: "Le titre est obligatoire" }).trim().min(3, { error: "Titre trop court" }).max(120),
    // Accepte "2026-12-03T18:00:00Z" ou "2026-12-03"
    date: z.coerce.date({ error: "Date invalide" }),
    location: z.string({ error: "Le lieu est obligatoire" }).trim().min(2).max(160),
    description: z.string({ error: "La description est obligatoire" }).trim().min(5).max(2000),
    type: z.enum(EVENT_TYPES).default("autre"),
});

export type EventInput = z.infer<typeof eventSchema>;
