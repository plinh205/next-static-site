import { useState, type ReactNode } from "react";
import TopNav from "./TopNav";
import Sidebar from "./Sidebar";

interface LayoutProps {
  children: ReactNode;
  showSidebar?: boolean;
}

export default function Layout({ children, showSidebar = true }: LayoutProps) {
  const [expandedDomains, setExpandedDomains] = useState<Record<string, boolean>>({ 'System Design': true });

  const toggleDomain = (domain: string) => {
    setExpandedDomains(prev => ({ ...prev, [domain]: !prev[domain] }));
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      <TopNav />

      <div className="flex flex-1 overflow-hidden">
        {showSidebar && <Sidebar expandedDomains={expandedDomains} onToggleDomain={toggleDomain} />}
        <main className="flex-1 overflow-auto">
          <div className="flex-1 overflow-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}
