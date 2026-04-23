import { useParams, Link, useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { mockConcepts } from "@/lib/mockData";
import { ChevronLeft } from "lucide-react";

export default function ConceptDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const concept = mockConcepts.find((c) => c.slug === slug);

  if (!concept) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-slate-900 mb-2">
              Concept not found
            </h1>
            <Link to="/" className="text-blue-600 hover:underline">
              Back to home
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Main Content */}
      <div className="max-w-3xl mx-auto px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-4 transition-colors"
          >
            <ChevronLeft size={18} />
            Back
          </button>

          <nav className="flex items-center gap-2 text-sm text-slate-600 mb-4">
            <Link to="/" className="hover:text-slate-900">
              Knowledge Base
            </Link>
            {concept.breadcrumb?.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <span>/</span>
                <span>{item}</span>
              </div>
            ))}
          </nav>

          <h1 className="text-4xl font-bold text-slate-900 mb-2">
            {concept.title}
          </h1>
        </div>

        {/* Sections */}
        <div className="space-y-12">
          {/* Summary */}
          <section>
            <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">
              Summary
            </h2>
            <p className="text-lg text-slate-700 leading-relaxed">
              {concept.definition}
            </p>
          </section>

          {/* Mental Model */}
          <section>
            <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">
              Mental Model
            </h2>
            <div className="border-l-4 border-blue-500 bg-blue-50 p-4 rounded-r">
              <p className="text-slate-900 font-medium">
                {concept.mentalModel}
              </p>
            </div>
          </section>

          {/* Core Mechanism */}
          <section>
            <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">
              Core Mechanism
            </h2>
            <ul className="space-y-2">
              {concept.mechanism?.map((item, idx) => (
                <li key={idx} className="flex gap-3">
                  <span className="text-slate-400 flex-shrink-0">•</span>
                  <span className="text-slate-700">{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* When to Use - PROMINENT */}
          <section className="border-2 border-amber-200 bg-amber-50 p-6 rounded-lg">
            <h2 className="text-sm font-semibold text-amber-900 uppercase tracking-wider mb-4">
              When to Use
            </h2>
            <ul className="space-y-2">
              {concept.whenToUse?.map((item, idx) => (
                <li key={idx} className="flex gap-3">
                  <span className="text-amber-600 flex-shrink-0">✓</span>
                  <span className="text-slate-800 font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Compare - PROMINENT */}
          <section className="border-2 border-purple-200 bg-purple-50 p-6 rounded-lg">
            <h2 className="text-sm font-semibold text-purple-900 uppercase tracking-wider mb-4">
              Compare
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-purple-200">
                    <th className="text-left py-2 px-3 text-purple-900 font-semibold">
                      Target Concept
                    </th>
                    <th className="text-left py-2 px-3 text-purple-900 font-semibold">
                      Difference
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {concept.compare?.map((row, idx) => (
                    <tr key={idx} className="border-b border-purple-100">
                      <td className="py-3 px-3 text-slate-900 font-medium">
                        {row.concept}
                      </td>
                      <td className="py-3 px-3 text-slate-700">
                        {row.difference}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Relations */}
          {concept.relations && concept.relations.length > 0 && (
            <section>
              <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">
                Relations
              </h2>
              <div className="space-y-3">
                {concept.relations.map((rel, idx) => (
                  <Link
                    key={idx}
                    to={`/concept/${rel.target}`}
                    className="flex items-center justify-between p-3 border border-slate-200 rounded hover:border-slate-400 hover:bg-slate-50 transition-all"
                  >
                    <div>
                      <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-1">
                        {rel.type}
                      </p>
                      <p className="text-slate-900 font-medium">
                        {rel.targetLabel}
                      </p>
                    </div>
                    <span className="text-slate-400">→</span>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Learning Logs */}
          {concept.learningLogs && concept.learningLogs.length > 0 && (
            <section>
              <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">
                Learning Logs
              </h2>
              <div className="space-y-6">
                {concept.learningLogs.map((log, idx) => (
                  <div key={idx} className="border-l-2 border-slate-300 pl-4">
                    <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-2">
                      {log.date}
                    </p>
                    <p className="text-sm font-semibold text-slate-900 mb-2">
                      Trigger: {log.trigger}
                    </p>
                    <p className="text-slate-700">{log.updatedModel}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </Layout>
  );
}
