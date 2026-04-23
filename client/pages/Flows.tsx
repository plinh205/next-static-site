import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { mockFlows } from "@/lib/mockData";

export default function Flows() {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-8 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">
            Learning Flows
          </h1>
          <p className="text-slate-600">
            Explore interconnected concept flows and build mental models
          </p>
        </div>

        {/* Flows Grid */}
        <div className="grid gap-6">
          {mockFlows.map((flow) => (
            <Link
              key={flow.id}
              to={`/flows/${flow.id}`}
              className="block"
            >
              <div className="border border-slate-200 rounded-lg p-6 hover:border-slate-400 hover:shadow-md transition-all bg-slate-50 hover:bg-white">
                <h2 className="text-xl font-semibold text-slate-900 mb-2">
                  {flow.title}
                </h2>
                <p className="text-slate-600 mb-4">{flow.description}</p>
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <span className="inline-block px-2 py-1 bg-slate-100 rounded text-xs">
                    {flow.steps.length} steps
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