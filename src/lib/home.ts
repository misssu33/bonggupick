import { getCategories } from "@/lib/categories";
import {
  getFeaturedPosts,
  getLatestPosts,
  getPostsByCategorySlug,
} from "@/lib/posts";
import { getTemplateResources } from "@/lib/resources";
import type { Category, Post, Resource } from "@/types/database";

/** 홈 카테고리 카드용 — 실험기록·AI툴 제외 슬롯 (DB sort_order 기준) */
const HOME_CARD_SLUGS = [
  "tiktok",
  "shorts",
  "ai-detail",
  "life",
] as const;

export type HomePageData = {
  categories: Category[];
  categoryCards: Category[];
  featuredPosts: Post[];
  latestPosts: Post[];
  templates: Resource[];
  aiToolsCategory: Category | null;
  aiToolsPosts: Post[];
  experimentCategory: Category | null;
  experimentPosts: Post[];
};

export async function getHomePageData(): Promise<HomePageData> {
  const categories = await getCategories();

  const categoryCards = HOME_CARD_SLUGS.map((slug) =>
    categories.find((c) => c.slug === slug),
  ).filter((c): c is Category => Boolean(c));

  // DB에만 있고 고정 목록에 없는 카테고리도 카드에 포함 (sort_order 유지)
  const extraCards = categories.filter(
    (c) =>
      !HOME_CARD_SLUGS.includes(c.slug as (typeof HOME_CARD_SLUGS)[number]) &&
      c.slug !== "experiment" &&
      c.slug !== "ai-tools",
  );

  const [
    featuredPosts,
    latestPosts,
    templates,
    aiToolsPosts,
    experimentPosts,
  ] = await Promise.all([
    getFeaturedPosts(3),
    getLatestPosts(6),
    getTemplateResources(4),
    getPostsByCategorySlug("ai-tools", 3),
    getPostsByCategorySlug("experiment", 3),
  ]);

  return {
    categories,
    categoryCards: [...categoryCards, ...extraCards],
    featuredPosts,
    latestPosts,
    templates,
    aiToolsCategory: categories.find((c) => c.slug === "ai-tools") ?? null,
    aiToolsPosts,
    experimentCategory: categories.find((c) => c.slug === "experiment") ?? null,
    experimentPosts,
  };
}
