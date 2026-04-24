import { RequestHandler } from "express";
import { getAllRelations } from "../../lib/content.js";

export const handleGetRelations: RequestHandler = async (_req, res) => {
  const relations = await getAllRelations();
  res.json({ relations });
};
