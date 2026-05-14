import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/posts";

export const revalidate = 3600;

const BASE = "https://bonggupick.com";

/** SEO용 정적 라우트 (Supabase 실패 시에도 동일하게 사용) */
function staticEntries(): MetadataRoute.Sitemap {
  const monthly = { changeFrequency: "monthly" as const, priority: 0.8 };
  return [
    { url: `${BASE}/`, changeFrequency: "monthly", priority: 1.0 },
    { url: `${BASE}/about`, ...monthly },
    { url: `${BASE}/contact`, ...monthly },
    { url: `${BASE}/privacy`, ...monthly },
    { url: `${BASE}/terms`, ...monthly },
  ];
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticUrls = staticEntries();

  try {
    const posts = await getAllPosts();
    const postUrls: MetadataRoute.Sitemap = posts
      .filter((p) => p.slug.length > 0)
      .map((post) => ({
        url: `${BASE}/post/${post.slug}`,
        lastModified: post.updated_at,
        changeFrequency: "weekly",
        priority: 0.9,
      }));

    return [...staticUrls, ...postUrls];
  } catch {
    // Supabase 등 오류 시 검색엔진에 정적 페이지만 노출
    return staticUrls;
  }
}
