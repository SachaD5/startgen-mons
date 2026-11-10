import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as userRepo from "../repositories/users.js";
import { ValidationError, UnauthorizedError } from "../errors.js";

const JWT_SECRET = process.env.JWT_SECRET || "secret_devops_helha";

export async function registerUser(data: any) {
    const existing = await userRepo.findByEmail(data.email);
    if (existing) throw new ValidationError("Cet email est déjà utilisé");

    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = await userRepo.createUser({
        ...data,
        password: hashedPassword,
    });

    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
}

export async function loginUser(data: any) {
    const user = await userRepo.findByEmail(data.email);
    if (!user) throw new UnauthorizedError("Email ou mot de passe incorrect");

    const valid = await bcrypt.compare(data.password, user.password);
    if (!valid) throw new UnauthorizedError("Email ou mot de passe incorrect");

    const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, { expiresIn: "1d" });
    return {
        token,
        user: { id: user.id, email: user.email, nom: user.nom, prenom: user.prenom, role: user.role }
    };
}
