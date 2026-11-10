import { Router } from "express";
import * as events from "../controllers/events.js";

export const eventsRouter = Router();
eventsRouter.get("/", events.list);
eventsRouter.post("/", events.create);
