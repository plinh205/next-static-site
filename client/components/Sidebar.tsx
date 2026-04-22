import { Link } from "react-router-dom";
import DomainTree from "./DomainTree";

export default function Sidebar() {
  return (
    <aside className="app-sidebar">
      <div className="app-sidebar__inner">
        <Link to="/" className="app-sidebar__home">
          Home
        </Link>

        <DomainTree />

        <div className="app-sidebar__footer">
          <p>Public Knowledge Viewer</p>
        </div>
      </div>
    </aside>
  );
}
