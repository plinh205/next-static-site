import { useState, useMemo } from "react";
import { Check, ChevronsUpDown, Plus } from "lucide-react";
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

interface DomainSelectProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

function getUniqueDomains(): string[] {
  const seen = new Set<string>();
  const domains: string[] = [];
  mockConcepts.forEach((c) => {
    if (c.domain && !seen.has(c.domain)) {
      seen.add(c.domain);
      domains.push(c.domain);
    }
  });
  return domains;
}

export default function DomainSelect({
  value,
  onChange,
  placeholder = "Select or create domain…",
}: DomainSelectProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const existingDomains = useMemo(() => getUniqueDomains(), []);

  const filtered = existingDomains.filter((d) =>
    d.toLowerCase().includes(search.toLowerCase()),
  );

  const showCreate =
    search.trim().length > 0 &&
    !existingDomains.some(
      (d) => d.toLowerCase() === search.trim().toLowerCase(),
    );

  const handleSelect = (domain: string) => {
    onChange(domain);
    setSearch("");
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between font-normal text-left"
        >
          <span className={value ? "text-slate-900" : "text-slate-400"}>
            {value || placeholder}
          </span>
          <ChevronsUpDown size={16} className="ml-2 shrink-0 text-slate-400" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[--radix-popover-trigger-width] p-0" align="start">
        <Command>
          <CommandInput
            placeholder="Search or type new domain…"
            value={search}
            onValueChange={setSearch}
          />
          <CommandList>
            {filtered.map((domain) => (
              <CommandItem
                key={domain}
                value={domain}
                onSelect={() => handleSelect(domain)}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === domain ? "opacity-100" : "opacity-0",
                  )}
                />
                {domain}
              </CommandItem>
            ))}
            {showCreate && (
              <CommandItem
                value={`__create__${search}`}
                onSelect={() => handleSelect(search.trim())}
                className="text-blue-600"
              >
                <Plus size={14} className="mr-2" />
                Create &ldquo;{search.trim()}&rdquo;
              </CommandItem>
            )}
            {filtered.length === 0 && !showCreate && (
              <CommandEmpty>No domains found.</CommandEmpty>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
