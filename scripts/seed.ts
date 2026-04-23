import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import { getDb } from '../db/index.js';
import { conceptsTable } from '../db/schema.js';

const conceptsDir = path.join(process.cwd(), 'content', 'concepts');

const files = fs.readdirSync(conceptsDir).filter(f => f.endsWith('.yaml'));

const db = getDb();

for (const file of files) {
  const raw = yaml.load(fs.readFileSync(path.join(conceptsDir, file), 'utf8')) as Record<string, unknown>;
  await db.insert(conceptsTable).values({
    slug: raw.slug as string,
    title: raw.title as string ?? null,
    domain: raw.domain as string ?? null,
    summary: raw.summary as string ?? null,
    definition: raw.definition as string ?? null,
    mental_model: raw.mental_model as string ?? null,
    difficulty: raw.difficulty as string ?? null,
    importance: raw.importance as string ?? null,
    status: raw.status as string ?? null,
  }).onConflictDoNothing();
  console.log(`seeded: ${raw.slug}`);
}

console.log('seed complete');
