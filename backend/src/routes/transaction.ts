import { FastifyInstance } from "fastify";
import { z } from "zod";
import { db } from "../db/index.js";
import { accounts, transactions } from "../db/schema.js";
import { and, desc, eq, gte, isNull, lte } from "drizzle-orm";
import { requireUser } from "../auth/requireUser.js";

const createTransactionSchema = z.object({
  accountId: z.uuid("Invalid account id"),
  transactionType: z.enum(["income", "expense"], {
    message: "Type must be income or expense",
  }),
  amount: z
    .string()
    .regex(
      /^\d{1,10}(\.\d{1,2})?$/,
      "Amount must be a number with up to 2 decimals",
    )
    .refine((v) => Number(v) > 0, "Amount must be greater than 0"),
  transactionDate: z.iso.date("Date must be YYYY-MM-DD"),
  description: z.string().trim().min(1, "Description is required").max(200),
  notes: z.string().trim().max(1000).optional(),
});

const updateTransactionSchema = createTransactionSchema
  .omit({ accountId: true })
  .partial()
  .refine((o) => Object.keys(o).length > 0, "Nothing to update");

const idParamSchema = z.object({ id: z.uuid("Invalid transaction id") });

const listQuerySchema = z.object({
  accountId: z.uuid().optional(),
  from: z.iso.date().optional(),
  to: z.iso.date().optional(),
  limit: z.coerce.number().int().min(1).max(100).default(50),
});

export async function transactionRoutes(app: FastifyInstance) {
  app.get("/transactions", { preHandler: requireUser }, async (req, reply) => {
    const userId = req.currentUser.id;

    const q = listQuerySchema.safeParse(req.query);
    if (!q.success) {
      return reply.status(400).send({
        error: "Invalid query",
        details: z.flattenError(q.error),
      });
    }
    const { accountId, from, to, limit } = q.data;

    const conditions = [eq(transactions.ownerId, userId)];
    if (accountId) conditions.push(eq(transactions.accountId, accountId));
    if (from) conditions.push(gte(transactions.transactionDate, from));
    if (to) conditions.push(lte(transactions.transactionDate, to));

    const rows = await db
      .select()
      .from(transactions)
      .where(and(...conditions))
      .orderBy(desc(transactions.transactionDate), desc(transactions.createdAt))
      .limit(limit);

    return reply.send(rows);
  });

  app.get(
    "/transactions/:id",
    { preHandler: requireUser },
    async (req, reply) => {
      const userId = req.currentUser.id;

      const p = idParamSchema.safeParse(req.params);
      if (!p.success) {
        return reply.status(400).send({
          error: "Invalid request parameters",
          details: z.flattenError(p.error),
        });
      }

      const [row] = await db
        .select()
        .from(transactions)
        .where(
          and(eq(transactions.id, p.data.id), eq(transactions.ownerId, userId)),
        );

      if (!row)
        return reply.status(404).send({ error: "Transaction not found" });
      return reply.send(row);
    },
  );

  app.post("/transactions", { preHandler: requireUser }, async (req, reply) => {
    const userId = req.currentUser.id;

    const v = createTransactionSchema.safeParse(req.body);
    if (!v.success) {
      return reply.status(400).send({
        error: "Validation Failed",
        details: z.flattenError(v.error),
      });
    }
    const {
      accountId,
      transactionType,
      amount,
      transactionDate,
      description,
      notes,
    } = v.data;

    const [account] = await db
      .select()
      .from(accounts)
      .where(
        and(
          eq(accounts.id, accountId),
          eq(accounts.ownerId, userId),
          isNull(accounts.archiveAt),
        ),
      );
    if (!account) {
      return reply.status(404).send({ error: "Account not found" });
    }

    const [created] = await db
      .insert(transactions)
      .values({
        ownerId: userId,
        accountId,
        transactionType,
        amount,
        currency: account.currency,
        transactionDate,
        description,
        notes,
      })
      .returning();

    return reply.status(201).send(created);
  });

  app.patch(
    "/transactions/:id",
    { preHandler: requireUser },
    async (req, reply) => {
      const userId = req.currentUser.id;

      const p = idParamSchema.safeParse(req.params);
      if (!p.success) {
        return reply.status(400).send({
          error: "Invalid request parameters",
          details: z.flattenError(p.error),
        });
      }
      const v = updateTransactionSchema.safeParse(req.body);
      if (!v.success) {
        return reply.status(400).send({
          error: "Validation Failed",
          details: z.flattenError(v.error),
        });
      }

      const [updated] = await db
        .update(transactions)
        .set(v.data)
        .where(
          and(eq(transactions.id, p.data.id), eq(transactions.ownerId, userId)),
        )
        .returning();

      if (!updated)
        return reply.status(404).send({ error: "Transaction not found" });
      return reply.send(updated);
    },
  );

  app.delete(
    "/transactions/:id",
    { preHandler: requireUser },
    async (req, reply) => {
      const userId = req.currentUser.id;

      const p = idParamSchema.safeParse(req.params);
      if (!p.success) {
        return reply.status(400).send({
          error: "Invalid request parameters",
          details: z.flattenError(p.error),
        });
      }

      const [deleted] = await db
        .delete(transactions)
        .where(
          and(eq(transactions.id, p.data.id), eq(transactions.ownerId, userId)),
        )
        .returning();

      if (!deleted)
        return reply.status(404).send({ error: "Transaction not found" });
      return reply.status(204).send();
    },
  );
}
