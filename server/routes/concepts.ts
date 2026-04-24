import { RequestHandler } from "express";
import { getAllConcepts } from "../../lib/content.js";
import { GetConceptsResponse, CreateConceptResponse, CreateConceptRequest } from "@shared/api";
import { getDb } from "../../db/index.js";
import { conceptsTable } from "../../db/schema.js";
import { eq, ilike, or } from "drizzle-orm";

export const handleGetConcepts: RequestHandler = async (req, res) => {
  const q = typeof req.query.q === "string" && req.query.q.trim() ? req.query.q.trim() : null;
  let concepts: Record<string, unknown>[];
  if (q && process.env.DATABASE_URL) {
    const db = getDb();
    const rows = await db.select().from(conceptsTable).where(
      or(ilike(conceptsTable.title, `%${q}%`), ilike(conceptsTable.summary, `%${q}%`))
    );
    concepts = rows.map(r => ({ ...r, tags: (r.tags ?? '').split(',').filter(Boolean) }));
  } else {
    concepts = await getAllConcepts();
  }
  const response: GetConceptsResponse = { concepts };
  res.json(response);
};

export const handleGetConceptBySlug: RequestHandler = async (req, res) => {
  const { slug } = req.params;
  if (!process.env.DATABASE_URL) {
    return res.status(503).json({ error: "Database not configured" });
  }
  const db = getDb();
  const rows = await db.select().from(conceptsTable).where(eq(conceptsTable.slug, slug)).limit(1);
  if (rows.length === 0) {
    return res.status(404).json({ error: "Concept not found" });
  }
  const row = rows[0];
  res.json({ concept: { ...row, tags: (row.tags ?? '').split(',').filter(Boolean) } });
};

export const handleCreateConcept: RequestHandler = async (req, res) => {
  const { title, domain, tags }: CreateConceptRequest & { tags?: string[] } = req.body;
  if (!title || !domain) {
    return res.status(400).json({ error: "Title and domain are required" });
  }
  if (!process.env.DATABASE_URL) {
    return res.status(503).json({ error: "Database not configured" });
  }
  const slug = title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  const concept = {
    type: 'concept',
    slug,
    title,
    domain,
  };
  const db = getDb();
  const existing = await db.select({ slug: conceptsTable.slug }).from(conceptsTable).where(eq(conceptsTable.slug, slug)).limit(1);
  if (existing.length > 0) {
    return res.status(400).json({ error: "Concept already exists" });
  }
  await db.insert(conceptsTable).values({ slug, title, domain, tags: (tags ?? []).join(',') });
  const response: CreateConceptResponse = { concept };
  res.json(response);
};
