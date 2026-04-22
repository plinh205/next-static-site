import { useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  getDomainTree,
  type DomainTreeNode,
} from "@/lib/knowledge";

function renderTree(nodes: DomainTreeNode[], pathname: string, level = 0) {
  return (
    <ul className={`domain-tree__list domain-tree__list--level-${level}`}>
      {nodes.map((node) => {
        const isConcept = "slug" in node;
        const isActive = isConcept && pathname === `/concept/${node.slug}`;

        return (
          <li key={node.id} className="domain-tree__item">
            {isConcept ? (
              <Link
                to={`/concept/${node.slug}`}
                className={`domain-tree__node domain-tree__node--concept${
                  isActive ? " domain-tree__node--active" : ""
                }`}
              >
                {node.name}
              </Link>
            ) : (
              <div className="domain-tree__node domain-tree__node--group">
                {node.name}
              </div>
            )}

            {node.children.length > 0 ? renderTree(node.children, pathname, level + 1) : null}
          </li>
        );
      })}
    </ul>
  );
}

export default function DomainTree() {
  const location = useLocation();
  const domains = useMemo(() => getDomainTree(), []);

  return (
    <nav className="domain-tree">
      <h3 className="domain-tree__heading">Domains</h3>
      {renderTree(domains, location.pathname)}
    </nav>
  );
}
