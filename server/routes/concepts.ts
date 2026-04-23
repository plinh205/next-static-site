import { RequestHandler } from "express";
import { getAllConcepts } from "../../lib/content.js";
import { GetConceptsResponse, CreateConceptResponse, CreateConceptRequest } from "@shared/api";
import fs from "fs";
import path from "path";
import yaml from "js-yaml";

const conceptsDirectory = path.join(process.cwd(), "content", "concepts");

export const handleGetConcepts: RequestHandler = (req, res) => {
  const concepts = getAllConcepts();
  const response: GetConceptsResponse = { concepts };
  res.json(response);
};

export const handleCreateConcept: RequestHandler = (req, res) => {
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
  const filePath = path.join(conceptsDirectory, `${slug}.yaml`);
  if (fs.existsSync(filePath)) {
    return res.status(400).json({ error: "Concept already exists" });
  }
  const yamlContent = yaml.dump(concept);
  fs.writeFileSync(filePath, yamlContent);
  const response: CreateConceptResponse = { concept };
  res.json(response);
};