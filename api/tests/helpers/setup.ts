import { vi, beforeEach } from "vitest";
import * as users from "./memoryUsers.js";
import * as events from "./memoryEvents.js";
import * as messages from "./memoryMessages.js";

// Remplace les vrais repositories (Prisma) par les versions en mémoire pour TOUS les tests.
vi.mock("../../src/repositories/users.js", () => import("./memoryUsers.js"));
vi.mock("../../src/repositories/events.js", () => import("./memoryEvents.js"));
vi.mock("../../src/repositories/messages.js", () => import("./memoryMessages.js"));

// Base vide avant chaque test
beforeEach(() => {
    users.__reset();
    events.__reset();
    messages.__reset();
});
