import { RequestHandler } from "express";
import { getAllDomains } from "../../lib/content.js";
import { GetDomainsResponse, CreateDomainResponse, CreateDomainRequest } from "@shared/api";
import { getDb } from "../../db/index.js";
import { domainsTable } from "../../db/schema.js";
import { eq } from "drizzle-orm";

export const handleGetDomains: RequestHandler = async (req, res) => {
  const domains = await getAllDomains();
  const response: GetDomainsResponse = { domains };
  res.json(response);
};

export const handleCreateDomain: RequestHandler = async (req, res) => {
  const { title, parent }: CreateDomainRequest = req.body;
  if (!title) {
    return res.status(400).json({ error: "Title is required" });
  }
  const slug = title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  const db = getDb();
  const existing = await db.select().from(domainsTable).where(eq(domainsTable.slug, slug));
  if (existing.length > 0) {
    return res.status(400).json({ error: "Domain already exists" });
  }
  await db.insert(domainsTable).values({ slug, title, parent });
  const domain = { slug, title, parent };
  const response: CreateDomainResponse = { domain };
  res.json(response);
};