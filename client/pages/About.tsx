import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import {
  Lightbulb,
  Layers,
  Bot,
  ArrowRight,
} from "lucide-react";

const ROLES = ["Product Manager", "System Designer", "AI Builder"];

const JOURNEY_CARDS = [
  {
    icon: Lightbulb,
    color: "bg-amber-50 border-amber-200 text-amber-600",
    iconBg: "bg-amber-100",
    phase: "From",
    label: "UX Thinking",
    description:
      "Started with user-centered design — understanding problems before jumping to solutions.",
  },
  {
    icon: Layers,
    color: "bg-blue-50 border-blue-200 text-blue-600",
    iconBg: "bg-blue-100",
    phase: "To",
    label: "System Design",
    description:
      "Evolved into systems thinking — seeing how components interact and scale over time.",
  },
  {
    icon: Bot,
    color: "bg-violet-50 border-violet-200 text-violet-600",
    iconBg: "bg-violet-100",
    phase: "To",
    label: "AI-Driven Building",
    description:
      "Now combining domain knowledge with AI tools to build and ship at unprecedented speed.",
  },
];

const ACHIEVEMENTS = [
  "Built a personal knowledge OS from scratch",
  "Designed end-to-end flows for 10+ product systems",
  "Connected 100+ concepts across domains into a coherent graph",
  "Shipped AI-assisted features across multiple product lines",
];

const SKILLS = [
  "Systems Thinking",
  "Mental Models",
  "Product Strategy",
  "UX Research",
  "AI Tooling",
  "Knowledge Graphs",
  "Flow Design",
  "First Principles",
];

export default function About() {
  return (
    <Layout>
      <div className="max-w-3xl mx-auto px-8 py-14 space-y-12">
        {/* Profile card */}
        <div className="flex items-start gap-6">
          <div className="w-20 h-20 rounded-2xl bg-slate-900 flex items-center justify-center flex-shrink-0">
            <span className="text-white font-bold text-2xl tracking-tight">LP</span>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-900 leading-tight">
              Linh Pham
            </h1>
            <p className="text-slate-500 mt-1 text-base">
              Builder. System Designer. Knowledge Architect.
            </p>
            <div className="flex flex-wrap gap-2 mt-3">
              {ROLES.map((role) => (
                <span
                  key={role}
                  className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-medium"
                >
                  {role}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Why this system */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
          <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-3">
            Why this system?
          </h2>
          <p className="text-slate-700 leading-relaxed">
            Knowledge decays when it lives only in your head. This OS is how I capture, connect,
            and revisit what I learn — turning scattered notes into a structured graph of mental
            models I can actually use.
          </p>
        </div>

        {/* The Journey */}
        <div>
          <h2 className="text-xl font-bold text-slate-900 mb-5">The Journey</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {JOURNEY_CARDS.map((card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.label}
                  className={`border rounded-xl p-5 ${card.color}`}
                >
                  <div className={`w-9 h-9 rounded-lg ${card.iconBg} flex items-center justify-center mb-3`}>
                    <Icon size={18} />
                  </div>
                  <p className="text-xs font-semibold uppercase tracking-widest opacity-60 mb-0.5">
                    {card.phase}
                  </p>
                  <p className="font-bold text-slate-900 text-sm mb-2">{card.label}</p>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {card.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Key Achievements */}
        <div>
          <h2 className="text-xl font-bold text-slate-900 mb-4">Key Achievements</h2>
          <ul className="space-y-3">
            {ACHIEVEMENTS.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-slate-900 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-white" />
                </div>
                <span className="text-slate-700 text-sm leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Skills */}
        <div>
          <h2 className="text-xl font-bold text-slate-900 mb-4">Skills & Domains</h2>
          <div className="flex flex-wrap gap-2">
            {SKILLS.map((skill) => (
              <span
                key={skill}
                className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 text-sm font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="border-t border-slate-200 pt-8 flex items-center justify-between">
          <p className="text-slate-500 text-sm">
            Ready to explore the knowledge graph?
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-slate-900 text-white text-sm font-semibold hover:bg-slate-700 transition-colors"
          >
            Browse Knowledge Base
            <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </Layout>
  );
}
