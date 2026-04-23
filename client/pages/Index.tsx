import ConceptCard from "@/components/ConceptCard";
import Layout from "@/components/Layout";
import { getAllConcepts } from "@/lib/knowledge";

export default function Index() {
  const concepts = getAllConcepts();

  return (
    <Layout>
      <div className="max-w-2xl mx-auto px-8 py-12">
        <header className="page-header mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">
            Knowledge Base
          </h1>
          <p className="text-slate-600">
            Browse concepts and explore the knowledge graph
          </p>
        </header>

        <section aria-label="Concepts">
          <ul className="space-y-4">
            {concepts.map((concept: any) => (
              <li key={concept.slug}>
                <ConceptCard concept={concept} />
              </li>
            ))}
          </ul>
        </section>
      </div>
    </Layout>
  );
}
