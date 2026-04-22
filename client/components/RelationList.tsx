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

      if (!result[relationType]) {
        result[relationType] = [];
      }

      result[relationType].push({
        relationType,
        target: relation.target,
        targetLabel:
          relation.targetLabel || getConceptTitleBySlug(relation.target),
      });

      return result;
    },
    {},
  );

  const orderedTypes = [
    ...RELATION_GROUP_ORDER.filter((type) => groups[type]),
    ...Object.keys(groups)
      .filter((type) => !RELATION_GROUP_ORDER.includes(type))
      .sort((firstType, secondType) => firstType.localeCompare(secondType)),
  ];

  return orderedTypes.map((type) => ({
    type,
    items: groups[type],
  }));
}

export default function RelationList({ relations }: RelationListProps) {
  if (!relations?.length) {
    return null;
  }

  const relationGroups = groupRelations(relations);

  return (
    <section className="section-block">
      <h2 className="section-label">Related Concepts</h2>

      <div className="relation-groups">
        {relationGroups.map((group) => (
          <section key={group.type} className="relation-group">
            <h3 className="relation-group__title">{group.type}</h3>

            <ul className="relation-list">
              {group.items.map((relation) => (
                <li
                  key={`${relation.relationType}-${relation.target}`}
                  className="relation-list__item"
                >
                  <Link
                    to={`/concept/${relation.target}`}
                    className="relation-link"
                  >
                    <div className="relation-link__content">
                      <span className="relation-link__label">
                        {relation.relationType}
                      </span>
                      <span className="relation-link__title">
                        {relation.targetLabel}
                      </span>
                    </div>
                    <span className="relation-link__arrow">→</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </section>
  );
}
