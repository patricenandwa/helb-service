import { defineConfig } from "drizzle-kit";


const dbConnectionString = process.env.DATABASE_URL;
if (!dbConnectionString) {
  throw new Error("DATABASE_URL environment variable is not set.");
}

export default defineConfig({
  schema: "./lib/db/schema.ts",
  out: "./lib/db/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: dbConnectionString,
  },
  verbose: true,
  strict: true
});