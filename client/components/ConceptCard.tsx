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
      </article>
    </Link>
  );
}
