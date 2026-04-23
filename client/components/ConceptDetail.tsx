import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getConceptDisplayData } from "@/lib/knowledge";
import type { Concept } from "@/lib/mockData";
import { getRecommendations, type ApiRelation } from "@/lib/recommendations";
import LearningTimeline from "./LearningTimeline";
import RelationList from "./RelationList";

interface ConceptDetailProps {
  concept: Concept;
}

export default function ConceptDetail({ concept }: ConceptDetailProps) {
  const content = getConceptDisplayData(concept);

  const { data: allConcepts = [] } = useQuery<Concept[]>({
    queryKey: ["concepts"],
    queryFn: () => fetch("/api/concepts").then(r => r.json()).then(d => d.concepts ?? []),
  });
  const { data: relations = [] } = useQuery<ApiRelation[]>({
    queryKey: ["relations"],
    queryFn: () => fetch("/api/relations").then(r => r.json()).then(d => d.relations ?? []),
  });
  const recommendations = getRecommendations(concept, allConcepts, relations);
  const coreMechanismItems =
    content.coreMechanism.length > 0
      ? content.coreMechanism
      : ["No core mechanism has been added yet."];
  const whenToUseItems =
    content.whenToUse.length > 0
      ? content.whenToUse
      : ["No usage guidance has been added yet."];
  const compareRows =
    content.compare.length > 0
      ? content.compare
      : [
          {
            target: "No comparison available",
            difference: "Add compare data to explain how this concept differs from related concepts.",
          },
        ];

  return (
    <div className="max-w-4xl mx-auto px-8 py-10">
      <header className="mb-10">
        <Link
          to="/"
          className="inline-flex items-center gap-1 text-slate-500 hover:text-slate-900 mb-4 text-sm transition-colors"
        >
          <ChevronLeft size={16} />
          Back to Home
        </Link>

        {concept.breadcrumb?.length ? (
          <nav className="flex flex-wrap items-center gap-2 text-slate-500 text-sm mb-4">
            <Link to="/" className="hover:text-slate-900 transition-colors">
              Knowledge Base
            </Link>
            {concept.breadcrumb.map((item) => (
              <div key={item} className="flex items-center gap-2">
                <span className="text-slate-300">/</span>
                <span>{item}</span>
              </div>
            ))}
          </nav>
        ) : null}

        <h1 className="text-4xl font-bold text-slate-900 leading-tight">{content.title}</h1>
        {concept.tags && concept.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {concept.tags.map(tag => (
              <Link key={tag} to={`/?tag=${tag}`} className="inline-block px-2 py-0.5 bg-blue-50 text-blue-700 rounded text-xs hover:bg-blue-100 transition-colors">
                {tag}
              </Link>
            ))}
          </div>
        )}
      </header>

      <div className="flex flex-col gap-10">
        <section>
          <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Summary</h2>
          <p className="text-slate-700 text-lg leading-relaxed">{content.summary}</p>
        </section>

        <section>
          <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Mental Model</h2>
          <div className="border-l-4 border-blue-500 bg-blue-50 px-6 py-4 rounded-r-lg">
            <p className="text-slate-800 font-semibold">{content.mentalModel}</p>
          </div>
        </section>

        <section>
          <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Core Mechanism</h2>
          <ul className="flex flex-col gap-3">
            {coreMechanismItems.map((item) => (
              <li key={item} className="flex gap-3 items-start">
                <span className="text-slate-400 leading-7">•</span>
                <span className="text-slate-700 leading-7">{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="border-2 border-amber-200 bg-amber-50 p-6 rounded-lg">
          <h2 className="text-sm font-semibold text-amber-900 uppercase tracking-wider mb-4">When to Use</h2>
          <ul className="space-y-2">
            {whenToUseItems.map((item, idx) => (
              <li key={idx} className="flex gap-3">
                <span className="text-amber-600 flex-shrink-0">✓</span>
                <span className="text-slate-800 font-medium">{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="border-2 border-purple-200 bg-purple-50 p-6 rounded-lg">
          <h2 className="text-sm font-semibold text-purple-900 uppercase tracking-wider mb-4">Compare</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-purple-200">
                  <th className="text-left py-2 px-3 text-purple-900 font-semibold">Target Concept</th>
                  <th className="text-left py-2 px-3 text-purple-900 font-semibold">Difference</th>
                </tr>
              </thead>
              <tbody>
                {compareRows.map((row, idx) => (
                  <tr key={idx} className="border-b border-purple-100">
                    <td className="py-3 px-3 text-slate-900 font-medium">{row.target}</td>
                    <td className="py-3 px-3 text-slate-700">{row.difference}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <RelationList relations={concept.relations} />

        {concept.learningLogs?.length ? (
          <LearningTimeline logs={concept.learningLogs} fallbackTopic={content.title} />
        ) : null}

        {recommendations.length > 0 && (
          <section>
            <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">Explore Next</h2>
            <div className="flex flex-col gap-3">
              {recommendations.map(r => (
                <Link
                  key={r.slug}
                  to={`/concept/${r.slug}`}
                  className="border border-slate-200 rounded-xl px-4 py-3 hover:border-slate-400 hover:bg-slate-50 transition-colors"
                >
                  <div className="font-medium text-slate-900">{r.title}</div>
                  {r.domain && (
                    <span className="inline-block text-xs text-slate-500 bg-slate-100 rounded px-1.5 py-0.5 mt-1">
                      {r.domain}
                    </span>
                  )}
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
