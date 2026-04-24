import { useEffect, useState } from "react";
import ConceptCard from "@/components/ConceptCard";
import Layout from "@/components/Layout";
import { API_BASE } from "@/lib/config";

export default function Index() {
  const [concepts, setConcepts] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE}/api/concepts`)
      .then((res) => res.json())
      .then((data) => {
        setConcepts(data.concepts || []);
      });
  }, []);

  return (
    <Layout>
      <div className="max-w-2xl mx-auto px-8 py-12">
        <header className="page-header mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">
            Knowledge Base
          </h1>
        </header>

        <ul className="space-y-4">
          {concepts.map((concept: any) => (
            <li key={concept.slug}>
              <ConceptCard concept={concept} />
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  );
}