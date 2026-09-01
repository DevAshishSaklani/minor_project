import "dotenv/config";
import { defineConfig } from "drizzle-kit";

console.log(
  "DATABASE_URL:",
  process.env.DATABASE_URL ? "FOUND" : "MISSING"
);

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/db/schema.ts",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});