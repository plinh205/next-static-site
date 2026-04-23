import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface RelationFormData {
  fromConcept: string;
  relationType: string;
  toConcept: string;
  description: string;
}

interface RelationFormProps {
  onSubmit: (data: RelationFormData) => void;
  initialData?: Partial<RelationFormData>;
}

export default function RelationForm({ onSubmit, initialData }: RelationFormProps) {
  const [data, setData] = useState<RelationFormData>({
    fromConcept: initialData?.fromConcept || "",
    relationType: initialData?.relationType || "used-with",
    toConcept: initialData?.toConcept || "",
    description: initialData?.description || "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(data);
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Create Relation</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="fromConcept">From Concept</Label>
            <Input
              id="fromConcept"
              value={data.fromConcept}
              onChange={(e) => setData(prev => ({ ...prev, fromConcept: e.target.value }))}
              placeholder="e.g., api"
              required
            />
          </div>

          <div>
            <Label htmlFor="relationType">Relation Type</Label>
            <Select value={data.relationType} onValueChange={(value) => setData(prev => ({ ...prev, relationType: value }))}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="used-with">Used With</SelectItem>
                <SelectItem value="alternative-to">Alternative To</SelectItem>
                <SelectItem value="depends-on">Depends On</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="toConcept">To Concept</Label>
            <Input
              id="toConcept"
              value={data.toConcept}
              onChange={(e) => setData(prev => ({ ...prev, toConcept: e.target.value }))}
              placeholder="e.g., database"
              required
            />
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={data.description}
              onChange={(e) => setData(prev => ({ ...prev, description: e.target.value }))}
              rows={3}
              placeholder="Describe the relationship between these concepts..."
            />
          </div>

          <Button type="submit" className="w-full">
            Create Relation
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}