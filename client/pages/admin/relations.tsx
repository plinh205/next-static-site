import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronLeft } from "lucide-react";

export default function AdminRelations() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    source: "",
    type: "related-to",
    target: "",
    description: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, type: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Relation created:", formData);
    setFormData({ source: "", type: "related-to", target: "", description: "" });
    alert("Relation created successfully!");
  };

  const relationTypes = [
    "related-to",
    "depends-on",
    "alternative-to",
    "used-with",
    "builds-on",
  ];

  return (
    <Layout>
      <div className="max-w-3xl mx-auto px-8 py-8">
        <button
          onClick={() => navigate("/admin")}
          className="flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-6"
        >
          <ChevronLeft size={20} />
          Back to Admin
        </button>

        <h1 className="text-3xl font-bold text-slate-900 mb-8">Create Relation</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-900 mb-2">
              Source Concept
            </label>
            <Input
              name="source"
              value={formData.source}
              onChange={handleChange}
              placeholder="Enter source concept name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-900 mb-2">
              Relation Type
            </label>
            <Select value={formData.type} onValueChange={handleSelectChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select relation type" />
              </SelectTrigger>
              <SelectContent>
                {relationTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type.replace(/-/g, " ").toUpperCase()}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-900 mb-2">
              Target Concept
            </label>
            <Input
              name="target"
              value={formData.target}
              onChange={handleChange}
              placeholder="Enter target concept name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-900 mb-2">
              Description
            </label>
            <Textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Explain the relationship between these concepts"
              rows={4}
            />
          </div>

          <div className="flex gap-4 pt-4">
            <Button type="submit">Create Relation</Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/admin")}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </Layout>
  );
}
