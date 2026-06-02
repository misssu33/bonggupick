import type { MetadataRoute } from "next";
import { getCategories } from "@/lib/categories";
import { getAllPosts } from "@/lib/posts";
import { SITE_URL } from "@/lib/site";

export const revalidate = 3600;

function staticEntries(): MetadataRoute.Sitemap {
  const monthly = { changeFrequency: "monthly" as const, priority: 0.8 };
  return [
    { url: `${SITE_URL}/`, changeFrequency: "daily", priority: 1.0 },
    { url: `${SITE_URL}/categories`, changeFrequency: "weekly", priority: 0.88 },
    { url: `${SITE_URL}/resources`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/about`, ...monthly },
    { url: `${SITE_URL}/contact`, ...monthly },
    { url: `${SITE_URL}/privacy`, ...monthly },
    { url: `${SITE_URL}/terms`, ...monthly },
  ];
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticUrls = staticEntries();

  try {
    const [categories, posts] = await Promise.all([
      getCategories(),
      getAllPosts(),
    ]);

    const categoryUrls: MetadataRoute.Sitemap = categories.map((c) => ({
      url: `${SITE_URL}/category/${c.slug}`,
      changeFrequency: "weekly",
      priority: 0.85,
    }));

    const postUrls: MetadataRoute.Sitemap = posts
      .filter((p) => p.slug.length > 0)
      .map((post) => ({
        url: `${SITE_URL}/post/${post.slug}`,
        lastModified: post.updated_at,
        changeFrequency: "weekly",
        priority: 0.9,
      }));

    return [...staticUrls, ...categoryUrls, ...postUrls];
  } catch {
    return staticUrls;
  }
}
