import { useState, useMemo } from "react";
import { Check, ChevronsUpDown, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { mockConcepts } from "@/lib/mockData";

interface ConceptMultiSelectProps {
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
}

export default function ConceptMultiSelect({
  value,
  onChange,
  placeholder = "Search concepts…",
}: ConceptMultiSelectProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const concepts = useMemo(
    () => mockConcepts.map((c) => ({ slug: c.slug, title: c.title ?? c.slug })),
    [],
  );

  const filtered = concepts.filter((c) =>
    c.title.toLowerCase().includes(search.toLowerCase()),
  );

  const toggle = (slug: string) => {
    onChange(
      value.includes(slug)
        ? value.filter((s) => s !== slug)
        : [...value, slug],
    );
  };

  const remove = (slug: string) => onChange(value.filter((s) => s !== slug));

  const selectedConcepts = concepts.filter((c) => value.includes(c.slug));

  return (
    <div className="space-y-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            type="button"
            variant="outline"
            role="combobox"
            className="w-full justify-between font-normal"
          >
            <span className="text-slate-400 truncate">
              {value.length === 0
                ? placeholder
                : `${value.length} concept${value.length > 1 ? "s" : ""} selected`}
            </span>
            <ChevronsUpDown size={16} className="ml-2 shrink-0 text-slate-400" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-[--radix-popover-trigger-width] p-0"
          align="start"
        >
          <Command>
            <CommandInput
              placeholder="Search concepts…"
              value={search}
              onValueChange={setSearch}
            />
            <CommandList className="max-h-56">
              <CommandEmpty>No concepts found.</CommandEmpty>
              <CommandGroup>
                {filtered.map((concept) => (
                  <CommandItem
                    key={concept.slug}
                    value={concept.slug}
                    onSelect={() => toggle(concept.slug)}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4 shrink-0",
                        value.includes(concept.slug)
                          ? "opacity-100"
                          : "opacity-0",
                      )}
                    />
                    {concept.title}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {selectedConcepts.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {selectedConcepts.map((c) => (
            <span
              key={c.slug}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-medium"
            >
              {c.title}
              <button
                type="button"
                onClick={() => remove(c.slug)}
                className="ml-0.5 rounded-full hover:bg-slate-200 p-0.5 transition-colors"
                aria-label={`Remove ${c.title}`}
              >
                <X size={11} />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
