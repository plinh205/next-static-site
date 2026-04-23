import type { ReactNode } from "react";
import TopNav from "./TopNav";
import Sidebar from "./Sidebar";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col h-screen bg-white">
      <TopNav />
      
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-auto">
          <div className="app-content">{children}</div>
        </main>
      </div>
    </div>
  );
}
