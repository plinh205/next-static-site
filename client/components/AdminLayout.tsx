import type { ReactNode } from "react";
import TopNav from "./TopNav";

export type AdminTab = "concept" | "relation" | "log" | "flow";

const NAV_ITEMS: { id: AdminTab; label: string }[] = [
  { id: "concept", label: "Concepts" },
  { id: "relation", label: "Relations" },
  { id: "log", label: "Learning Logs" },
  { id: "flow", label: "Flows" },
];

interface AdminLayoutProps {
  children: ReactNode;
  activeTab: AdminTab;
  onTabChange: (tab: AdminTab) => void;
}

export default function AdminLayout({ children, activeTab, onTabChange }: AdminLayoutProps) {
  return (
    <div className="flex flex-col h-screen bg-white">
      <TopNav />
      <div className="flex flex-1 overflow-hidden">
        <aside className="w-44 shrink-0 border-r border-slate-200 bg-slate-50 flex flex-col">
          <div className="px-4 py-6 flex-1">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-4 px-2">
              Admin
            </p>
            <nav className="space-y-0.5">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onTabChange(item.id)}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === item.id
                      ? "bg-slate-900 text-white"
                      : "text-slate-600 hover:bg-slate-200 hover:text-slate-900"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
          <div className="px-4 py-4 border-t border-slate-200">
            <p className="text-xs text-slate-400">Knowledge Graph Admin</p>
          </div>
        </aside>

        <main className="flex-1 overflow-auto bg-white">
          {children}
        </main>
      </div>
    </div>
  );
}
