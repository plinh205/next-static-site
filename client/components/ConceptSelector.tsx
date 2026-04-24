import { useState, useEffect } from "react";
import { Concept } from "@shared/api";
import { API_BASE } from "@/lib/config";

interface ConceptSelectorProps {
  value: string[];
  onChange: (selected: string[]) => void;
}

export default function ConceptSelector({ value, onChange }: ConceptSelectorProps) {
  const [concepts, setConcepts] = useState<Concept[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE}/api/concepts`)
      .then(res => res.json())
      .then((data: { concepts: Concept[] }) => {
        setConcepts(data.concepts);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const filteredConcepts = concepts
    .filter(c => c.title.toLowerCase().includes(search.toLowerCase()))
    .slice(0, 10);

  const handleAdd = (slug: string) => {
    if (!value.includes(slug)) {
      onChange([...value, slug]);
    }
  };

  const handleRemove = (slug: string) => {
    onChange(value.filter(s => s !== slug));
  };

  const getTitle = (slug: string) => {
    const concept = concepts.find(c => c.slug === slug);
    return concept ? concept.title : slug;
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <div>
        {value.map(slug => (
          <span key={slug} style={{ margin: '2px', padding: '4px', background: '#eee', borderRadius: '4px' }}>
            {getTitle(slug)}
            <button onClick={() => handleRemove(slug)} style={{ marginLeft: '4px' }}>x</button>
          </span>
        ))}
      </div>
      <input
        type="text"
        placeholder="Search concepts..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={{ width: '100%', padding: '8px', marginBottom: '8px' }}
      />
      <div>
        {filteredConcepts.map(concept => (
          <div key={concept.slug} style={{ padding: '4px', cursor: 'pointer' }} onClick={() => handleAdd(concept.slug)}>
            {concept.title}
          </div>
        ))}
      </div>
    </div>
  );
}