import { Link } from "react-router-dom";
import { getConceptTitleBySlug } from "@/lib/knowledge";
import type { Concept } from "@/lib/mockData";

type Relation = NonNullable<Concept["relations"]>[number];
type GroupedRelation = {
  relationType: string;
  target: string;
  targetLabel: string;
};

interface RelationListProps {
  relations?: Relation[];
}

const RELATION_GROUP_ORDER = ["used-with", "alternative-to", "depends-on"];

function getRelationType(relation: Relation) {
  return relation.relation_type || relation.type || "related-to";
}

function groupRelations(relations: Relation[]) {
  const groups = relations.reduce<Record<string, GroupedRelation[]>>(
    (result, relation) => {
      const relationType = getRelationType(relation);
      if (!result[relationType]) result[relationType] = [];
      result[relationType].push({
        relationType,
        target: relation.target,
        targetLabel: relation.targetLabel || getConceptTitleBySlug(relation.target),
      });
      return result;
    },
    {},
  );

  const orderedTypes = [
    ...RELATION_GROUP_ORDER.filter((type) => groups[type]),
    ...Object.keys(groups)
      .filter((type) => !RELATION_GROUP_ORDER.includes(type))
      .sort((a, b) => a.localeCompare(b)),
  ];

  return orderedTypes.map((type) => ({ type, items: groups[type] }));
}

export default function RelationList({ relations }: RelationListProps) {
  if (!relations?.length) return null;

  const relationGroups = groupRelations(relations);

  return (
    <section>
      <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">Related Concepts</h2>
      <div className="flex flex-col gap-5">
        {relationGroups.map((group) => (
          <div key={group.type} className="flex flex-col gap-2">
            <h3 className="text-sm font-bold text-slate-900">{group.type}</h3>
            <ul className="flex flex-col gap-3">
              {group.items.map((relation) => (
                <li key={`${relation.relationType}-${relation.target}`}>
                  <Link
                    to={`/concept/${relation.target}`}
                    className="flex items-center justify-between gap-4 border border-slate-200 rounded-xl px-4 py-3 hover:border-slate-400 hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex flex-col gap-1.5">
                      <span className="inline-block w-fit rounded-full bg-slate-100 px-2 py-1 text-xs font-bold uppercase tracking-wide text-slate-500">
                        {relation.relationType}
                      </span>
                      <span className="font-semibold text-slate-900">{relation.targetLabel}</span>
                    </div>
                    <span className="text-slate-400">→</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
