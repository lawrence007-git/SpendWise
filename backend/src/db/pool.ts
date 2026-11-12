import pg from "pg";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is missing. Check your .env file.");
}

export const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});
