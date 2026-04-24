import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import { handleGetConcepts, handleCreateConcept, handleGetConceptBySlug } from "./routes/concepts";
import { handleGetDomains, handleCreateDomain } from "./routes/domains";
import { handleGetRelations } from "./routes/relations";
import { handleLogin } from "./routes/auth";
import { requireAuth } from "./middleware/auth";
import { getDb } from "../db/index";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);

  app.post("/api/auth/login", handleLogin);

  app.get("/api/db/ping", async (_req, res) => {
    try {
      const db = getDb();
      await db.execute("SELECT 1");
      res.json({ ok: true });
    } catch (err) {
      res.json({ ok: false, error: String(err) });
    }
  });

  app.get("/api/relations", handleGetRelations);

  app.get("/api/concepts", handleGetConcepts);
  app.get("/api/concepts/:slug", handleGetConceptBySlug);
  app.post("/api/concepts", requireAuth, handleCreateConcept);
  app.get("/api/domains", handleGetDomains);
  app.post("/api/domains", requireAuth, handleCreateDomain);

  return app;
}
