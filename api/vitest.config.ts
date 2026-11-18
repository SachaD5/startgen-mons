import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        environment: "node",
        include: ["tests/**/*.test.ts"],
        setupFiles: ["tests/helpers/setup.ts"],
        // Variables d'environnement utilisées uniquement pendant les tests
        env: {
            NODE_ENV: "test",
            DATABASE_URL: "file:./test.db",
            JWT_SECRET: "secret-de-test-assez-long-123456",
            CORS_ORIGIN: "http://localhost:3000",
        },
    },
});
