import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, X } from "lucide-react";
import { getAllConcepts } from "@/lib/knowledge";

interface SearchResult {
  slug: string;
  title: string;
  summary: string;
}

export default function TopNav() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

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

  const handleSearch = (query: string) => {
    setSearchQuery(query);

    if (query.trim() === "") {
      setResults([]);
      return;
    }

    const concepts = getAllConcepts();
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
      <div className="flex items-center gap-4 px-6 py-3">
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

        {/* Search Bar — centred, flex-1 */}
        <div className="flex-1 relative" ref={searchRef}>
          <div
            className="relative flex items-center bg-slate-100 rounded-lg px-3 py-2 cursor-text"
            onClick={() => setSearchOpen(true)}
          >
            <Search size={16} className="text-slate-400 mr-2" />
            <input
              type="text"
              placeholder="Search concepts..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="bg-transparent flex-1 outline-none text-sm"
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
            <div className="absolute top-full left-0 right-0 bg-white border border-slate-200 rounded-lg shadow-lg mt-1 z-50 max-h-96 overflow-auto">
              {results.map((result) => (
                <button
                  key={result.slug}
                  onClick={() => handleSelectResult(result.slug)}
                  className="w-full text-left px-4 py-3 hover:bg-slate-50 border-b border-slate-100 last:border-b-0"
                >
                  <div className="font-medium text-slate-900">
                    {highlightMatch(result.title, searchQuery)}
                  </div>
                  <div className="text-sm text-slate-600 mt-1 line-clamp-2">
                    {highlightMatch(result.summary, searchQuery)}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Navigation Links — right side */}
        <div className="hidden md:flex items-center gap-5 flex-shrink-0">
          <Link
            to="/"
            className="text-sm text-slate-700 hover:text-slate-900 font-medium transition-colors"
          >
            Home
          </Link>
          <Link
            to="/flows"
            className="text-sm text-slate-700 hover:text-slate-900 font-medium transition-colors"
          >
            Flows
          </Link>
          <Link
            to="/about"
            className="text-sm text-slate-700 hover:text-slate-900 font-medium transition-colors"
          >
            About
          </Link>
          <Link
            to="/admin"
            className="text-sm px-3 py-1.5 rounded-md bg-slate-100 text-slate-700 hover:bg-slate-200 font-medium transition-colors"
          >
            Admin
          </Link>
        </div>
      </div>
    </nav>
  );
}