import { useNavigate } from "react-router-dom";
import { ChevronDown } from "lucide-react";

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

function Arrow() {
  return (
    <div className="flex flex-col items-center py-1">
      <div className="w-px h-4 bg-slate-300" />
      <ChevronDown size={18} className="text-slate-300 -mt-1" />
    </div>
  );
}

export default function FlowDiagram({ steps }: FlowDiagramProps) {
  const navigate = useNavigate();

  function renderStep(step: FlowStep, depth: number = 0): JSX.Element {
    return (
      <div key={step.id} className="flex flex-col items-center w-full">
        <div className={`w-full max-w-sm ${depth > 0 ? 'ml-12' : ''}`}>
          <div className="bg-white border-2 border-slate-300 rounded-lg p-6 hover:border-slate-400 transition-colors">
            <h3 className="text-lg font-bold text-slate-900 mb-2">{step.title}</h3>
            <p className="text-xs text-slate-500 leading-relaxed mb-3">{step.description}</p>
            {step.relatedConcepts.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {step.relatedConcepts.map((slug) => (
                  <button
                    key={slug}
                    onClick={() => navigate(`/concept/${slug}`)}
                    className="inline-block px-3 py-1 bg-blue-100 text-blue-900 rounded-full text-xs font-medium hover:bg-blue-200 transition-colors"
                  >
                    {slug}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {step.children && step.children.length > 0 && (
          <div className="mt-6 flex gap-8 justify-center w-full">
            {step.children.map(child => (
              <div key={child.id} className="flex flex-col items-center">
                <div className="h-8 w-0.5 bg-slate-300 mb-2" />
                <div className="border-t-2 border-l-2 border-r-2 border-slate-300 px-4 py-1 rounded-t">
                  {renderStep(child, depth + 1)}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-2 py-8">
      {steps.map((step, index) => (
        <div key={step.id} className="flex flex-col items-center w-full">
          {renderStep(step)}
          {index < steps.length - 1 && <Arrow />}
        </div>
      ))}
    </div>
  );
}
