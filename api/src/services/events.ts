import * as eventsRepo from "../repositories/events.js";
import { NotFoundError } from "../errors.js";
import type { EventInput } from "../schemas/events.js";

export function listEvents() {
    return eventsRepo.findAll();
}

export function createEvent(data: EventInput, userId: string) {
    return eventsRepo.create({ ...data, createdById: userId });
}

export async function deleteEvent(id: string) {
    if (!(await eventsRepo.findById(id))) throw new NotFoundError("Événement introuvable");
    await eventsRepo.remove(id);
}
