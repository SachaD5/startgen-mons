import * as messagesRepo from "../repositories/messages.js";
import { NotFoundError } from "../errors.js";
import type { ContactInput } from "../schemas/contact.js";

export async function submitMessage(data: ContactInput) {
    // Piège anti-robots : un humain ne voit pas ce champ, donc il reste vide.
    // On répond "ok" quand même pour ne pas aider le robot, mais on ne stocke rien.
    if (data.website) return;

    await messagesRepo.create({
        nom: data.nom,
        email: data.email,
        sujet: data.sujet,
        message: data.message,
    });
}

export function listMessages() {
    return messagesRepo.findAll();
}

export async function markAsRead(id: string) {
    if (!(await messagesRepo.findById(id))) throw new NotFoundError("Message introuvable");
    return messagesRepo.markRead(id);
}
