import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE } from "@/lib/config";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ChevronLeft } from "lucide-react";

export default function AdminConcepts() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    domain: "",
    summary: "",
    definition: "",
    mentalModel: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch(`${API_BASE}/api/concepts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: formData.title, domain: formData.domain }),
      });
      if (!response.ok) {
        const error = await response.json();
        alert(error.error);
        return;
      }
      const data = await response.json();
      setFormData({ title: "", domain: "", summary: "", definition: "", mentalModel: "" });
      alert(`Concept "${data.concept.slug}" created!`);
    } catch {
      alert("An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

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

        <h1 className="text-3xl font-bold text-slate-900 mb-8">Create Concept</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-900 mb-2">
              Title
            </label>
            <Input
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter concept title"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-900 mb-2">
              Domain
            </label>
            <Input
              name="domain"
              value={formData.domain}
              onChange={handleChange}
              placeholder="e.g., System Design"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-900 mb-2">
              Summary
            </label>
            <Textarea
              name="summary"
              value={formData.summary}
              onChange={handleChange}
              placeholder="Brief summary"
              rows={3}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-900 mb-2">
              Definition
            </label>
            <Textarea
              name="definition"
              value={formData.definition}
              onChange={handleChange}
              placeholder="Detailed definition"
              rows={4}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-900 mb-2">
              Mental Model
            </label>
            <Textarea
              name="mentalModel"
              value={formData.mentalModel}
              onChange={handleChange}
              placeholder="How to think about this concept"
              rows={3}
              required
            />
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            Create Concept
          </Button>
        </form>
      </div>
    </Layout>
  );
}

