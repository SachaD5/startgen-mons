import express from "express";
import cors from "cors";
import { eventsRouter } from "./routes/events.js";
import { authRouter } from "./routes/auth.js";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Routes de l'API
app.use("/events", eventsRouter);
app.use("/auth", authRouter);

// Middleware global de gestion des erreurs
app.use((err: any, req: any, res: any, next: any) => {
    const status = err.status || 500;
    res.status(status).json({
        error: err.message || "Erreur interne du serveur",
        details: err.details || null
    });
});

app.listen(PORT, () => {
    console.log(`🚀 API StartGen Mons lancée sur http://localhost:${PORT}`);
});
