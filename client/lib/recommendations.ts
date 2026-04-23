import type { Concept } from "./mockData";

export interface ApiRelation {
  from: string;
  to: string;
  relation_type: string;
}

export function getRecommendations(
  current: Concept,
  all: Concept[],
  relations: ApiRelation[],
): Concept[] {
  const currentTopDomain = current.domain?.split(">")[0].trim() ?? "";
  const currentTags = new Set(current.tags ?? []);

  return all
    .filter(c => c.slug !== current.slug)
    .map(c => {
      let score = 0;

      const hasRelation = relations.some(
        r => (r.from === current.slug && r.to === c.slug) ||
             (r.from === c.slug && r.to === current.slug),
      );
      if (hasRelation) score += 4;

      const candidateTopDomain = c.domain?.split(">")[0].trim() ?? "";
      if (currentTopDomain && candidateTopDomain === currentTopDomain) score += 3;

      for (const tag of c.tags ?? []) {
        if (currentTags.has(tag)) score += 2;
      }

      return { concept: c, score };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map(({ concept }) => concept);
}
