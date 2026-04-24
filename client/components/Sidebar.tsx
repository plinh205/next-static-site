import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { getDomainTree, type DomainTreeGroup, type DomainTreeItem } from "@/lib/knowledge";
import { useQuery } from "@tanstack/react-query";

interface SidebarProps {
  expandedDomains: Record<string, boolean>;
  onToggleDomain: (domain: string) => void;
}

export default function Sidebar({ expandedDomains, onToggleDomain }: SidebarProps) {
  const location = useLocation();
  const [expandedSubcategories, setExpandedSubcategories] = useState<Record<string, boolean>>({});
  const { data: concepts = [] } = useQuery({
    queryKey: ["concepts"],
    queryFn: () => fetch("/api/concepts").then(r => r.json()).then(d => d.concepts ?? []),
  });
  const domains = getDomainTree(concepts);

  const isConceptActive = (slug: string) => location.pathname === `/concept/${slug}`;

  const toggleSubcategory = (name: string) => {
    setExpandedSubcategories(prev => ({ ...prev, [name]: !prev[name] }));
  };

  function renderGroup(node: DomainTreeGroup, depth: number): JSX.Element {
    if (depth === 0) {
      return (
        <div key={node.id}>
          <button
            onClick={() => onToggleDomain(node.name)}
            className="w-full flex items-center justify-between px-3 py-2 text-slate-700 hover:bg-slate-200 rounded transition-colors"
          >
            <span className="font-medium text-sm">{node.name}</span>
            <ChevronDown
              size={16}
              className={`transition-transform ${expandedDomains[node.name] ? 'rotate-180' : ''}`}
            />
          </button>
          {expandedDomains[node.name] && node.children.map(child =>
            'slug' in child ? renderConcept(child as DomainTreeItem, depth + 1) : renderGroup(child as DomainTreeGroup, depth + 1)
          )}
        </div>
      );
    }

    return (
      <div key={node.id} className="ml-2">
        <button
          onClick={() => toggleSubcategory(node.name)}
          className="w-full flex items-center justify-between px-3 py-2 text-slate-700 hover:bg-slate-200 rounded transition-colors"
        >
          <span className="text-sm">{node.name}</span>
          <ChevronDown
            size={14}
            className={`transition-transform ${expandedSubcategories[node.name] ? 'rotate-180' : ''}`}
          />
        </button>
        {expandedSubcategories[node.name] && node.children.map(child =>
          'slug' in child ? renderConcept(child as DomainTreeItem, depth + 1) : renderGroup(child as DomainTreeGroup, depth + 1)
        )}
      </div>
    );
  }

  function renderConcept(node: DomainTreeItem, depth: number): JSX.Element {
    return (
      <Link
        key={node.id}
        to={`/concept/${node.slug}`}
        className={`block px-3 py-2 text-sm rounded transition-colors ${depth > 1 ? 'ml-4' : 'ml-2'} ${
          isConceptActive(node.slug)
            ? 'bg-slate-900 text-white font-medium'
            : 'text-slate-600 hover:bg-slate-200 hover:text-slate-900'
        }`}
      >
        {node.name}
      </Link>
    );
  }

  return (
    <aside className="w-64 border-r border-slate-200 bg-slate-50 p-4 overflow-auto flex flex-col h-full">
      <nav className="space-y-1 flex-1">
        <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-3 py-2 mb-3">
          Domains
        </h3>
        {domains.map(domain =>
          'slug' in domain
            ? renderConcept(domain as DomainTreeItem, 0)
            : renderGroup(domain as DomainTreeGroup, 0)
        )}
      </nav>
      <div className="text-xs text-slate-500 pt-4 border-t border-slate-200">
        <p>Public Knowledge Viewer</p>
      </div>
    </aside>
  );
}
