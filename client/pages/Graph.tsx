import { useQuery } from "@tanstack/react-query";
import Layout from "@/components/Layout";
import ConceptGraph, { PALETTE } from "@/components/ConceptGraph";
import type { Concept } from "@/lib/mockData";

interface ApiRelation {
  from: string;
  to: string;
  relation_type: string;
}

export default function Graph() {
  const { data: concepts = [], isLoading: loadingConcepts } = useQuery<Concept[]>({
    queryKey: ["concepts"],
    queryFn: () => fetch("/api/concepts").then(r => r.json()).then(d => d.concepts ?? []),
  });
  const { data: relations = [], isLoading: loadingRelations } = useQuery<ApiRelation[]>({
    queryKey: ["relations"],
    queryFn: () => fetch("/api/relations").then(r => r.json()).then(d => d.relations ?? []),
  });

  const domains = [...new Set(concepts.map(c => c.domain?.split(">")[0].trim() ?? "General"))];
  const domainColorMap: Record<string, string> = Object.fromEntries(
    domains.map((d, i) => [d, PALETTE[i % PALETTE.length]])
  );

  const isLoading = loadingConcepts || loadingRelations;

  return (
    <Layout>
      <div className="max-w-5xl mx-auto px-8 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Knowledge Graph</h1>
          <p className="text-slate-600">Explore how concepts connect across domains</p>
        </div>

        <div className="w-full bg-slate-50 rounded-xl border border-slate-200 p-4">
          {isLoading ? (
            <div className="flex items-center justify-center h-[560px]">
              <p className="text-slate-400 text-sm">Loading graph…</p>
            </div>
          ) : (
            <ConceptGraph concepts={concepts} relations={relations} domainColorMap={domainColorMap} />
          )}
        </div>

        {domains.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {domains.map(domain => (
              <span
                key={domain}
                className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs text-slate-700 bg-slate-100"
              >
                <span
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ backgroundColor: domainColorMap[domain] }}
                />
                {domain}
              </span>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
