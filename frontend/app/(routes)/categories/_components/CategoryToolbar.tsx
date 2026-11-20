import { Filter, LayoutGrid, List, Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import type { SortKey, Tab, ViewMode } from "@/lib/types";

type Props = {
  tab: Tab;
  onTab: (t: Tab) => void;
  query: string;
  onQuery: (q: string) => void;
  sort: SortKey;
  onSort: (s: SortKey) => void;
  showArchived: boolean;
  onShowArchived: (v: boolean) => void;
  view: ViewMode;
  onView: (v: ViewMode) => void;
  onAdd: () => void;
};

export function CategoryToolbar(p: Props) {
  return (
    <div className="relative mt-6 flex animate-fade-up flex-wrap items-center gap-3 animate-delay-200">
      <Tabs value={p.tab} onValueChange={(v) => p.onTab(v as Tab)}>
        <TabsList className="rounded-full bg-card p-1 shadow-soft">
          {(["all", "income", "expense"] as const).map((t) => (
            <TabsTrigger
              key={t}
              value={t}
              className="rounded-full px-5 capitalize data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              {t}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <div className="ml-auto flex flex-wrap items-center gap-3">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={p.query}
            onChange={(e) => p.onQuery(e.target.value)}
            placeholder="Search categories..."
            aria-label="Search categories"
            className="w-56 rounded-full bg-card pl-9"
          />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="rounded-lg bg-card">
              <Filter className="mr-2 h-4 w-4" /> Filter
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Sort by</DropdownMenuLabel>
            <DropdownMenuRadioGroup
              value={p.sort}
              onValueChange={(v) => p.onSort(v as SortKey)}
            >
              <DropdownMenuRadioItem value="name">Name</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="usage">
                Most used
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="total">
                Highest total
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
            <DropdownMenuSeparator />
            <DropdownMenuCheckboxItem
              checked={p.showArchived}
              onCheckedChange={(v) => p.onShowArchived(!!v)}
            >
              Show archived
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <div
          className="flex rounded-lg border bg-card p-1"
          role="group"
          aria-label="View mode"
        >
          {(
            [
              ["grid", LayoutGrid, "Grid view"],
              ["list", List, "List view"],
            ] as const
          ).map(([v, Icon, label]) => (
            <Button
              key={v}
              size="icon"
              variant="ghost"
              aria-label={label}
              aria-pressed={p.view === v}
              onClick={() => p.onView(v)}
              className={cn(
                "h-8 w-8 rounded-md",
                p.view === v &&
                  "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground",
              )}
            >
              <Icon className="h-4 w-4" />
            </Button>
          ))}
        </div>

        <Button
          onClick={p.onAdd}
          className="rounded-lg border-0 bg-gradient-brand px-5 text-primary-foreground shadow-soft hover:opacity-90"
        >
          <Plus className="mr-1 h-4 w-4" /> Add Category
        </Button>
      </div>
    </div>
  );
}
