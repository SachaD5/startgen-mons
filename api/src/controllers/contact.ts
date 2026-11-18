import type { Request, Response } from "express";
import * as contactService from "../services/contact.js";
import type { ContactInput } from "../schemas/contact.js";

export async function submit(req: Request, res: Response) {
    await contactService.submitMessage(req.body as ContactInput);
    res.status(201).json({ ok: true });
}

export async function list(_req: Request, res: Response) {
    res.json(await contactService.listMessages());
}

export async function markRead(req: Request<{ id: string }>, res: Response) {
    res.json(await contactService.markAsRead(req.params.id));
}
