import type { Request, Response } from "express";
import * as eventService from "../services/events.js";
import type { EventInput } from "../schemas/events.js";

export async function list(_req: Request, res: Response) {
    res.json(await eventService.listEvents());
}

export async function create(req: Request, res: Response) {
    // L'auteur vient du jeton (req.auth), jamais du corps de la requête
    const event = await eventService.createEvent(req.body as EventInput, req.auth!.userId);
    res.status(201).json(event);
}

export async function remove(req: Request<{ id: string }>, res: Response) {
    await eventService.deleteEvent(req.params.id);
    res.status(204).send();
}
