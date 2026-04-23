import { Link } from "react-router-dom";
import { ChevronDown, Home } from "lucide-react";
import { domainTree } from "@/lib/mockData";

interface SidebarProps {
  expandedDomains: Record<string, boolean>;
  onToggleDomain: (domain: string) => void;
}

export default function Sidebar({ expandedDomains, onToggleDomain }: SidebarProps) {
  return (
    <aside className="w-64 border-r border-slate-200 bg-slate-50 p-6 overflow-auto flex flex-col h-screen">
      {/* Logo */}
      <Link to="/" className="flex items-center gap-2 mb-8 hover:opacity-80 transition-opacity">
        <div className="w-8 h-8 rounded bg-slate-900 flex items-center justify-center">
          <span className="text-white font-bold text-sm">KO</span>
        </div>
        <span className="font-bold text-slate-900">Knowledge OS</span>
      </Link>

      {/* Home Link */}
      <Link
        to="/"
        className="flex items-center gap-3 text-slate-700 hover:text-slate-900 mb-8 transition-colors"
      >
        <Home size={18} />
        <span className="font-medium">Home</span>
      </Link>

      {/* Domain Tree */}
      <nav className="space-y-1 flex-1">
        <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-3 py-2 mb-2">
          Domains
        </h3>
        {domainTree.map((domain) => (
          <div key={domain.name}>
            <button
              onClick={() => onToggleDomain(domain.name)}
              className="w-full flex items-center justify-between px-3 py-2 text-slate-700 hover:bg-slate-200 rounded transition-colors"
            >
              <span className="font-medium text-sm">{domain.name}</span>
              <ChevronDown
                size={16}
                className={`transition-transform ${
                  expandedDomains[domain.name] ? "rotate-180" : ""
                }`}
              />
            </button>

            {expandedDomains[domain.name] && (
              <div className="ml-2 space-y-1">
                {domain.subcategories?.map((subcat) => (
                  <div key={subcat.name}>
                    <button
                      onClick={() => onToggleDomain(subcat.name)}
                      className="w-full flex items-center justify-between px-3 py-2 text-slate-600 text-sm hover:bg-slate-200 rounded transition-colors"
                    >
                      <span>{subcat.name}</span>
                      {subcat.concepts && subcat.concepts.length > 0 && (
                        <ChevronDown
                          size={14}
                          className={`transition-transform ${
                            expandedDomains[subcat.name] ? "rotate-180" : ""
                          }`}
                        />
                      )}
                    </button>

                    {expandedDomains[subcat.name] && subcat.concepts && (
                      <div className="ml-2 space-y-1">
                        {subcat.concepts.map((concept) => (
                          <Link
                            key={concept.slug}
                            to={`/concept/${concept.slug}`}
                            className="block px-3 py-2 text-slate-600 text-sm hover:bg-slate-200 hover:text-slate-900 rounded transition-colors"
                          >
                            {concept.title}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="text-xs text-slate-500 pt-4 border-t border-slate-200">
        <p>Public Knowledge Viewer</p>
      </div>
    </aside>
  );
}
