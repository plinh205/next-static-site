import ConceptDetailView from "@/components/ConceptDetail";
import Layout from "@/components/Layout";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { API_BASE } from "@/lib/config";

export default function ConceptDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["concept", slug],
    queryFn: () => fetch(`${API_BASE}/api/concepts/${slug}`).then(r => r.ok ? r.json() : Promise.reject(r.status)),
    enabled: !!slug,
  });

  const concept = data?.concept;

  if (isLoading) {
    return <Layout><div className="flex items-center justify-center min-h-screen text-slate-500">Loading…</div></Layout>;
  }

  if (isError || !concept) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-slate-900 mb-2">Concept not found</h1>
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
      <ConceptDetailView concept={concept} />
    </Layout>
  );
}
