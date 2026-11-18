import { Router } from "express";
import * as events from "../controllers/events.js";
import { validate } from "../middlewares/validate.js";
import { requireAuth, requireRole } from "../middlewares/auth.js";
import { eventSchema } from "../schemas/events.js";

export const eventsRouter = Router();

// Lecture publique (le calendrier du site)
eventsRouter.get("/", events.list);

// Écriture : connecté ET administrateur
eventsRouter.post("/", requireAuth, requireRole("ADMIN"), validate(eventSchema), events.create);
eventsRouter.delete("/:id", requireAuth, requireRole("ADMIN"), events.remove);
