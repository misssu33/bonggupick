import { getCategories } from "@/lib/categories";
import { Footer } from "@/components/layout/Footer";

export async function SiteFooter() {
  const categories = await getCategories();
  return <Footer categories={categories} />;
}
