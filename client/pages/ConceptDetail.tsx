import ConceptDetailView from "@/components/ConceptDetail";
import Layout from "@/components/Layout";
import { getConceptBySlug } from "@/lib/knowledge";
import { Link, useParams } from "react-router-dom";

export default function ConceptDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const concept = getConceptBySlug(slug);

  if (!concept) {
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
