import { defineConfig } from "prisma/config";
import path from "node:path";
import "dotenv/config";

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
