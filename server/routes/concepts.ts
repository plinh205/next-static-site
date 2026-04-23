import { RequestHandler } from "express";
import { getAllConcepts } from "../../lib/content.js";
import { GetConceptsResponse, CreateConceptResponse, CreateConceptRequest } from "@shared/api";
import { getDb } from "../../db/index.js";
import { conceptsTable } from "../../db/schema.js";
import { eq } from "drizzle-orm";

export const handleGetConcepts: RequestHandler = async (_req, res) => {
  const concepts = await getAllConcepts();
  const response: GetConceptsResponse = { concepts };
  res.json(response);
};

export const handleCreateConcept: RequestHandler = async (req, res) => {
  const { title, domain }: CreateConceptRequest = req.body;
  if (!title || !domain) {
    return res.status(400).json({ error: "Title and domain are required" });
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
  await db.insert(conceptsTable).values({ slug, title, domain });
  const response: CreateConceptResponse = { concept };
  res.json(response);
};
