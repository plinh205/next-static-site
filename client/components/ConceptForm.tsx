import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2 } from "lucide-react";

interface ConceptFormData {
  title: string;
  slug: string;
  domain: string;
  summary: string;
  definition: string;
  mentalModel: string;
  mechanism: string[];
  whenToUse: string[];
  compare: Array<{ concept: string; difference: string }>;
}

interface ConceptFormProps {
  onSubmit: (data: ConceptFormData) => void;
  initialData?: Partial<ConceptFormData>;
}

export default function ConceptForm({ onSubmit, initialData }: ConceptFormProps) {
  const [data, setData] = useState<ConceptFormData>({
    title: initialData?.title || "",
    slug: initialData?.slug || "",
    domain: initialData?.domain || "communication",
    summary: initialData?.summary || "",
    definition: initialData?.definition || "",
    mentalModel: initialData?.mentalModel || "",
    mechanism: initialData?.mechanism || [""],
    whenToUse: initialData?.whenToUse || [""],
    compare: initialData?.compare || [{ concept: "", difference: "" }],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(data);
  };

  const addMechanism = () => {
    setData(prev => ({ ...prev, mechanism: [...prev.mechanism, ""] }));
  };

  const updateMechanism = (index: number, value: string) => {
    setData(prev => ({
      ...prev,
      mechanism: prev.mechanism.map((m, i) => i === index ? value : m)
    }));
  };

  const removeMechanism = (index: number) => {
    setData(prev => ({
      ...prev,
      mechanism: prev.mechanism.filter((_, i) => i !== index)
    }));
  };

  const addWhenToUse = () => {
    setData(prev => ({ ...prev, whenToUse: [...prev.whenToUse, ""] }));
  };

  const updateWhenToUse = (index: number, value: string) => {
    setData(prev => ({
      ...prev,
      whenToUse: prev.whenToUse.map((w, i) => i === index ? value : w)
    }));
  };

  const removeWhenToUse = (index: number) => {
    setData(prev => ({
      ...prev,
      whenToUse: prev.whenToUse.filter((_, i) => i !== index)
    }));
  };

  const addCompare = () => {
    setData(prev => ({
      ...prev,
      compare: [...prev.compare, { concept: "", difference: "" }]
    }));
  };

  const updateCompare = (index: number, field: 'concept' | 'difference', value: string) => {
    setData(prev => ({
      ...prev,
      compare: prev.compare.map((c, i) =>
        i === index ? { ...c, [field]: value } : c
      )
    }));
  };

  const removeCompare = (index: number) => {
    setData(prev => ({
      ...prev,
      compare: prev.compare.filter((_, i) => i !== index)
    }));
  };

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <CardTitle>Create Concept</CardTitle>
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
            <Label htmlFor="domain">Domain</Label>
            <Select value={data.domain} onValueChange={(value) => setData(prev => ({ ...prev, domain: value }))}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="communication">Communication</SelectItem>
                <SelectItem value="infrastructure">Infrastructure</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="summary">Summary</Label>
            <Textarea
              id="summary"
              value={data.summary}
              onChange={(e) => setData(prev => ({ ...prev, summary: e.target.value }))}
              rows={2}
            />
          </div>

          <div>
            <Label htmlFor="definition">Definition</Label>
            <Textarea
              id="definition"
              value={data.definition}
              onChange={(e) => setData(prev => ({ ...prev, definition: e.target.value }))}
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="mentalModel">Mental Model</Label>
            <Textarea
              id="mentalModel"
              value={data.mentalModel}
              onChange={(e) => setData(prev => ({ ...prev, mentalModel: e.target.value }))}
              rows={3}
            />
          </div>

          <div>
            <Label>Core Mechanism</Label>
            {data.mechanism.map((mech, index) => (
              <div key={index} className="flex gap-2 mt-2">
                <Input
                  value={mech}
                  onChange={(e) => updateMechanism(index, e.target.value)}
                  placeholder="Describe a core mechanism..."
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => removeMechanism(index)}
                  disabled={data.mechanism.length === 1}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button type="button" variant="outline" onClick={addMechanism} className="mt-2">
              <Plus className="h-4 w-4 mr-2" />
              Add Mechanism
            </Button>
          </div>

          <div>
            <Label>When to Use</Label>
            {data.whenToUse.map((use, index) => (
              <div key={index} className="flex gap-2 mt-2">
                <Input
                  value={use}
                  onChange={(e) => updateWhenToUse(index, e.target.value)}
                  placeholder="When should this concept be used..."
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => removeWhenToUse(index)}
                  disabled={data.whenToUse.length === 1}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button type="button" variant="outline" onClick={addWhenToUse} className="mt-2">
              <Plus className="h-4 w-4 mr-2" />
              Add Use Case
            </Button>
          </div>

          <div>
            <Label>Compare with Other Concepts</Label>
            {data.compare.map((comp, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                <Input
                  value={comp.concept}
                  onChange={(e) => updateCompare(index, 'concept', e.target.value)}
                  placeholder="Concept to compare with..."
                />
                <div className="flex gap-2">
                  <Input
                    value={comp.difference}
                    onChange={(e) => updateCompare(index, 'difference', e.target.value)}
                    placeholder="Key difference..."
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => removeCompare(index)}
                    disabled={data.compare.length === 1}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
            <Button type="button" variant="outline" onClick={addCompare} className="mt-2">
              <Plus className="h-4 w-4 mr-2" />
              Add Comparison
            </Button>
          </div>

          <Button type="submit" className="w-full">
            Create Concept
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}