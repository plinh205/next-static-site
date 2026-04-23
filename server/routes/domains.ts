import { RequestHandler } from "express";
import { getAllDomains } from "../../lib/content.js";
import { GetDomainsResponse, CreateDomainResponse, CreateDomainRequest } from "@shared/api";
import fs from "fs";
import path from "path";
import yaml from "js-yaml";

const domainsDirectory = path.join(process.cwd(), "content", "domains");

export const handleGetDomains: RequestHandler = (req, res) => {
  const domains = getAllDomains();
  const response: GetDomainsResponse = { domains };
  res.json(response);
};

export const handleCreateDomain: RequestHandler = (req, res) => {
  const { title, parent }: CreateDomainRequest = req.body;
  if (!title) {
    return res.status(400).json({ error: "Title is required" });
  }
  const slug = title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  const domain = {
    type: 'domain',
    slug,
    title,
    parent,
  };
  const filePath = path.join(domainsDirectory, `${slug}.yaml`);
  if (fs.existsSync(filePath)) {
    return res.status(400).json({ error: "Domain already exists" });
  }
  const yamlContent = yaml.dump(domain);
  fs.writeFileSync(filePath, yamlContent);
  const response: CreateDomainResponse = { domain };
  res.json(response);
};