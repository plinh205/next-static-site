import { useNavigate } from "react-router-dom";
import { FlowStep } from "@/lib/mockData";
import { ChevronDown } from "lucide-react";

interface FlowDiagramProps {
  steps: FlowStep[];
}

export default function FlowDiagram({ steps }: FlowDiagramProps) {
  const navigate = useNavigate();

  const renderStep = (step: FlowStep, depth: number = 0) => (
    <div key={step.id} className="flex flex-col items-center">
      {/* Step Card */}
      <div className={`w-full max-w-sm ${depth > 0 ? "ml-12" : ""}`}>
        <div className="bg-white border-2 border-slate-300 rounded-lg p-6 hover:border-slate-400 transition-colors">
          <h3 className="text-lg font-bold text-slate-900 mb-2">
            {step.title}
          </h3>
          <p className="text-sm text-slate-600 mb-4">{step.description}</p>

          {/* Related Concepts */}
          {step.relatedConcepts.length > 0 && (
            <div className="flex flex-wrap gap-2">
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

      {/* Branching Logic */}
      {step.children && step.children.length > 0 && (
        <div className="mt-6 flex gap-8 justify-center w-full">
          {step.children.map((child) => (
            <div key={child.id} className="flex flex-col items-center">
              {/* Connection from parent to branches */}
              <div className="h-8 w-0.5 bg-slate-300 mb-2"></div>

              {/* Branch box */}
              <div className="border-t-2 border-l-2 border-r-2 border-slate-300 px-4 py-1 rounded-t">
                {/* Render child recursively */}
                {renderStep(child, depth + 1)}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Downward Arrow */}
      {steps.indexOf(step) < steps.length - 1 && !step.children && (
        <div className="mt-4 flex flex-col items-center">
          <ChevronDown size={24} className="text-slate-400" />
        </div>
      )}
    </div>
  );

  return (
    <div className="flex flex-col items-center gap-2 py-8">
      {steps.map((step, index) => (
        <div key={step.id} className="flex flex-col items-center w-full">
          {/* Render step */}
          {renderStep(step)}

          {/* Arrow between steps */}
          {index < steps.length - 1 && !step.children && (
            <div className="mt-4 text-slate-400">
              <ChevronDown size={24} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
