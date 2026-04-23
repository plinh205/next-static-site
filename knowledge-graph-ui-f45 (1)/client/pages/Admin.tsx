import { useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { mockConcepts, FlowStep } from "@/lib/mockData";
import { ArrowRight, ChevronUp, ChevronDown, Trash2, Plus } from "lucide-react";
import FlowDiagram from "@/components/FlowDiagram";

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

type AdminTab = "concept" | "relation" | "log" | "flow";

export default function Admin() {
  const [activeTab, setActiveTab] = useState<AdminTab>("concept");
  const [showFlowPreview, setShowFlowPreview] = useState(false);

  // Concept form state
  const [conceptData, setConceptData] = useState<ConceptFormData>({
    title: "",
    slug: "",
    domain: "communication",
    summary: "",
    definition: "",
    mentalModel: "",
    mechanism: [""],
    whenToUse: [""],
    compare: [{ concept: "", difference: "" }],
  });

  // Relation form state
  const [relationData, setRelationData] = useState<RelationFormData>({
    fromConcept: "",
    relationType: "used-with",
    toConcept: "",
    description: "",
  });

  // Learning log form state
  const [logData, setLogData] = useState<LearningLogFormData>({
    topic: "",
    relatedConcepts: [],
    trigger: "",
    initialUnderstanding: "",
    afterLearning: "",
    updatedMentalModel: "",
    openQuestions: [""],
  });

  // Flow form state
  const [flowData, setFlowData] = useState<FlowFormData>({
    title: "",
    slug: "",
    description: "",
    steps: [
      {
        id: "step-1",
        title: "",
        description: "",
        relatedConcepts: [],
      },
    ],
  });

  const [submitted, setSubmitted] = useState<AdminTab | null>(null);

  // ===== CONCEPT FORM HANDLERS =====
  const handleConceptTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setConceptData({
      ...conceptData,
      title,
      slug: title.toLowerCase().replace(/\s+/g, "-"),
    });
  };

  const handleConceptInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setConceptData({ ...conceptData, [name]: value });
  };

  const handleConceptListChange = (
    field: "mechanism" | "whenToUse",
    index: number,
    value: string
  ) => {
    const newList = [...conceptData[field]];
    newList[index] = value;
    setConceptData({ ...conceptData, [field]: newList });
  };

  const addConceptListItem = (field: "mechanism" | "whenToUse") => {
    setConceptData({
      ...conceptData,
      [field]: [...conceptData[field], ""],
    });
  };

  const removeConceptListItem = (field: "mechanism" | "whenToUse", index: number) => {
    setConceptData({
      ...conceptData,
      [field]: conceptData[field].filter((_, i) => i !== index),
    });
  };

  const handleCompareChange = (
    index: number,
    field: "concept" | "difference",
    value: string
  ) => {
    const newCompare = [...conceptData.compare];
    newCompare[index] = { ...newCompare[index], [field]: value };
    setConceptData({ ...conceptData, compare: newCompare });
  };

  const addCompareItem = () => {
    setConceptData({
      ...conceptData,
      compare: [...conceptData.compare, { concept: "", difference: "" }],
    });
  };

  const removeCompareItem = (index: number) => {
    setConceptData({
      ...conceptData,
      compare: conceptData.compare.filter((_, i) => i !== index),
    });
  };

  // ===== RELATION FORM HANDLERS =====
  const handleRelationInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setRelationData({ ...relationData, [name]: value });
  };

  // ===== LEARNING LOG FORM HANDLERS =====
  const handleLogInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setLogData({ ...logData, [name]: value });
  };

  const handleConceptSelect = (concept: string) => {
    setLogData({
      ...logData,
      relatedConcepts: logData.relatedConcepts.includes(concept)
        ? logData.relatedConcepts.filter((c) => c !== concept)
        : [...logData.relatedConcepts, concept],
    });
  };

  const handleOpenQuestionChange = (index: number, value: string) => {
    const newQuestions = [...logData.openQuestions];
    newQuestions[index] = value;
    setLogData({ ...logData, openQuestions: newQuestions });
  };

  const addOpenQuestion = () => {
    setLogData({
      ...logData,
      openQuestions: [...logData.openQuestions, ""],
    });
  };

  const removeOpenQuestion = (index: number) => {
    setLogData({
      ...logData,
      openQuestions: logData.openQuestions.filter((_, i) => i !== index),
    });
  };

  // ===== FLOW FORM HANDLERS =====
  const handleFlowTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setFlowData({
      ...flowData,
      title,
      slug: title.toLowerCase().replace(/\s+/g, "-"),
    });
  };

  const handleFlowInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFlowData({ ...flowData, [name]: value });
  };

  const handleStepChange = (stepIndex: number, field: string, value: any) => {
    const newSteps = [...flowData.steps];
    newSteps[stepIndex] = { ...newSteps[stepIndex], [field]: value };
    setFlowData({ ...flowData, steps: newSteps });
  };

  const handleStepConceptChange = (stepIndex: number, concept: string) => {
    const newSteps = [...flowData.steps];
    const concepts = newSteps[stepIndex].relatedConcepts;
    newSteps[stepIndex].relatedConcepts = concepts.includes(concept)
      ? concepts.filter((c) => c !== concept)
      : [...concepts, concept];
    setFlowData({ ...flowData, steps: newSteps });
  };

  const addStep = () => {
    const newStepId = `step-${Date.now()}`;
    setFlowData({
      ...flowData,
      steps: [
        ...flowData.steps,
        {
          id: newStepId,
          title: "",
          description: "",
          relatedConcepts: [],
        },
      ],
    });
  };

  const removeStep = (stepIndex: number) => {
    setFlowData({
      ...flowData,
      steps: flowData.steps.filter((_, i) => i !== stepIndex),
    });
  };

  const moveStep = (stepIndex: number, direction: "up" | "down") => {
    const newSteps = [...flowData.steps];
    const targetIndex = direction === "up" ? stepIndex - 1 : stepIndex + 1;
    if (targetIndex >= 0 && targetIndex < newSteps.length) {
      [newSteps[stepIndex], newSteps[targetIndex]] = [
        newSteps[targetIndex],
        newSteps[stepIndex],
      ];
      setFlowData({ ...flowData, steps: newSteps });
    }
  };

  const addBranch = (stepIndex: number) => {
    const newSteps = [...flowData.steps];
    const newBranchId = `branch-${Date.now()}`;
    if (!newSteps[stepIndex].children) {
      newSteps[stepIndex].children = [];
    }
    newSteps[stepIndex].children!.push({
      id: newBranchId,
      title: "",
      description: "",
      relatedConcepts: [],
    });
    setFlowData({ ...flowData, steps: newSteps });
  };

  const removeBranch = (stepIndex: number, branchIndex: number) => {
    const newSteps = [...flowData.steps];
    newSteps[stepIndex].children = newSteps[stepIndex].children?.filter(
      (_, i) => i !== branchIndex
    );
    setFlowData({ ...flowData, steps: newSteps });
  };

  const handleBranchChange = (
    stepIndex: number,
    branchIndex: number,
    field: string,
    value: any
  ) => {
    const newSteps = [...flowData.steps];
    if (newSteps[stepIndex].children) {
      newSteps[stepIndex].children![branchIndex] = {
        ...newSteps[stepIndex].children![branchIndex],
        [field]: value,
      };
    }
    setFlowData({ ...flowData, steps: newSteps });
  };

  const handleBranchConceptChange = (
    stepIndex: number,
    branchIndex: number,
    concept: string
  ) => {
    const newSteps = [...flowData.steps];
    if (newSteps[stepIndex].children) {
      const concepts = newSteps[stepIndex].children![branchIndex].relatedConcepts;
      newSteps[stepIndex].children![branchIndex].relatedConcepts = concepts.includes(
        concept
      )
        ? concepts.filter((c) => c !== concept)
        : [...concepts, concept];
    }
    setFlowData({ ...flowData, steps: newSteps });
  };

  // ===== SUBMIT HANDLERS =====
  const handleConceptSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting concept:", conceptData);
    setSubmitted("concept");
    setTimeout(() => setSubmitted(null), 3000);
  };

  const handleRelationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting relation:", relationData);
    setSubmitted("relation");
    setTimeout(() => setSubmitted(null), 3000);
  };

  const handleLogSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting learning log:", logData);
    setSubmitted("log");
    setTimeout(() => setSubmitted(null), 3000);
  };

  const handleFlowSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting flow:", flowData);
    setSubmitted("flow");
    setTimeout(() => setSubmitted(null), 3000);
  };

  return (
    <Layout showSidebar={false}>
      <div className="flex h-full">
        {/* Left Sidebar Navigation */}
        <aside className="w-56 border-r border-slate-200 bg-slate-50 p-6 flex flex-col">
          <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">
            Admin
          </h2>
          <nav className="space-y-2 flex-1">
            <button
              onClick={() => setActiveTab("concept")}
              className={`w-full text-left px-4 py-2 rounded font-medium transition-colors ${
                activeTab === "concept"
                  ? "bg-slate-900 text-white"
                  : "text-slate-700 hover:bg-slate-200"
              }`}
            >
              Concepts
            </button>
            <button
              onClick={() => setActiveTab("relation")}
              className={`w-full text-left px-4 py-2 rounded font-medium transition-colors ${
                activeTab === "relation"
                  ? "bg-slate-900 text-white"
                  : "text-slate-700 hover:bg-slate-200"
              }`}
            >
              Relations
            </button>
            <button
              onClick={() => setActiveTab("log")}
              className={`w-full text-left px-4 py-2 rounded font-medium transition-colors ${
                activeTab === "log"
                  ? "bg-slate-900 text-white"
                  : "text-slate-700 hover:bg-slate-200"
              }`}
            >
              Learning Logs
            </button>
            <button
              onClick={() => {
                setActiveTab("flow");
                setShowFlowPreview(false);
              }}
              className={`w-full text-left px-4 py-2 rounded font-medium transition-colors ${
                activeTab === "flow"
                  ? "bg-slate-900 text-white"
                  : "text-slate-700 hover:bg-slate-200"
              }`}
            >
              Flows
            </button>
          </nav>
          <div className="text-xs text-slate-500 pt-4 border-t border-slate-200">
            <p>Knowledge Graph Admin</p>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          <div className="max-w-4xl mx-auto px-8 py-8">
            {/* ===== FLOW FORM ===== */}
            {activeTab === "flow" && !showFlowPreview && (
              <>
                <div className="mb-8">
                  <h1 className="text-3xl font-bold text-slate-900 mb-2">
                    Create Flow
                  </h1>
                  <p className="text-slate-600">
                    Build system thinking flows to visualize how concepts connect
                  </p>
                </div>

                <form onSubmit={handleFlowSubmit} className="space-y-8">
                  {/* Title & Slug */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-slate-900 mb-2">
                        Flow Title *
                      </label>
                      <Input
                        type="text"
                        value={flowData.title}
                        onChange={handleFlowTitleChange}
                        placeholder="e.g., Frontend to Backend Flow"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-900 mb-2">
                        Slug (auto-generated)
                      </label>
                      <Input
                        type="text"
                        value={flowData.slug}
                        disabled
                        className="bg-slate-100"
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">
                      Description *
                    </label>
                    <textarea
                      name="description"
                      value={flowData.description}
                      onChange={handleFlowInputChange}
                      placeholder="Explain what this flow shows"
                      rows={2}
                      className="w-full border border-slate-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-900"
                      required
                    />
                  </div>

                  {/* Flow Steps */}
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-4">
                      Flow Steps
                    </h3>
                    <div className="space-y-6">
                      {flowData.steps.map((step, stepIndex) => (
                        <div
                          key={step.id}
                          className="border-2 border-slate-300 rounded-lg p-6 bg-slate-50"
                        >
                          {/* Step Header */}
                          <div className="flex items-center justify-between mb-4">
                            <h4 className="font-semibold text-slate-900">
                              Step {stepIndex + 1}
                            </h4>
                            <div className="flex gap-2">
                              {stepIndex > 0 && (
                                <button
                                  type="button"
                                  onClick={() => moveStep(stepIndex, "up")}
                                  className="p-2 hover:bg-slate-200 rounded transition-colors"
                                  title="Move up"
                                >
                                  <ChevronUp size={18} className="text-slate-600" />
                                </button>
                              )}
                              {stepIndex < flowData.steps.length - 1 && (
                                <button
                                  type="button"
                                  onClick={() => moveStep(stepIndex, "down")}
                                  className="p-2 hover:bg-slate-200 rounded transition-colors"
                                  title="Move down"
                                >
                                  <ChevronDown size={18} className="text-slate-600" />
                                </button>
                              )}
                              {flowData.steps.length > 1 && (
                                <button
                                  type="button"
                                  onClick={() => removeStep(stepIndex)}
                                  className="p-2 hover:bg-red-50 text-red-600 rounded transition-colors"
                                  title="Delete step"
                                >
                                  <Trash2 size={18} />
                                </button>
                              )}
                            </div>
                          </div>

                          {/* Step Title */}
                          <div className="mb-3">
                            <label className="block text-sm font-semibold text-slate-900 mb-1">
                              Title
                            </label>
                            <Input
                              type="text"
                              value={step.title}
                              onChange={(e) =>
                                handleStepChange(stepIndex, "title", e.target.value)
                              }
                              placeholder="e.g., Call API"
                            />
                          </div>

                          {/* Step Description */}
                          <div className="mb-3">
                            <label className="block text-sm font-semibold text-slate-900 mb-1">
                              Description
                            </label>
                            <textarea
                              value={step.description}
                              onChange={(e) =>
                                handleStepChange(stepIndex, "description", e.target.value)
                              }
                              placeholder="Explain what happens in this step"
                              rows={2}
                              className="w-full border border-slate-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-900"
                            />
                          </div>

                          {/* Related Concepts */}
                          <div className="mb-4">
                            <label className="block text-sm font-semibold text-slate-900 mb-2">
                              Related Concepts
                            </label>
                            <div className="flex flex-wrap gap-2">
                              {mockConcepts.slice(0, 6).map((concept) => (
                                <button
                                  key={concept.slug}
                                  type="button"
                                  onClick={() => handleStepConceptChange(stepIndex, concept.slug)}
                                  className={`px-3 py-1 rounded-full text-sm transition-colors ${
                                    step.relatedConcepts.includes(concept.slug)
                                      ? "bg-blue-600 text-white"
                                      : "bg-slate-200 text-slate-700 hover:bg-slate-300"
                                  }`}
                                >
                                  {concept.title}
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* Branches */}
                          {step.children && step.children.length > 0 && (
                            <div className="mt-4 pl-4 border-l-2 border-slate-300 space-y-3">
                              <p className="text-sm font-semibold text-slate-700">
                                Branches
                              </p>
                              {step.children.map((branch, branchIndex) => (
                                <div
                                  key={branch.id}
                                  className="bg-white p-3 rounded border border-slate-200"
                                >
                                  <div className="flex justify-between items-start mb-2">
                                    <p className="text-sm font-semibold text-slate-700">
                                      Branch {branchIndex + 1}
                                    </p>
                                    {step.children!.length > 1 && (
                                      <button
                                        type="button"
                                        onClick={() => removeBranch(stepIndex, branchIndex)}
                                        className="text-red-600 hover:bg-red-50 p-1 rounded"
                                      >
                                        <Trash2 size={14} />
                                      </button>
                                    )}
                                  </div>

                                  <Input
                                    type="text"
                                    value={branch.title}
                                    onChange={(e) =>
                                      handleBranchChange(
                                        stepIndex,
                                        branchIndex,
                                        "title",
                                        e.target.value
                                      )
                                    }
                                    placeholder="Branch title (e.g., REST API)"
                                    className="mb-2 text-sm"
                                  />

                                  <textarea
                                    value={branch.description}
                                    onChange={(e) =>
                                      handleBranchChange(
                                        stepIndex,
                                        branchIndex,
                                        "description",
                                        e.target.value
                                      )
                                    }
                                    placeholder="Branch description"
                                    rows={1}
                                    className="w-full border border-slate-200 rounded-md px-2 py-1 text-sm mb-2 focus:outline-none focus:ring-2 focus:ring-slate-900"
                                  />

                                  <div className="flex flex-wrap gap-1">
                                    {mockConcepts.slice(0, 3).map((concept) => (
                                      <button
                                        key={concept.slug}
                                        type="button"
                                        onClick={() =>
                                          handleBranchConceptChange(
                                            stepIndex,
                                            branchIndex,
                                            concept.slug
                                          )
                                        }
                                        className={`px-2 py-0.5 rounded text-xs transition-colors ${
                                          branch.relatedConcepts.includes(concept.slug)
                                            ? "bg-blue-500 text-white"
                                            : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                                        }`}
                                      >
                                        {concept.title}
                                      </button>
                                    ))}
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}

                          {/* Add Branch Button */}
                          <button
                            type="button"
                            onClick={() => addBranch(stepIndex)}
                            className="mt-4 text-sm text-blue-600 hover:text-blue-900 font-medium flex items-center gap-1"
                          >
                            <Plus size={14} /> Add Branch
                          </button>
                        </div>
                      ))}
                    </div>

                    {/* Add Step Button */}
                    <button
                      type="button"
                      onClick={addStep}
                      className="mt-4 text-sm text-blue-600 hover:text-blue-900 font-medium flex items-center gap-1"
                    >
                      <Plus size={14} /> Add Step
                    </button>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-4 pt-4">
                    <Button
                      type="submit"
                      className="bg-slate-900 text-white hover:bg-slate-800"
                    >
                      Save Flow
                    </Button>
                    <button
                      type="button"
                      onClick={() => setShowFlowPreview(true)}
                      className="px-4 py-2 border border-slate-200 rounded-md hover:bg-slate-50 transition-colors font-medium"
                    >
                      Preview
                    </button>
                  </div>

                  {submitted === "flow" && (
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-900">
                      ✓ Flow saved successfully!
                    </div>
                  )}
                </form>
              </>
            )}

            {/* ===== FLOW PREVIEW ===== */}
            {activeTab === "flow" && showFlowPreview && (
              <>
                <div className="mb-8">
                  <button
                    onClick={() => setShowFlowPreview(false)}
                    className="text-slate-600 hover:text-slate-900 mb-4 flex items-center gap-1"
                  >
                    ← Back to Edit
                  </button>
                  <h1 className="text-3xl font-bold text-slate-900 mb-2">
                    {flowData.title}
                  </h1>
                  <p className="text-slate-600">{flowData.description}</p>
                </div>

                <div className="bg-slate-50 rounded-lg border border-slate-200 p-8">
                  <FlowDiagram steps={flowData.steps} />
                </div>

                <div className="mt-8 flex gap-4">
                  <button
                    onClick={() => setShowFlowPreview(false)}
                    className="px-4 py-2 border border-slate-200 rounded-md hover:bg-slate-50 transition-colors font-medium"
                  >
                    Back to Edit
                  </button>
                  <Button
                    type="button"
                    className="bg-slate-900 text-white hover:bg-slate-800"
                    onClick={handleFlowSubmit}
                  >
                    Save Flow
                  </Button>
                </div>
              </>
            )}

            {/* ===== OTHER FORMS (EXISTING) ===== */}
            {activeTab === "concept" && (
              <>
                <div className="mb-8">
                  <h1 className="text-3xl font-bold text-slate-900 mb-2">
                    Create Concept
                  </h1>
                  <p className="text-slate-600">
                    Add a new concept to the knowledge base
                  </p>
                </div>

                <form onSubmit={handleConceptSubmit} className="space-y-8">
                  {/* Title & Slug */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-slate-900 mb-2">
                        Title *
                      </label>
                      <Input
                        type="text"
                        value={conceptData.title}
                        onChange={handleConceptTitleChange}
                        placeholder="e.g., API, Docker, Database"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-900 mb-2">
                        Slug (auto-generated)
                      </label>
                      <Input
                        type="text"
                        value={conceptData.slug}
                        disabled
                        className="bg-slate-100"
                      />
                    </div>
                  </div>

                  {/* Domain */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">
                      Domain *
                    </label>
                    <select
                      name="domain"
                      value={conceptData.domain}
                      onChange={handleConceptInputChange}
                      className="w-full border border-slate-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-900"
                    >
                      <option value="communication">System Design - Communication</option>
                      <option value="infrastructure">System Design - Infrastructure</option>
                    </select>
                  </div>

                  {/* Summary */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">
                      Summary *
                    </label>
                    <textarea
                      name="summary"
                      value={conceptData.summary}
                      onChange={handleConceptInputChange}
                      placeholder="Brief one-line summary"
                      rows={2}
                      className="w-full border border-slate-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-900"
                      required
                    />
                  </div>

                  {/* Definition */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">
                      Definition *
                    </label>
                    <textarea
                      name="definition"
                      value={conceptData.definition}
                      onChange={handleConceptInputChange}
                      placeholder="Full definition"
                      rows={3}
                      className="w-full border border-slate-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-900"
                      required
                    />
                  </div>

                  {/* Mental Model */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">
                      Mental Model *
                    </label>
                    <textarea
                      name="mentalModel"
                      value={conceptData.mentalModel}
                      onChange={handleConceptInputChange}
                      placeholder="Analogy or memorable explanation"
                      rows={3}
                      className="w-full border border-slate-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-900"
                      required
                    />
                  </div>

                  {/* Core Mechanism */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">
                      Core Mechanism *
                    </label>
                    <div className="space-y-2">
                      {conceptData.mechanism.map((item, idx) => (
                        <div key={idx} className="flex gap-2">
                          <Input
                            type="text"
                            value={item}
                            onChange={(e) =>
                              handleConceptListChange("mechanism", idx, e.target.value)
                            }
                            placeholder={`Step ${idx + 1}`}
                          />
                          {conceptData.mechanism.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeConceptListItem("mechanism", idx)}
                              className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                            >
                              Remove
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                    <button
                      type="button"
                      onClick={() => addConceptListItem("mechanism")}
                      className="mt-2 text-sm text-slate-600 hover:text-slate-900 font-medium"
                    >
                      + Add Step
                    </button>
                  </div>

                  {/* When to Use */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">
                      When to Use *
                    </label>
                    <div className="space-y-2">
                      {conceptData.whenToUse.map((item, idx) => (
                        <div key={idx} className="flex gap-2">
                          <Input
                            type="text"
                            value={item}
                            onChange={(e) =>
                              handleConceptListChange("whenToUse", idx, e.target.value)
                            }
                            placeholder={`Use case ${idx + 1}`}
                          />
                          {conceptData.whenToUse.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeConceptListItem("whenToUse", idx)}
                              className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                            >
                              Remove
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                    <button
                      type="button"
                      onClick={() => addConceptListItem("whenToUse")}
                      className="mt-2 text-sm text-slate-600 hover:text-slate-900 font-medium"
                    >
                      + Add Use Case
                    </button>
                  </div>

                  {/* Compare */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">
                      Compare
                    </label>
                    <div className="space-y-3">
                      {conceptData.compare.map((item, idx) => (
                        <div key={idx} className="flex gap-2">
                          <Input
                            type="text"
                            value={item.concept}
                            onChange={(e) =>
                              handleCompareChange(idx, "concept", e.target.value)
                            }
                            placeholder="Target concept"
                          />
                          <Input
                            type="text"
                            value={item.difference}
                            onChange={(e) =>
                              handleCompareChange(idx, "difference", e.target.value)
                            }
                            placeholder="Difference"
                          />
                          {conceptData.compare.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeCompareItem(idx)}
                              className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                            >
                              Remove
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                    <button
                      type="button"
                      onClick={addCompareItem}
                      className="mt-2 text-sm text-slate-600 hover:text-slate-900 font-medium"
                    >
                      + Add Comparison
                    </button>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-4 pt-4">
                    <Button
                      type="submit"
                      className="bg-slate-900 text-white hover:bg-slate-800"
                    >
                      Save Concept
                    </Button>
                    <Button type="button" variant="outline" className="border-slate-200">
                      Preview
                    </Button>
                  </div>

                  {submitted === "concept" && (
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-900">
                      ✓ Concept saved successfully!
                    </div>
                  )}
                </form>
              </>
            )}

            {activeTab === "relation" && (
              <>
                <div className="mb-8">
                  <h1 className="text-3xl font-bold text-slate-900 mb-2">
                    Create Relation
                  </h1>
                  <p className="text-slate-600">
                    Link two concepts together to build the knowledge graph
                  </p>
                </div>

                <form onSubmit={handleRelationSubmit} className="space-y-8">
                  {/* Horizontal Relation Flow */}
                  <div className="bg-slate-50 p-8 rounded-lg border border-slate-200">
                    <div className="flex items-end gap-4">
                      {/* From Concept */}
                      <div className="flex-1">
                        <label className="block text-sm font-semibold text-slate-900 mb-2">
                          From Concept *
                        </label>
                        <select
                          name="fromConcept"
                          value={relationData.fromConcept}
                          onChange={handleRelationInputChange}
                          className="w-full border border-slate-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-900"
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

                      {/* Arrow */}
                      <div className="pb-2">
                        <ArrowRight size={24} className="text-slate-400" />
                      </div>

                      {/* Relation Type */}
                      <div className="flex-1">
                        <label className="block text-sm font-semibold text-slate-900 mb-2">
                          Type *
                        </label>
                        <select
                          name="relationType"
                          value={relationData.relationType}
                          onChange={handleRelationInputChange}
                          className="w-full border border-slate-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-900"
                        >
                          <option value="is-a">is-a</option>
                          <option value="part-of">part-of</option>
                          <option value="depends-on">depends-on</option>
                          <option value="used-with">used-with</option>
                          <option value="alternative-to">alternative-to</option>
                        </select>
                      </div>

                      {/* Arrow */}
                      <div className="pb-2">
                        <ArrowRight size={24} className="text-slate-400" />
                      </div>

                      {/* To Concept */}
                      <div className="flex-1">
                        <label className="block text-sm font-semibold text-slate-900 mb-2">
                          To Concept *
                        </label>
                        <select
                          name="toConcept"
                          value={relationData.toConcept}
                          onChange={handleRelationInputChange}
                          className="w-full border border-slate-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-900"
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

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">
                      Description (optional)
                    </label>
                    <textarea
                      name="description"
                      value={relationData.description}
                      onChange={handleRelationInputChange}
                      placeholder="Add context about this relationship"
                      rows={4}
                      className="w-full border border-slate-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-900"
                    />
                  </div>

                  {/* Actions */}
                  <div className="flex gap-4 pt-4">
                    <Button
                      type="submit"
                      className="bg-slate-900 text-white hover:bg-slate-800"
                    >
                      Save Relation
                    </Button>
                    <Button type="button" variant="outline" className="border-slate-200">
                      Preview
                    </Button>
                  </div>

                  {submitted === "relation" && (
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-900">
                      ✓ Relation saved successfully!
                    </div>
                  )}
                </form>
              </>
            )}

            {activeTab === "log" && (
              <>
                <div className="mb-8">
                  <h1 className="text-3xl font-bold text-slate-900 mb-2">
                    Create Learning Log
                  </h1>
                  <p className="text-slate-600">
                    Document how your understanding evolved
                  </p>
                </div>

                <form onSubmit={handleLogSubmit} className="space-y-8">
                  {/* Topic & Concepts */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-slate-900 mb-2">
                        Topic *
                      </label>
                      <Input
                        type="text"
                        name="topic"
                        value={logData.topic}
                        onChange={handleLogInputChange}
                        placeholder="e.g., REST API design"
                        required
                      />
                    </div>
                  </div>

                  {/* Related Concepts */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-3">
                      Related Concepts
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {mockConcepts.slice(0, 6).map((concept) => (
                        <button
                          key={concept.slug}
                          type="button"
                          onClick={() => handleConceptSelect(concept.slug)}
                          className={`text-left px-3 py-2 rounded border transition-colors ${
                            logData.relatedConcepts.includes(concept.slug)
                              ? "bg-slate-900 text-white border-slate-900"
                              : "bg-white border-slate-200 text-slate-700 hover:border-slate-400"
                          }`}
                        >
                          {concept.title}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Understanding Flow */}
                  <div className="border-l-4 border-blue-500 pl-6 space-y-6">
                    {/* Trigger */}
                    <div>
                      <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-2">
                        Step 1: Trigger
                      </p>
                      <textarea
                        name="trigger"
                        value={logData.trigger}
                        onChange={handleLogInputChange}
                        placeholder="What sparked this learning?"
                        rows={2}
                        className="w-full border border-slate-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-900"
                        required
                      />
                    </div>

                    {/* Separator */}
                    <div className="flex items-center gap-2 text-slate-400 -ml-6 pl-6">
                      <span>↓</span>
                    </div>

                    {/* Initial Understanding */}
                    <div>
                      <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-2">
                        Step 2: Initial Understanding
                      </p>
                      <textarea
                        name="initialUnderstanding"
                        value={logData.initialUnderstanding}
                        onChange={handleLogInputChange}
                        placeholder="What did you think before?"
                        rows={2}
                        className="w-full border border-slate-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-900"
                        required
                      />
                    </div>

                    {/* Separator */}
                    <div className="flex items-center gap-2 text-slate-400 -ml-6 pl-6">
                      <span>↓</span>
                    </div>

                    {/* After Learning */}
                    <div>
                      <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-2">
                        Step 3: After Learning
                      </p>
                      <textarea
                        name="afterLearning"
                        value={logData.afterLearning}
                        onChange={handleLogInputChange}
                        placeholder="What did you learn?"
                        rows={2}
                        className="w-full border border-slate-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-900"
                        required
                      />
                    </div>

                    {/* Separator */}
                    <div className="flex items-center gap-2 text-slate-400 -ml-6 pl-6">
                      <span>↓</span>
                    </div>

                    {/* Updated Mental Model */}
                    <div>
                      <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-2">
                        Step 4: Updated Mental Model
                      </p>
                      <textarea
                        name="updatedMentalModel"
                        value={logData.updatedMentalModel}
                        onChange={handleLogInputChange}
                        placeholder="Your new understanding"
                        rows={2}
                        className="w-full border border-slate-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-900"
                        required
                      />
                    </div>
                  </div>

                  {/* Open Questions */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">
                      Open Questions (optional)
                    </label>
                    <div className="space-y-2">
                      {logData.openQuestions.map((question, idx) => (
                        <div key={idx} className="flex gap-2">
                          <Input
                            type="text"
                            value={question}
                            onChange={(e) =>
                              handleOpenQuestionChange(idx, e.target.value)
                            }
                            placeholder="What are you still curious about?"
                          />
                          {logData.openQuestions.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeOpenQuestion(idx)}
                              className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                            >
                              Remove
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                    <button
                      type="button"
                      onClick={addOpenQuestion}
                      className="mt-2 text-sm text-slate-600 hover:text-slate-900 font-medium"
                    >
                      + Add Question
                    </button>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-4 pt-4">
                    <Button
                      type="submit"
                      className="bg-slate-900 text-white hover:bg-slate-800"
                    >
                      Save Learning Log
                    </Button>
                    <Button type="button" variant="outline" className="border-slate-200">
                      Preview
                    </Button>
                  </div>

                  {submitted === "log" && (
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-900">
                      ✓ Learning log saved successfully!
                    </div>
                  )}
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
