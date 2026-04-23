import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, X } from "lucide-react";
import { mockConcepts } from "@/lib/mockData";

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

  // Close search when clicking outside
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

  // Filter concepts on search
  const handleSearch = (query: string) => {
    setSearchQuery(query);

    if (query.trim() === "") {
      setResults([]);
      return;
    }

    const filtered = mockConcepts
      .filter((concept) =>
        concept.title.toLowerCase().includes(query.toLowerCase()) ||
        concept.summary.toLowerCase().includes(query.toLowerCase())
      )
      .slice(0, 8)
      .map((concept) => ({
        slug: concept.slug,
        title: concept.title,
        summary: concept.summary,
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
              className="flex-1 bg-transparent px-3 py-1 text-sm outline-none"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              onFocus={() => setSearchOpen(true)}
            />
            {searchQuery && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSearchQuery("");
                  setResults([]);
                }}
                className="text-slate-400 hover:text-slate-600"
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* Search Dropdown */}
          {searchOpen && results.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-200 rounded-lg shadow-lg z-50">
              {results.map((result) => (
                <button
                  key={result.slug}
                  onClick={() => handleSelectResult(result.slug)}
                  className="w-full text-left px-4 py-3 hover:bg-slate-50 border-b border-slate-100 last:border-0 transition-colors"
                >
                  <p className="text-sm font-medium text-slate-900 mb-1">
                    {highlightMatch(result.title, searchQuery)}
                  </p>
                  <p className="text-xs text-slate-600 line-clamp-2">
                    {highlightMatch(result.summary, searchQuery)}
                  </p>
                </button>
              ))}
            </div>
          )}

          {searchOpen && searchQuery && results.length === 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-200 rounded-lg shadow-lg p-4 z-50">
              <p className="text-sm text-slate-600 text-center">
                No concepts found for "{searchQuery}"
              </p>
            </div>
          )}
        </div>

        {/* Menu Links */}
        <div className="flex items-center gap-6 flex-shrink-0">
          <Link
            to="/"
            className="text-sm text-slate-600 hover:text-slate-900 transition-colors font-medium"
          >
            Home
          </Link>
          <Link
            to="/flows"
            className="text-sm text-slate-600 hover:text-slate-900 transition-colors font-medium"
          >
            Flows
          </Link>
          <Link
            to="/about"
            className="text-sm text-slate-600 hover:text-slate-900 transition-colors font-medium"
          >
            About
          </Link>
          <Link
            to="/admin"
            className="text-sm text-slate-600 hover:text-slate-900 transition-colors font-medium px-3 py-1.5 bg-slate-100 rounded hover:bg-slate-200"
          >
            Admin
          </Link>
        </div>
      </div>
    </nav>
  );
}
