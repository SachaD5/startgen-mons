import type { RequestHandler } from "express";
import { z } from "zod";
import { ValidationError } from "../errors.js";

// Valide (et nettoie) req.body avec un schéma zod.
// - champs inconnus supprimés (ex : "role" envoyé par un client malveillant)
// - e-mail mis en minuscules, textes "trimmés", etc.
// En cas d'erreur : 400 avec { details: { fieldErrors: { champ: ["message"] } } }
export function validate(schema: z.ZodType): RequestHandler {
    return (req, _res, next) => {
        const result = schema.safeParse(req.body ?? {});
        if (!result.success) {
            const { fieldErrors } = z.flattenError(result.error);
            throw new ValidationError("Données invalides", { fieldErrors });
        }
        req.body = result.data;
        next();
    };
}
