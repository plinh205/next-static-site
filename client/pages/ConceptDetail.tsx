import ConceptDetailView from "@/components/ConceptDetail";
import Layout from "@/components/Layout";
import { getConceptBySlug } from "@/lib/knowledge";
import { Link, useParams } from "react-router-dom";

export default function ConceptDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const concept = getConceptBySlug(slug);

  if (!concept) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <div className="text-center">
          <h1 className="mb-2 text-2xl font-bold text-slate-900">
            Concept not found
          </h1>
          <Link to="/" className="text-blue-600 hover:underline">
            Back to home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <Layout>
      <ConceptDetailView concept={concept} />
    </Layout>
  );
}
