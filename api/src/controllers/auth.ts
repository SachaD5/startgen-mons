import * as authService from "../services/auth.js";

export async function register(req: any, res: any, next: any) {
    try {
        const user = await authService.registerUser(req.body);
        res.status(201).json(user);
    } catch (err) { next(err); }
}

export async function login(req: any, res: any, next: any) {
    try {
        const result = await authService.loginUser(req.body);
        res.json(result);
    } catch (err) { next(err); }
}
