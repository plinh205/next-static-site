import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import { getDb } from '../db/index.js';
import { conceptsTable, domainsTable, relationsTable } from '../db/schema.js';

const conceptsDir = path.join(process.cwd(), 'content', 'concepts');
const domainsDir = path.join(process.cwd(), 'content', 'domains');

export async function getAllConcepts(): Promise<Record<string, unknown>[]> {
  if (process.env.DATABASE_URL) {
    const db = getDb();
    return db.select().from(conceptsTable) as Promise<Record<string, unknown>[]>;
  }
  return fs.readdirSync(conceptsDir)
    .filter(f => f.endsWith('.yaml'))
    .map(f => yaml.load(fs.readFileSync(path.join(conceptsDir, f), 'utf8')) as Record<string, unknown>);
}

export async function getAllDomains(): Promise<Record<string, unknown>[]> {
  if (process.env.DATABASE_URL) {
    const db = getDb();
    return db.select().from(domainsTable) as Promise<Record<string, unknown>[]>;
  }
  return fs.readdirSync(domainsDir)
    .filter(f => f.endsWith('.yaml'))
    .map(f => yaml.load(fs.readFileSync(path.join(domainsDir, f), 'utf8')) as Record<string, unknown>);
}

export async function getAllRelations(): Promise<Record<string, unknown>[]> {
  if (process.env.DATABASE_URL) {
    const db = getDb();
    return db.select().from(relationsTable) as Promise<Record<string, unknown>[]>;
  }
  return [];
}
