import { FastifyInstance } from "fastify";
import { z } from "zod";
import { db } from "../db/index.js";
import {
  categories,
  transactionTypeEnum,
  categoryColorEnum,
  categoryIconEnum,
} from "../db/schema.js";
import { eq, and, asc, isNull, isNotNull } from "drizzle-orm";
import { requireUser } from "../auth/requireUser.js";

const typeEnum = z.enum(["income", "expense"], {
  message: "Type must be income or expense",
});

const createCategorySchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name is Required")
    .max(100, "Name is too Long"),
  transactionType: typeEnum,
  color: z
    .enum(categoryColorEnum.enumValues, {
      message: "Invalid Category Color",
    })
    .optional(),
  icon: z
    .enum(categoryIconEnum.enumValues, {
      message: "Invlaid Category Icon",
    })
    .optional(),
});

const updateCategorySchema = createCategorySchema
  .omit({ transactionType: true })
  .partial()
  .refine((o) => Object.keys(o).length > 0, "Nothing to update");

const idParamSchema = z.object({ id: z.uuid("Invalid category id") });

const listQuerySchema = z.object({
  type: typeEnum.optional(),
  includeArchived: z.enum(["true", "false"]).optional(),
});

const isDuplicate = (e: unknown) => {
  const err = e as { code?: string; cause?: { code?: string } };
  return err?.code === "23505" || err?.cause?.code === "23505";
};
export async function categoryRoutes(app: FastifyInstance) {
  app.get("/categories", { preHandler: requireUser }, async (req, reply) => {
    const userId = req.currentUser.id;

    const q = listQuerySchema.safeParse(req.query);
    if (!q.success) {
      return reply.status(400).send({
        error: "Invalid query",
        details: z.flattenError(q.error),
      });
    }

    const conditions = [eq(categories.ownerId, userId)];
    if (q.data.includeArchived !== "true") {
      conditions.push(isNull(categories.archiveAt));
    }
    if (q.data.type) {
      conditions.push(eq(categories.transactionType, q.data.type));
    }
    const rows = await db
      .select()
      .from(categories)
      .where(and(...conditions))
      .orderBy(asc(categories.name));

    return reply.send(rows);
  });
  app.post("/categories", { preHandler: requireUser }, async (req, reply) => {
    const userId = req.currentUser.id;

    const v = createCategorySchema.safeParse(req.body);
    if (!v.success) {
      return reply.status(400).send({
        error: "Validation Failed",
        details: z.flattenError(v.error),
      });
    }

    try {
      const [created] = await db
        .insert(categories)
        .values({ ownerId: userId, ...v.data })
        .returning();
      return reply.status(201).send(created);
    } catch (e) {
      if (isDuplicate(e)) {
        return reply
          .status(409)
          .send({ error: "You already have a category with that name" });
      }
      throw e;
    }
  });

  app.patch(
    "/categories/:id",
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
      const v = updateCategorySchema.safeParse(req.body);
      if (!v.success) {
        return reply.status(400).send({
          error: "Validation Failed",
          details: z.flattenError(v.error),
        });
      }

      try {
        const [updated] = await db
          .update(categories)
          .set(v.data)
          .where(
            and(
              eq(categories.id, p.data.id),
              eq(categories.ownerId, userId),
              isNull(categories.archiveAt),
            ),
          )
          .returning();

        if (!updated) {
          return reply.status(404).send({ error: "Category not found" });
        }
        return reply.send(updated);
      } catch (e) {
        if (isDuplicate(e)) {
          return reply
            .status(409)
            .send({ error: "You already have a category with that name" });
        }
        throw e;
      }
    },
  );
  app.patch(
    "/categories/:id/archive",
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

      const [archive] = await db
        .update(categories)
        .set({ archiveAt: new Date() })
        .where(
          and(
            eq(categories.id, p.data.id),
            eq(categories.ownerId, userId),
            isNull(categories.archiveAt),
          ),
        )
        .returning();

      if (!archive) {
        return reply.status(404).send({ error: "Category not found" });
      }
      return reply.send(archive);
    },
  );

  app.patch(
    "/categories/:id/restore",
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

      const [restored] = await db
        .update(categories)
        .set({ archiveAt: null })
        .where(
          and(
            eq(categories.id, p.data.id),
            eq(categories.ownerId, userId),
            isNotNull(categories.archiveAt),
          ),
        )
        .returning();

      if (!restored)
        return reply.status(404).send({ error: "Category not found" });
      return reply.send(restored);
    },
  );
}
