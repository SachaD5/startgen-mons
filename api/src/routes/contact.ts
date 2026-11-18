import { Router } from "express";
import * as contact from "../controllers/contact.js";
import { validate } from "../middlewares/validate.js";
import { requireAuth, requireRole } from "../middlewares/auth.js";
import { contactLimiter } from "../middlewares/rateLimit.js";
import { contactSchema } from "../schemas/contact.js";

export const contactRouter = Router();

// Public : n'importe quel visiteur peut écrire
contactRouter.post("/", contactLimiter, validate(contactSchema), contact.submit);

// Réservé aux administrateurs : lire les messages reçus
contactRouter.get("/", requireAuth, requireRole("ADMIN"), contact.list);
contactRouter.patch("/:id/read", requireAuth, requireRole("ADMIN"), contact.markRead);
