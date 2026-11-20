import { FastifyInstance } from "fastify";
import { z } from "zod";
import { db } from "../db/index.js";
import { accounts } from "../db/schema.js";
import { eq, and, isNull } from "drizzle-orm";
import { requireUser } from "../auth/requireUser.js";

const createAccountSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Account name is required")
    .max(100, "Name is too long"),
  accountType: z.enum(["bank", "cash", "ewallet"], {
    message: "Account type must be bank, cash or ewallet",
  }),
  currency: z
    .string()
    .length(3, "Currency must be a 3-letter ISO code (e.g. PHP)")
    .transform((s) => s.toUpperCase()),
  openingBalance: z
    .string()
    .regex(
      /^\d+(\.\d{1,2})?$/,
      "Opening balance must be a valid positive number with up to 2 decimal places",
    )
    .default("0.00"),
});

const accountIdParamSchema = z.object({
  id: z.uuid("Invalid account id"),
});

export async function accountRoutes(app: FastifyInstance) {
  app.get("/accounts", { preHandler: requireUser }, async (req, reply) => {
    const userId = req.currentUser.id;

    const userAccounts = await db
      .select()
      .from(accounts)
      .where(and(eq(accounts.ownerId, userId), isNull(accounts.archiveAt)));

    return reply.send(userAccounts);
  });

  app.get("/accounts/:id", { preHandler: requireUser }, async (req, reply) => {
    const userId = req.currentUser.id;

    const paramValidation = accountIdParamSchema.safeParse(req.params);
    if (!paramValidation.success) {
      return reply.status(400).send({
        error: "Invalid request parameters",
        details: z.flattenError(paramValidation.error),
      });
    }
    const { id } = paramValidation.data;

    const [account] = await db
      .select()
      .from(accounts)
      .where(and(eq(accounts.id, id), eq(accounts.ownerId, userId)));

    if (!account) {
      return reply.status(404).send({ error: "Account not found" });
    }
    return reply.send(account);
  });

  app.post("/accounts", { preHandler: requireUser }, async (req, reply) => {
    const userId = req.currentUser.id;

    const validationResult = createAccountSchema.safeParse(req.body);
    if (!validationResult.success) {
      return reply.status(400).send({
        error: "Validation Failed",
        details: z.flattenError(validationResult.error),
      });
    }

    const { name, accountType, currency, openingBalance } =
      validationResult.data;

    const [newAccount] = await db
      .insert(accounts)
      .values({ ownerId: userId, name, accountType, currency, openingBalance })
      .returning();

    return reply.status(201).send(newAccount);
  });

  app.patch(
    "/accounts/:id/archive",
    { preHandler: requireUser },
    async (req, reply) => {
      const userId = req.currentUser.id;

      const paramValidation = accountIdParamSchema.safeParse(req.params);
      if (!paramValidation.success) {
        return reply.status(400).send({
          error: "Invalid request parameters",
          details: z.flattenError(paramValidation.error),
        });
      }
      const { id } = paramValidation.data;

      const [updatedAccount] = await db
        .update(accounts)
        .set({ archiveAt: new Date() })
        .where(
          and(
            eq(accounts.id, id),
            eq(accounts.ownerId, userId),
            isNull(accounts.archiveAt),
          ),
        )
        .returning();

      if (!updatedAccount) {
        return reply
          .status(404)
          .send({ error: "Account not found or unauthorized" });
      }
      return reply.send(updatedAccount);
    },
  );
}
