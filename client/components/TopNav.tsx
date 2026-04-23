import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, X } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

interface SearchResult {
  slug: string;
  title: string;
  summary: string;
  domain: string;
}

export default function TopNav() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const { data: concepts = [] } = useQuery({
    queryKey: ["concepts"],
    queryFn: () => fetch("/api/concepts").then(r => r.json()).then(d => d.concepts ?? []),
  });

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setSearchOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setSearchOpen(true);
        inputRef.current?.focus();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);

    if (query.trim() === "") {
      setResults([]);
      return;
    }

    const filtered = concepts
      .filter((concept: any) =>
        concept.title.toLowerCase().includes(query.toLowerCase()) ||
        (concept.summary && concept.summary.toLowerCase().includes(query.toLowerCase()))
      )
      .slice(0, 8)
      .map((concept: any) => ({
        slug: concept.slug,
        title: concept.title,
        summary: concept.summary || "",
        domain: concept.domain || "",
      }));

    setResults(filtered);
  };

  const handleSelectResult = (slug: string) => {
    navigate(`/concept/${slug}`);
    setSearchQuery("");
    setResults([]);
    setSearchOpen(false);
  };

  const highlightMatch = (text: string, query: string) => {
    if (!query) return text;

    const parts = text.split(new RegExp(`(${query})`, "gi"));
    return parts.map((part, i) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <mark key={i} className="bg-yellow-200 font-medium">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  return (
    <nav className="border-b border-slate-200 bg-white sticky top-0 z-50">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 hover:opacity-80 transition-opacity flex-shrink-0"
        >
          <div className="w-8 h-8 rounded bg-slate-900 flex items-center justify-center">
            <span className="text-white font-bold text-sm">KO</span>
          </div>
          <span className="font-bold text-slate-900 hidden sm:inline">
            Knowledge OS
          </span>
        </Link>

        {/* Search Bar */}
        <div className="flex-1 max-w-md mx-4 relative" ref={searchRef}>
          <div
            className="relative flex items-center bg-slate-100 rounded-lg px-3 py-2 cursor-text"
            onClick={() => setSearchOpen(true)}
          >
            <Search size={18} className="text-slate-400 flex-shrink-0" />
            <input
              type="text"
              placeholder="Search concepts..."
              ref={inputRef}
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="flex-1 bg-transparent px-3 py-1 text-sm outline-none"
              onFocus={() => setSearchOpen(true)}
            />
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setResults([]);
                }}
                className="ml-2 text-slate-400 hover:text-slate-600"
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* Search Results */}
          {searchOpen && results.length > 0 && (
            <div className="absolute top-full left-0 right-0 bg-white border border-slate-200 rounded-lg shadow-lg mt-2 z-50 max-h-96 overflow-auto">
              {results.map((result) => (
                <button
                  key={result.slug}
                  onClick={() => handleSelectResult(result.slug)}
                  className="w-full text-left px-4 py-3 hover:bg-slate-50 border-b border-slate-100 last:border-b-0"
                >
                  <div className="font-medium text-slate-900">
                    {highlightMatch(result.title, searchQuery)}
                  </div>
                  {result.domain && (
                    <span className="inline-block text-xs text-slate-500 bg-slate-100 rounded px-1.5 py-0.5 mt-1">
                      {result.domain}
                    </span>
                  )}
                  <div className="text-sm text-slate-600 mt-1 line-clamp-2">
                    {highlightMatch(result.summary, searchQuery)}
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Empty state */}
          {searchOpen && searchQuery && results.length === 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-200 rounded-lg shadow-lg p-4 z-50">
              <p className="text-sm text-slate-600 text-center">
                No concepts found for "{searchQuery}"
              </p>
            </div>
          )}
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-6 flex-shrink-0">
          <Link
            to="/"
            className="text-sm text-slate-600 hover:text-slate-900 font-medium transition-colors"
          >
            Home
          </Link>
          <Link
            to="/flows"
            className="text-sm text-slate-600 hover:text-slate-900 font-medium transition-colors"
          >
            Flows
          </Link>
          <Link
            to="/graph"
            className="text-sm text-slate-600 hover:text-slate-900 font-medium transition-colors"
          >
            Graph
          </Link>
          <Link
            to="/about"
            className="text-sm text-slate-600 hover:text-slate-900 font-medium transition-colors"
          >
            About
          </Link>
          <Link
            to="/admin"
            className="text-sm px-3 py-1.5 rounded bg-slate-100 text-slate-600 hover:bg-slate-200 font-medium transition-colors"
          >
            Admin
          </Link>
        </div>
      </div>
    </nav>
  );
}
