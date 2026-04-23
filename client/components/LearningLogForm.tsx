import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2 } from "lucide-react";

interface LearningLogFormData {
  topic: string;
  relatedConcepts: string[];
  trigger: string;
  initialUnderstanding: string;
  afterLearning: string;
  updatedMentalModel: string;
  openQuestions: string[];
}

interface LearningLogFormProps {
  onSubmit: (data: LearningLogFormData) => void;
  initialData?: Partial<LearningLogFormData>;
}

export default function LearningLogForm({ onSubmit, initialData }: LearningLogFormProps) {
  const [data, setData] = useState<LearningLogFormData>({
    topic: initialData?.topic || "",
    relatedConcepts: initialData?.relatedConcepts || [],
    trigger: initialData?.trigger || "",
    initialUnderstanding: initialData?.initialUnderstanding || "",
    afterLearning: initialData?.afterLearning || "",
    updatedMentalModel: initialData?.updatedMentalModel || "",
    openQuestions: initialData?.openQuestions || [""],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(data);
  };

  const addConcept = () => {
    setData(prev => ({ ...prev, relatedConcepts: [...prev.relatedConcepts, ""] }));
  };

  const updateConcept = (index: number, value: string) => {
    setData(prev => ({
      ...prev,
      relatedConcepts: prev.relatedConcepts.map((c, i) => i === index ? value : c)
    }));
  };

  const removeConcept = (index: number) => {
    setData(prev => ({
      ...prev,
      relatedConcepts: prev.relatedConcepts.filter((_, i) => i !== index)
    }));
  };

  const addQuestion = () => {
    setData(prev => ({ ...prev, openQuestions: [...prev.openQuestions, ""] }));
  };

  const updateQuestion = (index: number, value: string) => {
    setData(prev => ({
      ...prev,
      openQuestions: prev.openQuestions.map((q, i) => i === index ? value : q)
    }));
  };

  const removeQuestion = (index: number) => {
    setData(prev => ({
      ...prev,
      openQuestions: prev.openQuestions.filter((_, i) => i !== index)
    }));
  };

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <CardTitle>Create Learning Log</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="topic">Topic</Label>
            <Input
              id="topic"
              value={data.topic}
              onChange={(e) => setData(prev => ({ ...prev, topic: e.target.value }))}
              placeholder="What did you learn about?"
              required
            />
          </div>

          <div>
            <Label>Related Concepts</Label>
            {data.relatedConcepts.map((concept, index) => (
              <div key={index} className="flex gap-2 mt-2">
                <Input
                  value={concept}
                  onChange={(e) => updateConcept(index, e.target.value)}
                  placeholder="Concept slug..."
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => removeConcept(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button type="button" variant="outline" onClick={addConcept} className="mt-2">
              <Plus className="h-4 w-4 mr-2" />
              Add Concept
            </Button>
          </div>

          <div>
            <Label htmlFor="trigger">Trigger</Label>
            <Textarea
              id="trigger"
              value={data.trigger}
              onChange={(e) => setData(prev => ({ ...prev, trigger: e.target.value }))}
              rows={2}
              placeholder="What prompted you to learn this?"
            />
          </div>

          <div>
            <Label htmlFor="initialUnderstanding">Initial Understanding</Label>
            <Textarea
              id="initialUnderstanding"
              value={data.initialUnderstanding}
              onChange={(e) => setData(prev => ({ ...prev, initialUnderstanding: e.target.value }))}
              rows={3}
              placeholder="What did you think you knew before learning?"
            />
          </div>

          <div>
            <Label htmlFor="afterLearning">After Learning</Label>
            <Textarea
              id="afterLearning"
              value={data.afterLearning}
              onChange={(e) => setData(prev => ({ ...prev, afterLearning: e.target.value }))}
              rows={3}
              placeholder="What did you learn?"
            />
          </div>

          <div>
            <Label htmlFor="updatedMentalModel">Updated Mental Model</Label>
            <Textarea
              id="updatedMentalModel"
              value={data.updatedMentalModel}
              onChange={(e) => setData(prev => ({ ...prev, updatedMentalModel: e.target.value }))}
              rows={3}
              placeholder="How has your understanding changed?"
            />
          </div>

          <div>
            <Label>Open Questions</Label>
            {data.openQuestions.map((question, index) => (
              <div key={index} className="flex gap-2 mt-2">
                <Input
                  value={question}
                  onChange={(e) => updateQuestion(index, e.target.value)}
                  placeholder="What questions do you still have?"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => removeQuestion(index)}
                  disabled={data.openQuestions.length === 1}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button type="button" variant="outline" onClick={addQuestion} className="mt-2">
              <Plus className="h-4 w-4 mr-2" />
              Add Question
            </Button>
          </div>

          <Button type="submit" className="w-full">
            Create Learning Log
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}