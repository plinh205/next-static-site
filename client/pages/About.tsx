import Layout from "@/components/Layout";
import { ArrowRight } from "lucide-react";

const ROLES = ["Product Manager", "System Designer", "AI Builder"];

const JOURNEY_CARDS = [
  {
    gradient: "from-blue-100 to-blue-200",
    emoji: "🎨",
    title: "From UX Thinking",
    description: "Started with user-centered design — understanding problems before jumping to solutions.",
    action: "Discover",
  },
  {
    gradient: "from-purple-100 to-purple-200",
    emoji: "🔗",
    title: "To System Design",
    description: "Evolved into systems thinking — seeing how components interact and scale over time.",
    action: "Explore",
  },
  {
    gradient: "from-amber-100 to-amber-200",
    emoji: "⚡",
    title: "To AI-Driven Building",
    description: "Now combining domain knowledge with AI tools to build and ship at unprecedented speed.",
    action: "Build",
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
    <Layout showSidebar={false}>
      {/* Hero Section */}
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-8 py-16">
          <div className="grid grid-cols-2 gap-12 items-center">
            <div>
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-slate-300 to-slate-400 mb-6 flex items-center justify-center">
                <span className="text-4xl font-bold text-white">LP</span>
              </div>
              <h1 className="text-4xl font-bold text-slate-900 mb-2">Linh Pham</h1>
              <p className="text-lg text-slate-600 mb-4">Builder. System Designer. Knowledge Architect.</p>
              <div className="flex flex-wrap gap-2">
                {ROLES.map((role) => (
                  <span key={role} className="px-3 py-1 bg-slate-100 rounded-full text-sm font-medium text-slate-700">
                    {role}
                  </span>
                ))}
              </div>
            </div>
            <div className="bg-slate-50 p-8 rounded-lg border border-slate-200">
              <h2 className="text-2xl font-bold text-slate-900 mb-3">Why this system?</h2>
              <p className="text-slate-700 leading-relaxed">
                I realized that knowledge scattered across notes and documents becomes forgotten. This system
                transforms disconnected ideas into a living, structured knowledge graph that evolves with my
                understanding.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Journey Section */}
      <section className="bg-slate-50 border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-8 py-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">The Journey</h2>
          <p className="text-slate-600 mb-12 max-w-2xl">
            From thinking about user experiences to building systems to leveraging AI for rapid development.
          </p>
          <div className="grid grid-cols-3 gap-6">
            {JOURNEY_CARDS.map((card) => (
              <div
                key={card.title}
                className="bg-white rounded-lg border border-slate-200 overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className={`h-48 bg-gradient-to-br ${card.gradient} flex items-center justify-center`}>
                  <div className="text-6xl">{card.emoji}</div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{card.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-4">{card.description}</p>
                  <div className="flex items-center text-slate-900 font-medium">
                    <span>{card.action}</span>
                    <ArrowRight size={16} className="ml-2" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bio + Skills/Achievements */}
      <section className="bg-white">
        <div className="max-w-4xl mx-auto px-8 py-16">
          <div className="grid grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Bio</h2>
              <p className="text-slate-700 leading-relaxed mb-4">
                I'm a product-minded system designer passionate about creating tools that help people think better...
              </p>
              <p className="text-slate-700 leading-relaxed">
                This Knowledge OS is my personal experiment in documenting, structuring, and sharing what I learn.
              </p>
            </div>
            <div>
              <div className="mb-8">
                <h3 className="text-lg font-bold text-slate-900 mb-3">Key Achievements</h3>
                <ul className="space-y-2">
                  {ACHIEVEMENTS.map((item) => (
                    <li key={item} className="flex gap-2 text-slate-700">
                      <span className="text-blue-600 font-bold">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-3">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {SKILLS.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-slate-100 rounded text-sm font-medium text-slate-700 border border-slate-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-16 p-8 bg-slate-50 rounded-lg border border-slate-200 text-center">
            <h3 className="text-xl font-bold text-slate-900 mb-2">Interested in learning together?</h3>
            <p className="text-slate-600 mb-4">Explore the knowledge base and let me know your thoughts</p>
            <a
              href="/"
              className="inline-block px-6 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors font-medium"
            >
              Browse Knowledge Base
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
}
