import { pgTable, varchar, text, timestamp } from "drizzle-orm/pg-core";

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
