import bcrypt from "bcrypt";
import * as userRepo from "../repositories/users.js";
import { signToken } from "./tokens.js";
import { ConflictError, UnauthorizedError, ValidationError } from "../errors.js";
import type { ChangePasswordInput, LoginInput, RegisterInput, UpdateProfileInput } from "../schemas/auth.js";

const ROUNDS = 10;

// Hash "bidon" : sert à faire le même travail quand l'e-mail n'existe pas,
// pour qu'on ne puisse pas deviner quels e-mails sont inscrits en mesurant le temps de réponse.
const DUMMY_HASH = bcrypt.hashSync("mot-de-passe-bidon", ROUNDS);

type UserRow = { id: string; email: string; nom: string; prenom: string; role: string };

// Ce qu'on a le droit d'envoyer au navigateur : JAMAIS le mot de passe haché.
function toPublicUser(user: UserRow) {
    return { id: user.id, email: user.email, nom: user.nom, prenom: user.prenom, role: user.role };
}

function isUniqueViolation(err: unknown): boolean {
    return typeof err === "object" && err !== null && "code" in err && err.code === "P2002";
}

export async function registerUser(data: RegisterInput) {
    if (await userRepo.findByEmail(data.email)) {
        throw new ConflictError("Cet e-mail est déjà utilisé");
    }

    const password = await bcrypt.hash(data.password, ROUNDS);

    let user;
    try {
        // Champs listés un par un : le rôle est toujours "USER" (valeur par défaut de la base)
        user = await userRepo.create({ email: data.email, password, nom: data.nom, prenom: data.prenom });
    } catch (err) {
        // Deux inscriptions simultanées avec le même e-mail : la base refuse la seconde
        if (isUniqueViolation(err)) throw new ConflictError("Cet e-mail est déjà utilisé");
        throw err;
    }

    return { token: signToken(user), user: toPublicUser(user) };
}

export async function loginUser(data: LoginInput) {
    const user = await userRepo.findByEmail(data.email);

    const valid = await bcrypt.compare(data.password, user?.password ?? DUMMY_HASH);
    if (!user || !valid) {
        // Même message dans les deux cas : on ne révèle pas si l'e-mail existe
        throw new UnauthorizedError("E-mail ou mot de passe incorrect");
    }

    return { token: signToken(user), user: toPublicUser(user) };
}

export async function getProfile(userId: string) {
    const user = await userRepo.findById(userId);
    if (!user) throw new UnauthorizedError("Compte introuvable");
    return toPublicUser(user);
}

// Modifier nom, prénom et e-mail du compte connecté
export async function updateProfile(userId: string, data: UpdateProfileInput) {
    if (!(await userRepo.findById(userId))) throw new UnauthorizedError("Compte introuvable");

    // L'e-mail doit rester unique : refusé s'il appartient à quelqu'un d'autre
    const taken = await userRepo.findByEmail(data.email);
    if (taken && taken.id !== userId) throw new ConflictError("Cet e-mail est déjà utilisé");

    try {
        const user = await userRepo.update(userId, { email: data.email, nom: data.nom, prenom: data.prenom });
        return toPublicUser(user);
    } catch (err) {
        if (isUniqueViolation(err)) throw new ConflictError("Cet e-mail est déjà utilisé");
        throw err;
    }
}

// Changer son mot de passe (l'ancien est obligatoire)
export async function changePassword(userId: string, data: ChangePasswordInput) {
    const user = await userRepo.findById(userId);
    if (!user) throw new UnauthorizedError("Compte introuvable");

    // Erreur 400 (et pas 401) : le jeton est bon, c'est juste l'ancien mot de passe qui est faux
    const valid = await bcrypt.compare(data.currentPassword, user.password);
    if (!valid) {
        throw new ValidationError("Données invalides", {
            fieldErrors: { currentPassword: ["Mot de passe actuel incorrect"] },
        });
    }
    if (data.currentPassword === data.newPassword) {
        throw new ValidationError("Données invalides", {
            fieldErrors: { newPassword: ["Le nouveau mot de passe doit être différent de l'ancien"] },
        });
    }

    await userRepo.update(userId, { password: await bcrypt.hash(data.newPassword, ROUNDS) });
}
