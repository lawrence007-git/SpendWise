import { FastifyInstance } from "fastify";
import { z } from "zod";
import { db } from "../db/index.js";
import { budgets, categories, users } from "../db/schema.js";
import { and, asc, desc, eq, isNull } from "drizzle-orm";
import { requireUser } from "../auth/requireUser.js";

const createBudgetSchema = z.object({
  categoryId: z.uuid("Invalid category id"),
  periodMonth: z
    .number()
    .int("Month must be a whole number")
    .min(1, "Month must be 1-12")
    .max(12, "Month must be 1-12"),
  periodYear: z
    .number()
    .int("Year must be a whole number")
    .min(2000, "Year is out of range")
    .max(2100, "Year is out of range"),
  amount: z
    .string()
    .regex(
      /^\d{1,10}(\.\d{1,2})?$/,
      "Amount must be a number with up to 2 decimals",
    )
    .refine((v) => Number(v) > 0, "Amount must be greater than 0"),
});

// Category + period identify a budget, so only the amount can change.
const updateBudgetSchema = createBudgetSchema
  .omit({ categoryId: true, periodMonth: true, periodYear: true })
  .partial()
  .refine((o) => Object.keys(o).length > 0, "Nothing to update");

const idParamSchema = z.object({ id: z.uuid("Invalid budget id") });

const listQuerySchema = z.object({
  categoryId: z.uuid().optional(),
  month: z.coerce.number().int().min(1).max(12).optional(),
  year: z.coerce.number().int().min(2000).max(2100).optional(),
  limit: z.coerce.number().int().min(1).max(100).default(50),
});

// Postgres unique_violation (SQLSTATE 23505), raw or wrapped by the driver.
function isUniqueViolation(e: unknown) {
  const err = e as { code?: string; cause?: { code?: string } } | null;
  return err?.code === "23505" || err?.cause?.code === "23505";
}

export async function budgetRoutes(app: FastifyInstance) {
  app.get("/budgets", { preHandler: requireUser }, async (req, reply) => {
    const userId = req.currentUser.id;

    const q = listQuerySchema.safeParse(req.query);
    if (!q.success) {
      return reply.status(400).send({
        error: "Invalid query",
        details: z.flattenError(q.error),
      });
    }
    const { categoryId, month, year, limit } = q.data;

    const conditions = [eq(budgets.ownerId, userId)];
    if (categoryId) conditions.push(eq(budgets.categoryId, categoryId));
    if (month) conditions.push(eq(budgets.periodMonth, month));
    if (year) conditions.push(eq(budgets.periodYear, year));

    const rows = await db
      .select()
      .from(budgets)
      .where(and(...conditions))
      .orderBy(
        desc(budgets.periodYear),
        desc(budgets.periodMonth),
        asc(budgets.id),
      )
      .limit(limit);

    return reply.send(rows);
  });

  app.get("/budgets/:id", { preHandler: requireUser }, async (req, reply) => {
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
      .from(budgets)
      .where(and(eq(budgets.id, p.data.id), eq(budgets.ownerId, userId)));

    if (!row) return reply.status(404).send({ error: "Budget not found" });
    return reply.send(row);
  });

  app.post("/budgets", { preHandler: requireUser }, async (req, reply) => {
    const userId = req.currentUser.id;

    const v = createBudgetSchema.safeParse(req.body);
    if (!v.success) {
      return reply.status(400).send({
        error: "Validation Failed",
        details: z.flattenError(v.error),
      });
    }
    const { categoryId, periodMonth, periodYear, amount } = v.data;

    const [category] = await db
      .select()
      .from(categories)
      .where(
        and(
          eq(categories.id, categoryId),
          eq(categories.ownerId, userId),
          isNull(categories.archiveAt),
        ),
      );
    if (!category) {
      return reply.status(404).send({ error: "Category not found" });
    }
    if (category.transactionType !== "expense") {
      return reply
        .status(400)
        .send({ error: "Budgets can only be set for expense categories" });
    }

    // Derived server-side: budgets have no account, so use the user's default.
    const [user] = await db
      .select({ currency: users.defaultCurrency })
      .from(users)
      .where(eq(users.id, userId));

    try {
      const [created] = await db
        .insert(budgets)
        .values({
          ownerId: userId,
          categoryId,
          periodMonth,
          periodYear,
          amount,
          currency: user?.currency ?? "PHP",
        })
        .returning();

      return reply.status(201).send(created);
    } catch (e) {
      if (isUniqueViolation(e)) {
        return reply.status(409).send({
          error: "A budget for this category and month already exists",
        });
      }
      throw e;
    }
  });

  app.patch("/budgets/:id", { preHandler: requireUser }, async (req, reply) => {
    const userId = req.currentUser.id;

    const p = idParamSchema.safeParse(req.params);
    if (!p.success) {
      return reply.status(400).send({
        error: "Invalid request parameters",
        details: z.flattenError(p.error),
      });
    }
    const v = updateBudgetSchema.safeParse(req.body);
    if (!v.success) {
      return reply.status(400).send({
        error: "Validation Failed",
        details: z.flattenError(v.error),
      });
    }

    const [updated] = await db
      .update(budgets)
      .set(v.data)
      .where(and(eq(budgets.id, p.data.id), eq(budgets.ownerId, userId)))
      .returning();

    if (!updated) return reply.status(404).send({ error: "Budget not found" });
    return reply.send(updated);
  });

  app.delete(
    "/budgets/:id",
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
        .delete(budgets)
        .where(and(eq(budgets.id, p.data.id), eq(budgets.ownerId, userId)))
        .returning();

      if (!deleted)
        return reply.status(404).send({ error: "Budget not found" });
      return reply.status(204).send();
    },
  );
}
