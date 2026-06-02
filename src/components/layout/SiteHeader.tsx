import { getCategories } from "@/lib/categories";
import { buildMainNav } from "@/lib/navigation";
import { Header } from "@/components/layout/Header";

/** 서버에서 카테고리를 불러 상단 네비 구성 */
export async function SiteHeader() {
  const categories = await getCategories();
  const navItems = buildMainNav(categories);
  return <Header navItems={navItems} />;
}
