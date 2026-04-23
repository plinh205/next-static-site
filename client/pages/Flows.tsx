import { useState } from "react";
import Layout from "@/components/Layout";
import FlowDiagram from "@/components/FlowDiagram";
import { mockFlows } from "@/lib/mockData";

export default function Flows() {
  const [selectedFlowId, setSelectedFlowId] = useState(mockFlows[0].id);
  const selectedFlow = mockFlows.find(f => f.id === selectedFlowId);

  return (
    <Layout showSidebar={false}>
      <div className="flex h-full">
        {/* Left aside */}
        <aside className="w-64 border-r border-slate-200 bg-slate-50 p-6 overflow-auto flex flex-col">
          <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">
            System Flows
          </h2>
          <nav className="space-y-2 flex-1">
            {mockFlows.map(flow => (
              <button
                key={flow.id}
                onClick={() => setSelectedFlowId(flow.id)}
                className={`w-full text-left px-4 py-3 rounded font-medium transition-colors text-sm ${
                  selectedFlowId === flow.id
                    ? 'bg-slate-900 text-white'
                    : 'text-slate-700 hover:bg-slate-200'
                }`}
              >
                {flow.title}
              </button>
            ))}
          </nav>
          <div className="text-xs text-slate-500 pt-4 border-t border-slate-200">
            <p>Visualize system thinking</p>
          </div>
        </aside>

        {/* Right panel */}
        <div className="flex-1 overflow-auto bg-white">
          {selectedFlow && (
            <div className="max-w-5xl mx-auto px-8 py-12">
              <div className="mb-12">
                <h1 className="text-4xl font-bold text-slate-900 mb-2">{selectedFlow.title}</h1>
                <p className="text-lg text-slate-600">{selectedFlow.description}</p>
              </div>
              <div className="bg-slate-50 rounded-lg border border-slate-200 p-8">
                <FlowDiagram steps={selectedFlow.steps} />
              </div>
              <div className="mt-12 bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="font-semibold text-blue-900 mb-3">About This Flow</h3>
                <ul className="space-y-2 text-sm text-blue-900">
                  <li><strong>Blue boxes</strong> are steps in the flow</li>
                  <li><strong>Concept tags</strong> link to detailed concept pages</li>
                  <li><strong>Branching</strong> shows decision points or parallel paths</li>
                  <li><strong>Arrows</strong> show the direction of flow</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
