import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { getConceptTitleBySlug } from "@/lib/knowledge";

interface FlowStep {
  id: string;
  title: string;
  description: string;
  relatedConcepts: string[];
  children?: FlowStep[];
}

interface FlowDiagramProps {
  steps: FlowStep[];
}

function StepCard({ step }: { step: FlowStep }) {
  return (
    <div className="bg-white border-2 border-slate-200 rounded-lg p-5 w-[280px] shadow-sm">
      <h3 className="text-sm font-bold text-slate-900 mb-1.5">{step.title}</h3>
      <p className="text-xs text-slate-500 leading-relaxed mb-3">
        {step.description}
      </p>
      {step.relatedConcepts.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {step.relatedConcepts.map((slug) => (
            <Link
              key={slug}
              to={`/concept/${slug}`}
              className="inline-block px-2 py-0.5 bg-blue-50 text-blue-700 border border-blue-200 rounded text-xs font-medium hover:bg-blue-100 transition-colors"
            >
              {getConceptTitleBySlug(slug)}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

function Arrow() {
  return (
    <div className="flex flex-col items-center py-1">
      <div className="w-px h-4 bg-slate-300" />
      <ChevronDown size={18} className="text-slate-300 -mt-1" />
    </div>
  );
}

function BranchGroup({ children }: { children: FlowStep[] }) {
  const count = children.length;
  // Each card is 280px wide, gap between cards is 24px
  const totalWidth = count * 280 + (count - 1) * 24;

  return (
    <div className="flex flex-col items-center w-full">
      {/* Stem from parent */}
      <div className="w-px h-5 bg-slate-300" />

      {/* Horizontal crossbar */}
      {count > 1 && (
        <div
          className="h-px bg-slate-300"
          style={{ width: `${totalWidth - 280}px` }}
        />
      )}

      {/* Branch cards */}
      <div className="flex gap-6 items-start">
        {children.map((child) => (
          <div key={child.id} className="flex flex-col items-center">
            {/* Drop from crossbar */}
            <div className="w-px h-5 bg-slate-300" />
            <StepCard step={child} />
            {/* Tail below branch card */}
            <div className="w-px h-5 bg-slate-300" />
          </div>
        ))}
      </div>

      {/* Merge line back together */}
      {count > 1 && (
        <div
          className="h-px bg-slate-300"
          style={{ width: `${totalWidth - 280}px` }}
        />
      )}
    </div>
  );
}

export default function FlowDiagram({ steps }: FlowDiagramProps) {
  return (
    <div className="flex flex-col items-center py-4">
      {steps.map((step, index) => (
        <div key={step.id} className="flex flex-col items-center w-full">
          <StepCard step={step} />

          {step.children && step.children.length > 0 ? (
            <>
              <BranchGroup>{step.children}</BranchGroup>
              {index < steps.length - 1 && <Arrow />}
            </>
          ) : (
            index < steps.length - 1 && <Arrow />
          )}
        </div>
      ))}
    </div>
  );
}
