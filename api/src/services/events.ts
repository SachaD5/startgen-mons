import * as eventsRepo from "../repositories/events.js";

export async function listEvents() {
    return eventsRepo.findAll();
}

export async function createEvent(data: any, userId: string) {
    return eventsRepo.create({ ...data, createdById: userId });
}
