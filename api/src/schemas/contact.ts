import { z } from "zod";

export const SUJETS = ["evenement", "partenariat", "rejoindre", "autre"] as const;

export const contactSchema = z.object({
    nom: z
        .string({ error: "Le nom est obligatoire" })
        .trim()
        .min(2, { error: "Le nom est obligatoire" })
        .max(100, { error: "Le nom est trop long" }),
    email: z
        .string({ error: "L'adresse e-mail est obligatoire" })
        .trim()
        .toLowerCase()
        .pipe(z.email({ error: "Adresse e-mail invalide" })),
    sujet: z.enum(SUJETS, { error: "Choisis un sujet" }),
    message: z
        .string({ error: "Le message est obligatoire" })
        .trim()
        .min(10, { error: "Ton message est un peu court (10 caractères minimum)" })
        .max(2000, { error: "Ton message est trop long (2000 caractères maximum)" }),
    // Champ "piège" (honeypot) : invisible pour un humain, rempli par les robots.
    website: z.string().optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;
