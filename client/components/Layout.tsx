import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="app-shell">
      <header className="app-topbar">
        <div className="app-topbar__inner">
          <Link to="/" className="app-brand">
            <span className="app-brand__mark">KO</span>
            <span className="app-brand__text">Knowledge OS</span>
          </Link>

          <div className="app-search-placeholder">Search concepts...</div>
        </div>
      </header>

      <div className="app-body">
        <Sidebar />

        <main className="app-main">
          <div className="app-content">{children}</div>
        </main>
      </div>
    </div>
  );
}
