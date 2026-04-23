import { Link, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Layout from "@/components/Layout";
import { fetchConcepts } from "@/lib/knowledge";

export default function Homepage() {
  const { data, isLoading, isError } = useQuery({ queryKey: ['concepts'], queryFn: fetchConcepts });
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTag = searchParams.get('tag') ?? '';

  const allTags = [...new Set((data ?? []).flatMap(c => (c as any).tags ?? []))] as string[];
  const visible = activeTag ? (data ?? []).filter(c => ((c as any).tags ?? []).includes(activeTag)) : (data ?? []);

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

        {allTags.length > 0 && (
          <div className="flex gap-2 overflow-x-auto pb-2 mb-6">
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => setSearchParams(activeTag === tag ? {} : { tag })}
                className={`flex-shrink-0 px-3 py-1 rounded text-sm font-medium transition-colors ${activeTag === tag ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
              >
                {tag}
              </button>
            ))}
          </div>
        )}

        <div className="grid gap-4">
          {isLoading && <p className="text-slate-500">Loading concepts...</p>}
          {isError && <p className="text-red-500">Failed to load concepts.</p>}
          {visible.map((concept) => (
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
