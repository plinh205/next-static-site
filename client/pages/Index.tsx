import ConceptCard from "@/components/ConceptCard";
import Layout from "@/components/Layout";
import { getAllConcepts } from "@/lib/knowledge";

export default function Index() {
  const concepts = getAllConcepts();

  return (
    <Layout>
      <header className="page-header">
        <h1 className="page-title">Knowledge Base</h1>
        <p className="page-subtitle">
          Browse concepts and explore the knowledge graph
        </p>
      </header>

      <section aria-label="Concepts">
        <ul className="card-list">
          {concepts.map((concept) => (
            <li key={concept.slug} className="card-list__item">
              <ConceptCard concept={concept} />
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}
