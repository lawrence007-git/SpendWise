import "dotenv/config"; // FIRST line: loads .env so the settings exist
import cors from "@fastify/cors";
import { clerkPlugin } from "@clerk/fastify";
import { pool } from "./db/pool.js";
import { requireUser } from "./auth/requireUser.js";
import { accountRoutes } from "./routes/account.js";
import { transactionRoutes } from "./routes/transaction.js";
import { categoryRoutes } from "./routes/category.js";
import { budgetRoutes } from "./routes/budget.js";
import Fastify, { type FastifyError } from "fastify";

const app = Fastify({ logger: true });

app.setErrorHandler((err: FastifyError, req, reply) => {
  req.log.error(err);
  const status = err.statusCode && err.statusCode < 500 ? err.statusCode : 500;
  reply.status(status).send({
    error: status === 500 ? "Internal server error" : err.message,
  });
});

await app.register(cors, {
  origin: process.env.APP_ORIGIN ?? "http://localhost:3000",
  allowedHeaders: ["Content-Type", "Authorization"],
  methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
});
await app.register(clerkPlugin);

app.get("/health", async () => ({ ok: true }));

app.get("/db-check", async () => {
  const result = await pool.query("SELECT NOW()");
  return { connected: true, time: result.rows[0].now };
});

app.get("/me", { preHandler: requireUser }, async (req) => {
  return req.currentUser;
});
await app.register(accountRoutes);
await app.register(transactionRoutes);
await app.register(categoryRoutes);
await app.register(budgetRoutes);

await app.listen({
  port: Number(process.env.PORT ?? 4000),
  host: "0.0.0.0",
});
