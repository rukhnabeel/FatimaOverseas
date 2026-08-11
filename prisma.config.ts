import { defineConfig } from "prisma/config";
import path from "node:path";

// SQLite adapter for local development
export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    url: process.env.DATABASE_URL ?? "file:./dev.db",
  },
  migrations: {
    seed: "ts-node prisma/seed.ts",
  },
});
