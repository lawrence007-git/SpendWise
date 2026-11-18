import type { FastifyReply, FastifyRequest } from "fastify";
import { getAuth } from "@clerk/fastify";
import { eq } from "drizzle-orm";
import { db } from "../db/index.js";
import { users } from "../db/schema.js";

type DbUser = typeof users.$inferSelect;

declare module "fastify" {
  interface FastifyRequest {
    currentUser: DbUser;
  }
}

export async function requireUser(req: FastifyRequest, reply: FastifyReply) {
  const { userId } = getAuth(req);
  if (!userId) {
    return reply.code(401).send({ error: "Not signed in" });
  }

  await db.insert(users).values({ clerkUserId: userId }).onConflictDoNothing();

  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.clerkUserId, userId));

  if (!user) {
    return reply.status(500).send({ error: "Could not load server" });
  }
  req.currentUser = user;
}
