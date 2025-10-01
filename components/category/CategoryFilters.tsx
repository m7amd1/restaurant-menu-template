"use client";

import { Check, Filter } from "lucide-react";

interface CategoryFiltersProps {
  selected: ReadonlyArray<string>;
  subcategories: ReadonlyArray<string>;
  onToggle: (value: string) => void;
  onClear: () => void;
  total: number;
}

export function CategoryFilters({
  selected,
  subcategories,
  onToggle,
  onClear,
  total,
}: CategoryFiltersProps) {
  const isAll = selected.length === 1 && selected[0] === "all";
  const pills = ["all", ...subcategories.filter((sub) => sub !== "all")];
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center">
          <Filter className="h-5 w-5 text-muted-foreground mr-2" />
          <h3 className="text-lg font-semibold text-foreground">
            Filter Results
          </h3>
        </div>
        <div className="text-xs md:text-sm px-3 py-1 rounded-full border bg-background shadow-sm text-muted-foreground">
          {total} item{total !== 1 ? "s" : ""}
        </div>
      </div>

      <div className="flex flex-wrap gap-2 items-center">
        {pills.map((sub) => {
          const active = selected.includes(sub);
          return (
            <button
              key={sub}
              onClick={() => onToggle(sub)}
              className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm border transition ${
                active
                  ? "bg-foreground text-background"
                  : "bg-transparent text-foreground border-muted hover:bg-foreground/10"
              } capitalize`}
            >
              {sub === "all"
                ? "All Items"
                : sub === "مشروبات باردة"
                ? "Cold Drinks"
                : sub === "مشروبات ساخنة"
                ? "Hot Drinks"
                : sub}
              {active && (
                <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-background/20 border border-background/40">
                  <Check className="w-3 h-3" />
                </span>
              )}
            </button>
          );
        })}
      </div>
      <div className="mt-2">
        {!isAll && (
          <button
            type="button"
            className="text-sm text-muted-foreground hover:text-foreground"
            onClick={onClear}
          >
            Clear Filters
          </button>
        )}
      </div>
    </div>
  );
}
