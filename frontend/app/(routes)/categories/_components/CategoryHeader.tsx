import { Home } from "lucide-react";
import { CategoryHero } from "./CategoryHero";

export function CategoriesHeader() {
  return (
    <>
      <nav
        className="relative flex items-center gap-2 text-sm text-muted-foreground"
        aria-label="Breadcrumb"
      >
        <Home className="h-4 w-4" />{" "}
        <span className="font-medium text-foreground">Categories</span>
      </nav>

      <header className="mt-4 min-h-[8rem]">
        <CategoryHero />
        <div className="relative animate-fade-up">
          <h1 className="relative text-5xl font-extrabold tracking-tight">
            Categories
          </h1>
          <p className="relative mt-2 text-muted-foreground">
            Organize your transactions with custom categories.
          </p>
        </div>
      </header>
    </>
  );
}
