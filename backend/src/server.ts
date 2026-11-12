import "dotenv/config"; // FIRST line: loads .env so the settings exist
import Fastify from "fastify";
import cors from "@fastify/cors";
import { clerkPlugin } from "@clerk/fastify";
import { pool } from "./db/pool.js";
import { requireUser } from "./auth/requireUser.js";

const app = Fastify({ logger: true });

await app.register(cors, { origin: process.env.APP_ORIGIN });

await app.register(clerkPlugin);

app.get("/health", async () => ({ ok: true }));

app.get("/db-check", async () => {
  const result = await pool.query("SELECT NOW()");
  return { connected: true, time: result.rows[0].now };
});

app.get("/me", { preHandler: requireUser }, async (req) => {
  return req.currentUser;
});

await app.listen({ port: 4000 });
