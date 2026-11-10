import * as eventService from "../services/events.js";

export async function list(req: any, res: any, next: any) {
    try {
        res.json(await eventService.listEvents());
    } catch (err) { next(err); }
}

export async function create(req: any, res: any, next: any) {
    try {
        const userId = req.body.userId || "temp-user-id";
        const newEvent = await eventService.createEvent(req.body, userId);
        res.status(201).json(newEvent);
    } catch (err) { next(err); }
}
