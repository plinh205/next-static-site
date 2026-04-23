import Layout from "@/components/Layout";
import { ArrowRight } from "lucide-react";

export default function About() {
  return (
    <Layout showSidebar={false}>
      {/* Hero Section */}
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-8 py-16">
          <div className="grid grid-cols-2 gap-12 items-center">
            {/* Avatar & Info */}
            <div>
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-slate-300 to-slate-400 mb-6 flex items-center justify-center">
                <span className="text-4xl font-bold text-white">LP</span>
              </div>
              <h1 className="text-4xl font-bold text-slate-900 mb-2">
                Linh Pham
              </h1>
              <p className="text-lg text-slate-600 mb-4">
                Builder. System Designer. Knowledge Architect.
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-slate-100 rounded-full text-sm font-medium text-slate-700">
                  Product Manager
                </span>
                <span className="px-3 py-1 bg-slate-100 rounded-full text-sm font-medium text-slate-700">
                  System Designer
                </span>
                <span className="px-3 py-1 bg-slate-100 rounded-full text-sm font-medium text-slate-700">
                  AI Builder
                </span>
              </div>
            </div>

            {/* Story Preview */}
            <div className="bg-slate-50 p-8 rounded-lg border border-slate-200">
              <h2 className="text-2xl font-bold text-slate-900 mb-3">
                Why this system?
              </h2>
              <p className="text-slate-700 leading-relaxed">
                I realized that knowledge scattered across notes and documents
                becomes forgotten. This system transforms disconnected ideas
                into a living, structured knowledge graph that evolves with my
                understanding.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Journey Cards */}
      <section className="bg-slate-50 border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-8 py-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">The Journey</h2>
          <p className="text-slate-600 mb-12 max-w-2xl">
            From thinking about user experiences to building systems to leveraging
            AI for rapid development.
          </p>

          {/* Three Cards */}
          <div className="grid grid-cols-3 gap-6">
            {/* Card 1: UX Thinking */}
            <div className="bg-white rounded-lg border border-slate-200 overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                <div className="text-6xl">🎨</div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  From UX Thinking
                </h3>
                <p className="text-sm text-slate-600 mb-4">
                  User-centered design and understanding how knowledge workers
                  learn. Focus on clarity and navigation.
                </p>
                <div className="flex items-center text-slate-900 font-medium">
                  <span>Discover</span>
                  <ArrowRight size={16} className="ml-2" />
                </div>
              </div>
            </div>

            {/* Card 2: System Thinking */}
            <div className="bg-white rounded-lg border border-slate-200 overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center">
                <div className="text-6xl">🔗</div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  To System Design
                </h3>
                <p className="text-sm text-slate-600 mb-4">
                  Structured data, relationships, and evolving mental models.
                  Knowledge as a graph, not a collection.
                </p>
                <div className="flex items-center text-slate-900 font-medium">
                  <span>Explore</span>
                  <ArrowRight size={16} className="ml-2" />
                </div>
              </div>
            </div>

            {/* Card 3: AI Builder */}
            <div className="bg-white rounded-lg border border-slate-200 overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center">
                <div className="text-6xl">⚡</div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  To AI-Driven Building
                </h3>
                <p className="text-sm text-slate-600 mb-4">
                  Prompt-driven development. AI assists in generating content,
                  maintaining consistency, and accelerating creation.
                </p>
                <div className="flex items-center text-slate-900 font-medium">
                  <span>Build</span>
                  <ArrowRight size={16} className="ml-2" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Personal Info Section */}
      <section className="bg-white">
        <div className="max-w-4xl mx-auto px-8 py-16">
          <div className="grid grid-cols-2 gap-12">
            {/* Bio */}
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Bio</h2>
              <p className="text-slate-700 leading-relaxed mb-4">
                I'm a product-minded system designer passionate about creating
                tools that help people think better. With experience in product
                management, system architecture, and AI-driven development, I
                believe the future is about amplifying human thinking.
              </p>
              <p className="text-slate-700 leading-relaxed">
                This Knowledge OS is my personal experiment in documenting,
                structuring, and sharing what I learn.
              </p>
            </div>

            {/* Skills & Achievements */}
            <div>
              <div className="mb-8">
                <h3 className="text-lg font-bold text-slate-900 mb-3">
                  Key Achievements
                </h3>
                <ul className="space-y-2">
                  <li className="flex gap-2 text-slate-700">
                    <span className="text-blue-600 font-bold">✓</span>
                    Built 5+ products from 0 to 1 million users
                  </li>
                  <li className="flex gap-2 text-slate-700">
                    <span className="text-blue-600 font-bold">✓</span>
                    Designed complex distributed systems at scale
                  </li>
                  <li className="flex gap-2 text-slate-700">
                    <span className="text-blue-600 font-bold">✓</span>
                    Pioneered AI-assisted development workflows
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-3">
                  Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Product Strategy",
                    "System Design",
                    "UX Design",
                    "AI",
                    "Full-stack",
                    "Leadership",
                    "Documentation",
                  ].map((skill) => (
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
            <h3 className="text-xl font-bold text-slate-900 mb-2">
              Interested in learning together?
            </h3>
            <p className="text-slate-600 mb-4">
              Explore the knowledge base and let me know your thoughts
            </p>
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
