import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { mockConcepts } from "@/lib/mockData";

export default function Homepage() {
  return (
    <Layout>
      <div className="max-w-2xl mx-auto px-8 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">
            Knowledge Base
          </h1>
          <p className="text-slate-600">
            Browse concepts and explore the knowledge graph
          </p>
        </div>

        {/* Concept Cards Grid */}
        <div className="grid gap-4">
          {mockConcepts.map((concept) => (
            <Link
              key={concept.slug}
              to={`/concept/${concept.slug}`}
              className="block"
            >
              <div className="border border-slate-200 rounded-lg p-6 hover:border-slate-400 hover:shadow-md transition-all bg-slate-50 hover:bg-white">
                <h2 className="text-xl font-semibold text-slate-900 mb-2">
                  {concept.title}
                </h2>
                <p className="text-slate-600 mb-4">{concept.summary}</p>
                <div className="flex items-center text-sm text-slate-500">
                  <span className="inline-block px-2 py-1 bg-slate-100 rounded text-xs">
                    {concept.domain}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
}
