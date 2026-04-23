import { useState } from "react";
import AdminLayout, { type AdminTab } from "@/components/AdminLayout";
import DomainSelect from "@/components/DomainSelect";
import ConceptMultiSelect from "@/components/ConceptMultiSelect";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { mockConcepts, type FlowStep } from "@/lib/mockData";
import { ChevronUp, ChevronDown, Trash2 } from "lucide-react";

interface CompareItem {
  concept: string;
  difference: string;
}

interface ConceptFormData {
  title: string;
  slug: string;
  domain: string;
  summary: string;
  definition: string;
  mentalModel: string;
  mechanism: string[];
  whenToUse: string[];
  compare: CompareItem[];
}

interface RelationFormData {
  fromConcept: string;
  relationType: string;
  toConcept: string;
  description: string;
}

interface LearningLogFormData {
  topic: string;
  relatedConcepts: string[];
  trigger: string;
  initialUnderstanding: string;
  afterLearning: string;
  updatedMentalModel: string;
  openQuestions: string[];
}

interface FlowFormData {
  title: string;
  slug: string;
  description: string;
  steps: FlowStep[];
}

export default function Admin() {
  const [activeTab, setActiveTab] = useState<AdminTab>("concept");

  const [conceptData, setConceptData] = useState<ConceptFormData>({
    title: "",
    slug: "",
    domain: "",
    summary: "",
    definition: "",
    mentalModel: "",
    mechanism: [""],
    whenToUse: [""],
    compare: [{ concept: "", difference: "" }],
  });

  const [relationData, setRelationData] = useState<RelationFormData>({
    fromConcept: "",
    relationType: "used-with",
    toConcept: "",
    description: "",
  });

  const [logData, setLogData] = useState<LearningLogFormData>({
    topic: "",
    relatedConcepts: [],
    trigger: "",
    initialUnderstanding: "",
    afterLearning: "",
    updatedMentalModel: "",
    openQuestions: [""],
  });

  const [flowData, setFlowData] = useState<FlowFormData>({
    title: "",
    slug: "",
    description: "",
    steps: [{ id: "step-1", title: "", description: "", relatedConcepts: [] }],
  });

  const [submitted, setSubmitted] = useState<AdminTab | null>(null);

  // ── Concept handlers ──────────────────────────────────────────────────────
  const handleConceptTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setConceptData({
      ...conceptData,
      title,
      slug: title.toLowerCase().replace(/\s+/g, "-"),
    });
  };

  const handleConceptInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setConceptData({ ...conceptData, [name]: value });
  };

  const handleConceptListChange = (
    field: "mechanism" | "whenToUse",
    index: number,
    value: string,
  ) => {
    const list = [...conceptData[field]];
    list[index] = value;
    setConceptData({ ...conceptData, [field]: list });
  };

  const addConceptListItem = (field: "mechanism" | "whenToUse") =>
    setConceptData({ ...conceptData, [field]: [...conceptData[field], ""] });

  const removeConceptListItem = (
    field: "mechanism" | "whenToUse",
    index: number,
  ) =>
    setConceptData({
      ...conceptData,
      [field]: conceptData[field].filter((_, i) => i !== index),
    });

  const handleCompareChange = (
    index: number,
    field: "concept" | "difference",
    value: string,
  ) => {
    const rows = [...conceptData.compare];
    rows[index] = { ...rows[index], [field]: value };
    setConceptData({ ...conceptData, compare: rows });
  };

  const addCompareItem = () =>
    setConceptData({
      ...conceptData,
      compare: [...conceptData.compare, { concept: "", difference: "" }],
    });

  const removeCompareItem = (index: number) =>
    setConceptData({
      ...conceptData,
      compare: conceptData.compare.filter((_, i) => i !== index),
    });

  const handleConceptSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Creating concept:", conceptData);
    flash("concept");
    setConceptData({
      title: "",
      slug: "",
      domain: "",
      summary: "",
      definition: "",
      mentalModel: "",
      mechanism: [""],
      whenToUse: [""],
      compare: [{ concept: "", difference: "" }],
    });
  };

  // ── Relation handlers ─────────────────────────────────────────────────────
  const handleRelationInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setRelationData({ ...relationData, [name]: value });
  };

  const handleRelationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Creating relation:", relationData);
    flash("relation");
    setRelationData({
      fromConcept: "",
      relationType: "used-with",
      toConcept: "",
      description: "",
    });
  };

  // ── Learning log handlers ─────────────────────────────────────────────────
  const handleLogInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setLogData({ ...logData, [name]: value });
  };

  const handleOpenQuestionChange = (index: number, value: string) => {
    const qs = [...logData.openQuestions];
    qs[index] = value;
    setLogData({ ...logData, openQuestions: qs });
  };

  const addOpenQuestion = () =>
    setLogData({
      ...logData,
      openQuestions: [...logData.openQuestions, ""],
    });

  const removeOpenQuestion = (index: number) =>
    setLogData({
      ...logData,
      openQuestions: logData.openQuestions.filter((_, i) => i !== index),
    });

  const handleLogSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Creating learning log:", logData);
    flash("log");
    setLogData({
      topic: "",
      relatedConcepts: [],
      trigger: "",
      initialUnderstanding: "",
      afterLearning: "",
      updatedMentalModel: "",
      openQuestions: [""],
    });
  };

  // ── Flow handlers ─────────────────────────────────────────────────────────
  const handleFlowTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setFlowData({
      ...flowData,
      title,
      slug: title.toLowerCase().replace(/\s+/g, "-"),
    });
  };

  const handleFlowInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFlowData({ ...flowData, [name]: value });
  };

  const handleStepChange = (stepIndex: number, field: string, value: any) => {
    const steps = [...flowData.steps];
    steps[stepIndex] = { ...steps[stepIndex], [field]: value };
    setFlowData({ ...flowData, steps });
  };

  const addStep = () =>
    setFlowData({
      ...flowData,
      steps: [
        ...flowData.steps,
        {
          id: `step-${Date.now()}`,
          title: "",
          description: "",
          relatedConcepts: [],
        },
      ],
    });

  const removeStep = (index: number) =>
    setFlowData({
      ...flowData,
      steps: flowData.steps.filter((_, i) => i !== index),
    });

  const moveStep = (index: number, dir: "up" | "down") => {
    const steps = [...flowData.steps];
    const target = dir === "up" ? index - 1 : index + 1;
    if (target >= 0 && target < steps.length) {
      [steps[index], steps[target]] = [steps[target], steps[index]];
      setFlowData({ ...flowData, steps });
    }
  };

  const handleFlowSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Creating flow:", flowData);
    flash("flow");
    setFlowData({
      title: "",
      slug: "",
      description: "",
      steps: [{ id: "step-1", title: "", description: "", relatedConcepts: [] }],
    });
  };

  // ── Helpers ───────────────────────────────────────────────────────────────
  const flash = (tab: AdminTab) => {
    setSubmitted(tab);
    setTimeout(() => setSubmitted(null), 2500);
  };

  const labelRequired = (text: string) => (
    <label className="block text-sm font-medium text-slate-900 mb-1.5">
      {text} <span className="text-red-500">*</span>
    </label>
  );

  const labelOptional = (text: string) => (
    <label className="block text-sm font-medium text-slate-900 mb-1.5">
      {text}{" "}
      <span className="text-slate-400 font-normal text-xs">(optional)</span>
    </label>
  );

  const addLink = (label: string, onClick: () => void) => (
    <button
      type="button"
      onClick={onClick}
      className="text-sm text-blue-600 hover:text-blue-700 font-medium"
    >
      + {label}
    </button>
  );

  const formActions = (saveLabel: string) => (
    <div className="flex gap-3 pt-4 border-t border-slate-100 mt-8">
      <Button
        type="submit"
        className="bg-slate-900 text-white hover:bg-slate-800 px-6"
      >
        {saveLabel}
      </Button>
      <Button type="button" variant="outline" className="px-6">
        Preview
      </Button>
    </div>
  );

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <AdminLayout activeTab={activeTab} onTabChange={setActiveTab}>
      <div className="max-w-2xl mx-auto px-8 py-10">
        {submitted && (
          <div className="mb-6 px-4 py-3 bg-green-50 border border-green-200 rounded-lg text-green-800 text-sm">
            ✓ Saved successfully!
          </div>
        )}

        {/* ── CONCEPTS ──────────────────────────────────────────────────── */}
        {activeTab === "concept" && (
          <>
            <header className="mb-8">
              <h1 className="text-3xl font-bold text-slate-900 mb-1">
                Create Concept
              </h1>
              <p className="text-slate-500">
                Add a new concept to the knowledge base
              </p>
            </header>

            <form onSubmit={handleConceptSubmit} className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  {labelRequired("Title")}
                  <Input
                    value={conceptData.title}
                    onChange={handleConceptTitleChange}
                    placeholder="e.g., API, Docker, Database"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-900 mb-1.5">
                    Slug{" "}
                    <span className="text-slate-400 font-normal text-xs">
                      (auto-generated)
                    </span>
                  </label>
                  <Input
                    value={conceptData.slug}
                    disabled
                    className="bg-slate-50 text-slate-400"
                  />
                </div>
              </div>

              <div>
                {labelRequired("Domain")}
                <DomainSelect
                  value={conceptData.domain}
                  onChange={(v) => setConceptData({ ...conceptData, domain: v })}
                />
              </div>

              <div>
                {labelRequired("Summary")}
                <Textarea
                  name="summary"
                  value={conceptData.summary}
                  onChange={handleConceptInputChange}
                  placeholder="Brief one-line summary"
                  rows={2}
                  required
                />
              </div>

              <div>
                {labelRequired("Definition")}
                <Textarea
                  name="definition"
                  value={conceptData.definition}
                  onChange={handleConceptInputChange}
                  placeholder="Full definition"
                  rows={4}
                  required
                />
              </div>

              <div>
                {labelRequired("Mental Model")}
                <Textarea
                  name="mentalModel"
                  value={conceptData.mentalModel}
                  onChange={handleConceptInputChange}
                  placeholder="Analogy or memorable explanation"
                  rows={3}
                  required
                />
              </div>

              <div>
                {labelRequired("Core Mechanism")}
                <div className="space-y-2 mb-2">
                  {conceptData.mechanism.map((item, i) => (
                    <div key={i} className="flex gap-2">
                      <Input
                        value={item}
                        onChange={(e) =>
                          handleConceptListChange("mechanism", i, e.target.value)
                        }
                        placeholder={`Step ${i + 1}`}
                      />
                      {conceptData.mechanism.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeConceptListItem("mechanism", i)}
                        >
                          <Trash2 size={15} className="text-slate-400" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
                {addLink("Add Step", () => addConceptListItem("mechanism"))}
              </div>

              <div>
                {labelRequired("When to Use")}
                <div className="space-y-2 mb-2">
                  {conceptData.whenToUse.map((item, i) => (
                    <div key={i} className="flex gap-2">
                      <Input
                        value={item}
                        onChange={(e) =>
                          handleConceptListChange("whenToUse", i, e.target.value)
                        }
                        placeholder={`Use case ${i + 1}`}
                      />
                      {conceptData.whenToUse.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeConceptListItem("whenToUse", i)}
                        >
                          <Trash2 size={15} className="text-slate-400" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
                {addLink("Add Use Case", () => addConceptListItem("whenToUse"))}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-900 mb-1.5">
                  Compare
                </label>
                <div className="space-y-2 mb-2">
                  {conceptData.compare.map((item, i) => (
                    <div key={i} className="flex gap-2">
                      <Input
                        value={item.concept}
                        onChange={(e) =>
                          handleCompareChange(i, "concept", e.target.value)
                        }
                        placeholder="Target concept"
                      />
                      <Input
                        value={item.difference}
                        onChange={(e) =>
                          handleCompareChange(i, "difference", e.target.value)
                        }
                        placeholder="Difference"
                      />
                      {conceptData.compare.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeCompareItem(i)}
                        >
                          <Trash2 size={15} className="text-slate-400" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
                {addLink("Add Comparison", addCompareItem)}
              </div>

              {formActions("Save Concept")}
            </form>
          </>
        )}

        {/* ── RELATIONS ─────────────────────────────────────────────────── */}
        {activeTab === "relation" && (
          <>
            <header className="mb-8">
              <h1 className="text-3xl font-bold text-slate-900 mb-1">
                Create Relation
              </h1>
              <p className="text-slate-500">
                Link two concepts together to build the knowledge graph
              </p>
            </header>

            <form onSubmit={handleRelationSubmit} className="space-y-5">
              {/* Horizontal [From] → [Type] → [To] card */}
              <div className="border border-slate-200 rounded-xl p-6">
                <div className="grid grid-cols-[1fr_32px_1fr_32px_1fr] items-end gap-2">
                  <div>
                    {labelRequired("From Concept")}
                    <select
                      name="fromConcept"
                      value={relationData.fromConcept}
                      onChange={handleRelationInputChange}
                      className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm bg-white"
                      required
                    >
                      <option value="">Select a concept</option>
                      {mockConcepts.map((c) => (
                        <option key={c.slug} value={c.slug}>
                          {c.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="pb-2.5 text-center text-slate-400 text-base">
                    →
                  </div>

                  <div>
                    {labelRequired("Type")}
                    <select
                      name="relationType"
                      value={relationData.relationType}
                      onChange={handleRelationInputChange}
                      className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm bg-white"
                    >
                      <option value="used-with">used-with</option>
                      <option value="alternative-to">alternative-to</option>
                      <option value="related-to">related-to</option>
                      <option value="comparison">comparison</option>
                    </select>
                  </div>

                  <div className="pb-2.5 text-center text-slate-400 text-base">
                    →
                  </div>

                  <div>
                    {labelRequired("To Concept")}
                    <select
                      name="toConcept"
                      value={relationData.toConcept}
                      onChange={handleRelationInputChange}
                      className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm bg-white"
                      required
                    >
                      <option value="">Select a concept</option>
                      {mockConcepts.map((c) => (
                        <option key={c.slug} value={c.slug}>
                          {c.title}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div>
                {labelOptional("Description")}
                <Textarea
                  name="description"
                  value={relationData.description}
                  onChange={handleRelationInputChange}
                  placeholder="Add context about this relationship"
                  rows={4}
                />
              </div>

              {formActions("Save Relation")}
            </form>
          </>
        )}

        {/* ── LEARNING LOGS ─────────────────────────────────────────────── */}
        {activeTab === "log" && (
          <>
            <header className="mb-8">
              <h1 className="text-3xl font-bold text-slate-900 mb-1">
                Document Learning
              </h1>
              <p className="text-slate-500">
                Document how your understanding evolved
              </p>
            </header>

            <form onSubmit={handleLogSubmit} className="space-y-5">
              <div>
                {labelRequired("Topic")}
                <Input
                  name="topic"
                  value={logData.topic}
                  onChange={handleLogInputChange}
                  placeholder="e.g., REST API design"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-900 mb-1.5">
                  Related Concepts
                </label>
                <ConceptMultiSelect
                  value={logData.relatedConcepts}
                  onChange={(slugs) =>
                    setLogData({ ...logData, relatedConcepts: slugs })
                  }
                />
              </div>

              {/* Step-by-step sections */}
              {(
                [
                  {
                    key: "trigger" as const,
                    step: "STEP 1: TRIGGER",
                    placeholder: "What sparked this learning?",
                  },
                  {
                    key: "initialUnderstanding" as const,
                    step: "STEP 2: INITIAL UNDERSTANDING",
                    placeholder: "What did you think before?",
                  },
                  {
                    key: "afterLearning" as const,
                    step: "STEP 3: AFTER LEARNING",
                    placeholder: "What did you learn?",
                  },
                  {
                    key: "updatedMentalModel" as const,
                    step: "STEP 4: UPDATED MENTAL MODEL",
                    placeholder: "Your new understanding",
                  },
                ] as const
              ).map(({ key, step, placeholder }, i, arr) => (
                <div key={key}>
                  <div className="border-l-4 border-blue-500 pl-4 py-0.5">
                    <p className="text-[11px] font-bold text-blue-600 tracking-widest uppercase mb-2">
                      {step}
                    </p>
                    <Textarea
                      name={key}
                      value={logData[key]}
                      onChange={handleLogInputChange}
                      placeholder={placeholder}
                      rows={3}
                    />
                  </div>
                  {i < arr.length - 1 && (
                    <div className="flex justify-start pl-4 py-2 text-slate-300 text-lg select-none">
                      ↓
                    </div>
                  )}
                </div>
              ))}

              <div>
                {labelOptional("Open Questions")}
                <div className="space-y-2 mb-2">
                  {logData.openQuestions.map((q, i) => (
                    <div key={i} className="flex gap-2">
                      <Input
                        value={q}
                        onChange={(e) =>
                          handleOpenQuestionChange(i, e.target.value)
                        }
                        placeholder="What are you still curious about?"
                      />
                      {logData.openQuestions.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeOpenQuestion(i)}
                        >
                          <Trash2 size={15} className="text-slate-400" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
                {addLink("Add Question", addOpenQuestion)}
              </div>

              {formActions("Save Learning Log")}
            </form>
          </>
        )}

        {/* ── FLOWS ─────────────────────────────────────────────────────── */}
        {activeTab === "flow" && (
          <>
            <header className="mb-8">
              <h1 className="text-3xl font-bold text-slate-900 mb-1">
                Create Flow
              </h1>
              <p className="text-slate-500">
                Build system thinking flows to visualize how concepts connect
              </p>
            </header>

            <form onSubmit={handleFlowSubmit} className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  {labelRequired("Flow Title")}
                  <Input
                    value={flowData.title}
                    onChange={handleFlowTitleChange}
                    placeholder="e.g., Frontend to Backend Flow"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-900 mb-1.5">
                    Slug{" "}
                    <span className="text-slate-400 font-normal text-xs">
                      (auto-generated)
                    </span>
                  </label>
                  <Input
                    value={flowData.slug}
                    disabled
                    className="bg-slate-50 text-slate-400"
                  />
                </div>
              </div>

              <div>
                {labelRequired("Description")}
                <Textarea
                  name="description"
                  value={flowData.description}
                  onChange={handleFlowInputChange}
                  placeholder="Explain what this flow shows"
                  rows={3}
                  required
                />
              </div>

              <div>
                <h3 className="text-base font-semibold text-slate-900 mb-3">
                  Flow Steps
                </h3>
                <div className="space-y-3">
                  {flowData.steps.map((step, i) => (
                    <div
                      key={step.id}
                      className="border border-slate-200 rounded-xl p-5 bg-slate-50"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <span className="font-semibold text-slate-900 text-sm">
                          Step {i + 1}
                        </span>
                        <div className="flex gap-0.5">
                          {i > 0 && (
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => moveStep(i, "up")}
                            >
                              <ChevronUp size={15} className="text-slate-400" />
                            </Button>
                          )}
                          {i < flowData.steps.length - 1 && (
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => moveStep(i, "down")}
                            >
                              <ChevronDown
                                size={15}
                                className="text-slate-400"
                              />
                            </Button>
                          )}
                          {flowData.steps.length > 1 && (
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removeStep(i)}
                            >
                              <Trash2 size={15} className="text-slate-400" />
                            </Button>
                          )}
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <label className="block text-xs font-medium text-slate-700 mb-1">
                            Title
                          </label>
                          <Input
                            value={step.title}
                            onChange={(e) =>
                              handleStepChange(i, "title", e.target.value)
                            }
                            placeholder="e.g., Call API"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-slate-700 mb-1">
                            Description
                          </label>
                          <Textarea
                            value={step.description}
                            onChange={(e) =>
                              handleStepChange(i, "description", e.target.value)
                            }
                            placeholder="Explain what happens in this step"
                            rows={2}
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-slate-700 mb-1">
                            Related Concepts
                          </label>
                          <ConceptMultiSelect
                            value={step.relatedConcepts}
                            onChange={(v) =>
                              handleStepChange(i, "relatedConcepts", v)
                            }
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-3">
                  {addLink("Add Step", addStep)}
                </div>
              </div>

              {formActions("Save Flow")}
            </form>
          </>
        )}
      </div>
    </AdminLayout>
  );
}
