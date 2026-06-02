import type { Category } from "@/types/database";

export type NavItem =
  | { type: "category"; href: string; label: string; slug: string }
  | { type: "page"; href: string; label: string };

/** DB 없을 때 최소 메뉴 (빌드·프리뷰) */
const FALLBACK_NAV: NavItem[] = [
  { type: "page", href: "/resources", label: "무료 템플릿" },
  { type: "page", href: "/about", label: "소개" },
  { type: "page", href: "/contact", label: "연락처" },
];

/** 상단 메뉴 slug 순서 */
const NAV_SLUG_ORDER = [
  "tiktok",
  "shorts",
  "ai-detail",
  "life",
  "ai-tools",
] as const;

const EXPERIMENT_SLUG = "experiment";

export function buildMainNav(categories: Category[]): NavItem[] {
  if (categories.length === 0) {
    return FALLBACK_NAV;
  }

  const bySlug = new Map(categories.map((c) => [c.slug, c]));
  const items: NavItem[] = [];

  for (const slug of NAV_SLUG_ORDER) {
    const cat = bySlug.get(slug);
    if (cat) {
      items.push({
        type: "category",
        slug: cat.slug,
        href: `/category/${cat.slug}`,
        label: cat.name,
      });
    }
  }

  items.push({ type: "page", href: "/resources", label: "무료 템플릿" });

  const experiment = bySlug.get(EXPERIMENT_SLUG);
  if (experiment) {
    items.push({
      type: "category",
      slug: experiment.slug,
      href: `/category/${experiment.slug}`,
      label: experiment.name,
    });
  }

  return items;
}

export function isNavActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}
