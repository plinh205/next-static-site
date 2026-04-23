import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2, ArrowRight } from "lucide-react";

interface FlowStep {
  id: string;
  title: string;
  description: string;
  relatedConcepts: string[];
}

interface FlowFormData {
  title: string;
  slug: string;
  description: string;
  steps: FlowStep[];
}

interface FlowFormProps {
  onSubmit: (data: FlowFormData) => void;
  initialData?: Partial<FlowFormData>;
}

export default function FlowForm({ onSubmit, initialData }: FlowFormProps) {
  const [data, setData] = useState<FlowFormData>({
    title: initialData?.title || "",
    slug: initialData?.slug || "",
    description: initialData?.description || "",
    steps: initialData?.steps || [
      {
        id: "step-1",
        title: "",
        description: "",
        relatedConcepts: [],
      },
    ],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(data);
  };

  const addStep = () => {
    const newStep: FlowStep = {
      id: `step-${data.steps.length + 1}`,
      title: "",
      description: "",
      relatedConcepts: [],
    };
    setData(prev => ({ ...prev, steps: [...prev.steps, newStep] }));
  };

  const updateStep = (index: number, field: keyof FlowStep, value: string | string[]) => {
    setData(prev => ({
      ...prev,
      steps: prev.steps.map((step, i) =>
        i === index ? { ...step, [field]: value } : step
      )
    }));
  };

  const removeStep = (index: number) => {
    setData(prev => ({
      ...prev,
      steps: prev.steps.filter((_, i) => i !== index)
    }));
  };

  const addConceptToStep = (stepIndex: number) => {
    const step = data.steps[stepIndex];
    updateStep(stepIndex, 'relatedConcepts', [...step.relatedConcepts, ""]);
  };

  const updateConceptInStep = (stepIndex: number, conceptIndex: number, value: string) => {
    const step = data.steps[stepIndex];
    const newConcepts = step.relatedConcepts.map((c, i) => i === conceptIndex ? value : c);
    updateStep(stepIndex, 'relatedConcepts', newConcepts);
  };

  const removeConceptFromStep = (stepIndex: number, conceptIndex: number) => {
    const step = data.steps[stepIndex];
    const newConcepts = step.relatedConcepts.filter((_, i) => i !== conceptIndex);
    updateStep(stepIndex, 'relatedConcepts', newConcepts);
  };

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <CardTitle>Create Flow</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={data.title}
                onChange={(e) => setData(prev => ({ ...prev, title: e.target.value }))}
                required
              />
            </div>
            <div>
              <Label htmlFor="slug">Slug</Label>
              <Input
                id="slug"
                value={data.slug}
                onChange={(e) => setData(prev => ({ ...prev, slug: e.target.value }))}
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={data.description}
              onChange={(e) => setData(prev => ({ ...prev, description: e.target.value }))}
              rows={3}
            />
          </div>

          <div>
            <Label>Steps</Label>
            <div className="space-y-4 mt-2">
              {data.steps.map((step, stepIndex) => (
                <Card key={step.id} className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-sm font-medium">
                        {stepIndex + 1}
                      </div>
                      {stepIndex < data.steps.length - 1 && <ArrowRight className="w-4 h-4 text-gray-400" />}
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => removeStep(stepIndex)}
                      disabled={data.steps.length === 1}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label>Step Title</Label>
                      <Input
                        value={step.title}
                        onChange={(e) => updateStep(stepIndex, 'title', e.target.value)}
                        placeholder="What happens in this step?"
                      />
                    </div>

                    <div>
                      <Label>Step Description</Label>
                      <Textarea
                        value={step.description}
                        onChange={(e) => updateStep(stepIndex, 'description', e.target.value)}
                        rows={2}
                        placeholder="Describe this step in detail..."
                      />
                    </div>

                    <div>
                      <Label>Related Concepts</Label>
                      {step.relatedConcepts.map((concept, conceptIndex) => (
                        <div key={conceptIndex} className="flex gap-2 mt-2">
                          <Input
                            value={concept}
                            onChange={(e) => updateConceptInStep(stepIndex, conceptIndex, e.target.value)}
                            placeholder="Concept slug..."
                          />
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            onClick={() => removeConceptFromStep(stepIndex, conceptIndex)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => addConceptToStep(stepIndex)}
                        className="mt-2"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Concept
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
            <Button type="button" variant="outline" onClick={addStep} className="mt-4">
              <Plus className="h-4 w-4 mr-2" />
              Add Step
            </Button>
          </div>

          <Button type="submit" className="w-full">
            Create Flow
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}