import { Router } from "express";
import * as auth from "../controllers/auth.js";
import { validate } from "../middlewares/validate.js";
import { requireAuth } from "../middlewares/auth.js";
import { authLimiter } from "../middlewares/rateLimit.js";
import { loginSchema, registerSchema } from "../schemas/auth.js";

export const authRouter = Router();

authRouter.post("/register", authLimiter, validate(registerSchema), auth.register);
authRouter.post("/login", authLimiter, validate(loginSchema), auth.login);
authRouter.get("/me", requireAuth, auth.me);
