import { Link, useParams } from "react-router-dom";
import TopNav from "@/components/TopNav";
import FlowDiagram from "@/components/FlowDiagram";
import { mockFlows } from "@/lib/mockData";

export default function FlowDetail() {
  const { id } = useParams<{ id: string }>();
  const flow = mockFlows.find((f) => f.id === id);

  return (
    <div className="flex flex-col h-screen bg-white">
      <TopNav />
      <div className="flex flex-1 overflow-hidden">
        {/* Flow sidebar */}
        <aside className="w-48 shrink-0 border-r border-slate-200 bg-slate-50 flex flex-col overflow-auto">
          <div className="px-4 py-6 flex-1">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-4 px-2">
              System Flows
            </p>
            <nav className="space-y-0.5">
              {mockFlows.map((f) => (
                <Link
                  key={f.id}
                  to={`/flows/${f.id}`}
                  className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors leading-snug ${
                    f.id === id
                      ? "bg-slate-900 text-white"
                      : "text-slate-600 hover:bg-slate-200 hover:text-slate-900"
                  }`}
                >
                  {f.title}
                </Link>
              ))}
            </nav>
          </div>
          <div className="px-4 py-4 border-t border-slate-200">
            <p className="text-xs text-slate-400">Visualize system thinking</p>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-auto">
          {!flow ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <p className="text-2xl font-bold text-slate-900 mb-2">
                  Flow not found
                </p>
                <Link to="/flows" className="text-blue-600 hover:underline text-sm">
                  ← Back to flows
                </Link>
              </div>
            </div>
          ) : (
            <div className="max-w-3xl mx-auto px-8 py-12">
              <div className="mb-10">
                <h1 className="text-3xl font-bold text-slate-900 mb-2">
                  {flow.title}
                </h1>
                <p className="text-slate-500">{flow.description}</p>
              </div>

              <FlowDiagram steps={flow.steps} />

              <div className="mt-12 bg-slate-50 border border-slate-200 rounded-xl p-6 text-sm">
                <h3 className="font-semibold text-slate-900 mb-3">
                  About This Flow
                </h3>
                <ul className="space-y-1.5 text-slate-500">
                  <li>
                    <span className="font-medium text-slate-700">Blue boxes</span>{" "}
                    are steps in the flow
                  </li>
                  <li>
                    <span className="font-medium text-slate-700">
                      Concept tags
                    </span>{" "}
                    link to detailed concept pages
                  </li>
                  <li>
                    <span className="font-medium text-slate-700">Branching</span>{" "}
                    shows decision points or parallel paths
                  </li>
                  <li>
                    <span className="font-medium text-slate-700">Arrows</span>{" "}
                    show the direction of flow
                  </li>
                </ul>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
