import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  forceSimulation,
  forceLink,
  forceManyBody,
  forceCenter,
  SimulationNodeDatum,
  SimulationLinkDatum,
} from "d3-force";
import type { Concept } from "@/lib/mockData";

const PALETTE = [
  "#6366f1", "#f59e0b", "#10b981", "#f43f5e",
  "#8b5cf6", "#06b6d4", "#f97316", "#14b8a6",
];

interface RelationLink {
  from: string;
  to: string;
}

interface Props {
  concepts: Concept[];
  relations: RelationLink[];
  domainColorMap: Record<string, string>;
}

interface GraphNode extends SimulationNodeDatum {
  slug: string;
  title: string;
  domain: string;
}

interface GraphLink extends SimulationLinkDatum<GraphNode> {
  source: GraphNode;
  target: GraphNode;
}

const WIDTH = 800;
const HEIGHT = 560;

export default function ConceptGraph({ concepts, relations, domainColorMap }: Props) {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState<GraphNode | null>(null);

  const { nodes, links } = useMemo(() => {
    const nodes: GraphNode[] = concepts.map(c => ({
      slug: c.slug,
      title: c.title ?? c.slug,
      domain: c.domain?.split(">")[0].trim() ?? "General",
    }));

    const slugSet = new Set(nodes.map(n => n.slug));
    const links = relations
      .filter(r => slugSet.has(r.from) && slugSet.has(r.to))
      .map(r => ({
        source: nodes.find(n => n.slug === r.from)!,
        target: nodes.find(n => n.slug === r.to)!,
      }));

    const sim = forceSimulation<GraphNode>(nodes)
      .force("link", forceLink<GraphNode, GraphLink>(links).distance(90).strength(0.5))
      .force("charge", forceManyBody().strength(-120))
      .force("center", forceCenter(WIDTH / 2, HEIGHT / 2))
      .stop();

    sim.tick(300);
    return { nodes, links };
  }, [concepts, relations]);

  const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));

  return (
    <div className="relative w-full" style={{ height: HEIGHT }}>
      <svg width="100%" height={HEIGHT} viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className="rounded-xl">
        {links.map((l, i) => (
          <line
            key={i}
            x1={clamp((l.source as GraphNode).x ?? 0, 0, WIDTH)}
            y1={clamp((l.source as GraphNode).y ?? 0, 0, HEIGHT)}
            x2={clamp((l.target as GraphNode).x ?? 0, 0, WIDTH)}
            y2={clamp((l.target as GraphNode).y ?? 0, 0, HEIGHT)}
            stroke="#e2e8f0"
            strokeWidth={1.5}
          />
        ))}
        {nodes.map(node => {
          const x = clamp(node.x ?? 0, 0, WIDTH);
          const y = clamp(node.y ?? 0, 0, HEIGHT);
          const color = domainColorMap[node.domain] ?? "#94a3b8";
          return (
            <g
              key={node.slug}
              transform={`translate(${x},${y})`}
              cursor="pointer"
              onClick={() => navigate(`/concept/${node.slug}`)}
              onMouseEnter={() => setHovered(node)}
              onMouseLeave={() => setHovered(null)}
            >
              <circle r={14} fill={color} opacity={0.85} />
              <text
                y={26}
                textAnchor="middle"
                fontSize={10}
                fill="#475569"
                style={{ pointerEvents: "none", userSelect: "none" }}
              >
                {node.title.length > 14 ? node.title.slice(0, 13) + "…" : node.title}
              </text>
            </g>
          );
        })}
      </svg>

      {hovered && (() => {
        const x = clamp(hovered.x ?? 0, 0, WIDTH);
        const y = clamp(hovered.y ?? 0, 0, HEIGHT);
        const pct = x / WIDTH;
        return (
          <div
            className="absolute pointer-events-none bg-slate-900 text-white text-xs px-3 py-2 rounded-lg shadow-lg z-10 max-w-[180px]"
            style={{
              left: `${pct * 100}%`,
              top: y - 44,
              transform: pct > 0.7 ? "translateX(-100%)" : pct > 0.3 ? "translateX(-50%)" : "none",
            }}
          >
            <div className="font-semibold">{hovered.title}</div>
            {hovered.domain && <div className="text-slate-400 mt-0.5">{hovered.domain}</div>}
          </div>
        );
      })()}
    </div>
  );
}

export { PALETTE };
