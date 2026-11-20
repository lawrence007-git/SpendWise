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

      {/* No `relative` or animation on <header>: the art anchors to the page wrapper's top-right corner.
          The min-height only applies where the art is visible (xl and up). */}
      <header className="mt-4 xl:min-h-[9.5rem]">
        <CategoryHero />
        <div className="relative animate-fade-up">
          <h1 className="text-5xl font-extrabold tracking-tight">Categories</h1>
          <p className="mt-2 text-muted-foreground">
            Organize your transactions with custom categories.
          </p>
        </div>
      </header>
    </>
  );
}
