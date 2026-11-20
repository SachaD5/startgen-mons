import { Router } from "express";
import * as auth from "../controllers/auth.js";
import { validate } from "../middlewares/validate.js";
import { requireAuth } from "../middlewares/auth.js";
import { authLimiter } from "../middlewares/rateLimit.js";
import { changePasswordSchema, loginSchema, registerSchema, updateProfileSchema } from "../schemas/auth.js";

export const authRouter = Router();

authRouter.post("/register", authLimiter, validate(registerSchema), auth.register);
authRouter.post("/login", authLimiter, validate(loginSchema), auth.login);
authRouter.get("/me", requireAuth, auth.me);
authRouter.patch("/me", requireAuth, validate(updateProfileSchema), auth.updateMe);
authRouter.put("/me/password", requireAuth, authLimiter, validate(changePasswordSchema), auth.changePassword);
