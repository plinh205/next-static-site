import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { BookOpen, GitBranch, FileText, LinkIcon } from "lucide-react";

export default function AdminIndex() {
  const adminLinks = [
    {
      href: "/admin/concepts",
      title: "Concepts",
      description: "Create and manage learning concepts",
      icon: BookOpen,
    },
    {
      href: "/admin/relations",
      title: "Relations",
      description: "Define relationships between concepts",
      icon: LinkIcon,
    },
    {
      href: "/admin/learning-logs",
      title: "Learning Logs",
      description: "Document your learning progress",
      icon: FileText,
    },
    {
      href: "/admin/flows",
      title: "Flows",
      description: "Create concept flow diagrams",
      icon: GitBranch,
    },
  ];

  return (
    <Layout>
      <div className="max-w-5xl mx-auto px-8 py-12">
        <h1 className="text-4xl font-bold text-slate-900 mb-2">Admin Panel</h1>
        <p className="text-slate-600 mb-12">Manage your knowledge base</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {adminLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                to={link.href}
                className="block group"
              >
                <div className="border border-slate-200 rounded-lg p-6 hover:border-slate-400 hover:shadow-md transition-all bg-slate-50 hover:bg-white h-full">
                  <Icon className="w-8 h-8 text-slate-600 mb-4 group-hover:text-slate-900 transition-colors" />
                  <h2 className="text-xl font-semibold text-slate-900 mb-2">
                    {link.title}
                  </h2>
                  <p className="text-slate-600">
                    {link.description}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </Layout>
  );
}
