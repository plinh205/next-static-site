import { RequestHandler } from "express";
import fs from "fs";
import path from "path";
import yaml from "js-yaml";

const relationsDir = path.join(process.cwd(), "content", "relations");

export const handleGetRelations: RequestHandler = (_req, res) => {
  if (!fs.existsSync(relationsDir)) {
    res.json({ relations: [] });
    return;
  }
  const relations = fs.readdirSync(relationsDir)
    .filter(f => f.endsWith(".yaml"))
    .map(f => yaml.load(fs.readFileSync(path.join(relationsDir, f), "utf8")) as Record<string, unknown>);
  res.json({ relations });
};
