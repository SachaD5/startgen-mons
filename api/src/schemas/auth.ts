import { z } from "zod";

const email = z
    .string({ error: "L'adresse e-mail est obligatoire" })
    .trim()
    .toLowerCase()
    .pipe(z.email({ error: "Adresse e-mail invalide" }));

// bcrypt ne lit que les 72 premiers caractères : on limite donc la taille
const password = z
    .string({ error: "Le mot de passe est obligatoire" })
    .min(8, { error: "Le mot de passe doit contenir au moins 8 caractères" })
    .max(72, { error: "Le mot de passe est trop long (72 caractères maximum)" })
    .regex(/[A-Za-z]/, { error: "Le mot de passe doit contenir au moins une lettre" })
    .regex(/[0-9]/, { error: "Le mot de passe doit contenir au moins un chiffre" });

const name = (label: string) =>
    z
        .string({ error: `${label} est obligatoire` })
        .trim()
        .min(1, { error: `${label} est obligatoire` })
        .max(60, { error: `${label} est trop long` });

// Pas de champ "role" ici : un client ne peut jamais choisir son rôle.
export const registerSchema = z.object({
    nom: name("Le nom"),
    prenom: name("Le prénom"),
    email,
    password,
});

export const loginSchema = z.object({
    email,
    password: z.string({ error: "Le mot de passe est obligatoire" }).min(1, { error: "Le mot de passe est obligatoire" }),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
