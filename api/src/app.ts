import express from "express";
import cors from "cors";
import helmet from "helmet";
import { env } from "./config.js";
import { authRouter } from "./routes/auth.js";
import { eventsRouter } from "./routes/events.js";
import { contactRouter } from "./routes/contact.js";
import { errorHandler, notFound } from "./middlewares/errorHandler.js";

// L'application est créée dans une fonction (et non directement lancée) :
// les tests peuvent ainsi l'utiliser sans ouvrir de port.
export function createApp() {
    const app = express();

    // Derrière Nginx (VPS), l'adresse IP réelle du visiteur vient d'un en-tête : nécessaire au rate limit
    if (env.TRUST_PROXY > 0) app.set("trust proxy", env.TRUST_PROXY);

    app.use(helmet()); // en-têtes de sécurité HTTP
    app.use(cors({ origin: env.CORS_ORIGIN.split(",").map((o) => o.trim()) }));
    app.use(express.json({ limit: "10kb" })); // lit le JSON, refuse les corps trop gros

    // Pour vérifier que l'API tourne (Docker, déploiement...)
    app.get("/health", (_req, res) => {
        res.json({ status: "ok" });
    });

    app.use("/auth", authRouter);
    app.use("/events", eventsRouter);
    app.use("/contact", contactRouter);

    app.use(notFound);
    app.use(errorHandler); // toujours en dernier

    return app;
}
