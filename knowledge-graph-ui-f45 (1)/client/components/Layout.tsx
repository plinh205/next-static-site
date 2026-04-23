import { ReactNode, useState } from "react";
import TopNav from "./TopNav";
import Sidebar from "./Sidebar";

interface LayoutProps {
  children: ReactNode;
  showSidebar?: boolean;
}

export default function Layout({
  children,
  showSidebar = true,
}: LayoutProps) {
  const [expandedDomains, setExpandedDomains] = useState<Record<string, boolean>>({
    "System Design": true,
  });

  const toggleDomain = (domain: string) => {
    setExpandedDomains((prev) => ({
      ...prev,
      [domain]: !prev[domain],
    }));
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Top Navigation */}
      <TopNav />

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        {showSidebar && (
          <Sidebar
            expandedDomains={expandedDomains}
            onToggleDomain={toggleDomain}
          />
        )}

        {/* Content */}
        <div className="flex-1 overflow-auto">{children}</div>
      </div>
    </div>
  );
}
