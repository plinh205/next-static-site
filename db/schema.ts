import { pgTable, varchar, text, timestamp, serial } from "drizzle-orm/pg-core";

export const conceptsTable = pgTable("concepts", {
  slug: varchar("slug").primaryKey(),
  title: varchar("title"),
  domain: varchar("domain"),
  summary: text("summary"),
  definition: text("definition"),
  mental_model: text("mental_model"),
  difficulty: varchar("difficulty"),
  importance: varchar("importance"),
  status: varchar("status"),
  tags: text("tags").default(""),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at"),
});

export const domainsTable = pgTable("domains", {
  slug: varchar("slug").primaryKey(),
  title: varchar("title"),
  parent: varchar("parent"),
  description: text("description"),
  created_at: timestamp("created_at").defaultNow(),
});

export const relationsTable = pgTable("relations", {
  id: serial("id").primaryKey(),
  from_slug: varchar("from_slug"),
  to_slug: varchar("to_slug"),
  relation_type: varchar("relation_type"),
});
