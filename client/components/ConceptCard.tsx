import { Link } from "react-router-dom";
import { getConceptDisplayData } from "@/lib/knowledge";
import type { Concept } from "@/lib/mockData";

interface ConceptCardProps {
  concept: Concept;
}

export default function ConceptCard({ concept }: ConceptCardProps) {
  const content = getConceptDisplayData(concept);

  return (
    <Link to={`/concept/${concept.slug}`} className="concept-card">
      <article className="concept-card__body">
        <h2 className="concept-card__title">{content.title}</h2>
        <p className="concept-card__summary">{content.summary}</p>
        <p className="concept-card__tag">{concept.domain || "General"}</p>
        {concept.tags && concept.tags.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1">
            {concept.tags.map(tag => (
              <span key={tag} className="inline-block px-2 py-0.5 bg-blue-50 text-blue-700 rounded text-xs">
                {tag}
              </span>
            ))}
          </div>
        )}
      </article>
    </Link>
  );
}
