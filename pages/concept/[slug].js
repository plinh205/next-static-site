import Link from "next/link";
import {
  getAllConcepts,
  getAllLogs,
  getAllRelations,
  getConceptBySlug
} from "../../lib/content";

export default function ConceptPage({
  concept,
  relatedRelations,
  relatedLogs
}) {
  const compareItems = Array.isArray(concept.compare) ? concept.compare : [];
  const coreMechanismItems = Array.isArray(concept.core_mechanism)
    ? concept.core_mechanism
    : [];
  const whenToUseItems = Array.isArray(concept.when_to_use)
    ? concept.when_to_use
    : [];

  return (
    <main className="page">
      <div className="container">
        <Link href="/" className="back-link">
          Back to home
        </Link>

        <h1 className="page-title">{concept.title || concept.slug || "Concept"}</h1>
        <p className="page-summary">
          {concept.summary || "No summary available."}
        </p>

        <section className="section">
          <h2 className="section-title">Mental model</h2>
          <p className="text-block">
            {concept.mental_model || "No mental model available."}
          </p>
        </section>

        <section className="section">
          <h2 className="section-title">Core mechanism</h2>
          {coreMechanismItems.length === 0 ? (
            <p className="text-block muted">No core mechanism details available.</p>
          ) : (
            <ul className="content-list">
              {coreMechanismItems.map((item, index) => (
                <li key={`${item}-${index}`} className="list-item">
                  {item}
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="section">
          <h2 className="section-title">When to use</h2>
          {whenToUseItems.length === 0 ? (
            <p className="text-block muted">No usage notes available.</p>
          ) : (
            <ul className="content-list">
              {whenToUseItems.map((item, index) => (
                <li key={`${item}-${index}`} className="list-item">
                  {item}
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="section">
          <h2 className="section-title">Compare</h2>
          {compareItems.length === 0 ? (
            <p className="text-block muted">No comparison notes available.</p>
          ) : (
            <ul className="content-list">
              {compareItems.map((item, index) => (
                <li key={`${item.target || "compare"}-${index}`} className="compare-item">
                  <strong>{item.target || "Unknown target"}</strong>
                  <p className="compare-text">
                    {item.difference || "No difference provided."}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="section">
          <h2 className="section-title">Related concepts</h2>
          {relatedRelations.length === 0 ? (
            <p className="text-block muted">No related concepts found.</p>
          ) : (
            <ul className="content-list">
              {relatedRelations.map((relation, index) => (
                <li key={`${relation.targetConcept || "related"}-${index}`} className="list-item">
                  <span>
                    {relation.relationType || "related-to"}:
                  </span>{" "}
                  {relation.targetConcept ? (
                    <Link href={`/concept/${relation.targetConcept}`}>
                      {relation.targetConcept}
                    </Link>
                  ) : (
                    <span>Unknown concept</span>
                  )}
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="section">
          <h2 className="section-title">Learning logs</h2>
          {relatedLogs.length === 0 ? (
            <p className="text-block muted">No learning logs found.</p>
          ) : (
            <ul className="content-list">
              {relatedLogs.map((log, index) => (
                <li key={`${log.topic || "log"}-${index}`} className="log-item">
                  <p className="text-block">
                    <strong>{log.topic || "Untitled log"}</strong>
                  </p>
                  <p className="log-text">
                    {log.trigger || "No trigger provided."}
                  </p>
                  <p className="log-text">
                    {log.updated_model || "No updated model provided."}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
}

export function getStaticPaths() {
  const concepts = getAllConcepts();

  return {
    paths: concepts.map((concept) => ({
      params: {
        slug: concept.slug
      }
    })),
    fallback: false
  };
}

export function getStaticProps({ params }) {
  const concept = getConceptBySlug(params.slug);
  const relatedRelations = getAllRelations()
    .filter(
      (relation) =>
        relation.from === params.slug || relation.to === params.slug
    )
    .map((relation) => ({
      relationType: relation.relation_type,
      targetConcept:
        relation.from === params.slug ? relation.to : relation.from
    }));
  const relatedLogs = getAllLogs().filter((log) => {
    if (!Array.isArray(log.related_concepts)) {
      return false;
    }

    return log.related_concepts.includes(params.slug);
  });

  if (!concept) {
    return {
      notFound: true
    };
  }

  return {
    props: {
      concept,
      relatedRelations,
      relatedLogs
    }
  };
}
