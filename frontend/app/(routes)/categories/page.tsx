import type { Metadata } from "next";
import { CategoriesView } from "./_components/CategoryView";

export const metadata: Metadata = { title: "Categories · SpendWise" };

export default function CategoriesPage() {
  // Load categories (GET /categories) from your backend here, then pass them in.
  return <CategoriesView initialCategories={[]} />;
}
