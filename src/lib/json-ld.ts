import type { Category, Post } from "@/types/database";
import {
  SITE_DESCRIPTION,
  SITE_EMAIL,
  SITE_NAME,
  SITE_URL,
} from "@/lib/site";

export type BreadcrumbItem = {
  name: string;
  path: string;
};

/** BreadcrumbList 스키마 */
export function buildBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}

/** WebSite + 검색엔진 사이트 구조 */
export function buildWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    alternateName: "BongguPick",
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    inLanguage: "ko-KR",
    publisher: { "@id": `${SITE_URL}/#organization` },
  };
}

/** Organization (AdSense·신뢰도) */
export function buildOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: SITE_URL,
    email: SITE_EMAIL,
    description: SITE_DESCRIPTION,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/opengraph-image`,
    },
  };
}

/** Article 스키마 — 게시글 */
export function buildArticleSchema(post: Post) {
  const url = `${SITE_URL}/post/${post.slug}`;
  const images = post.thumbnail_url
    ? [post.thumbnail_url]
    : [`${SITE_URL}/opengraph-image`];

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt ?? `${post.title} — ${post.category.name}`,
    image: images,
    datePublished: post.published_at ?? post.created_at,
    dateModified: post.updated_at,
    author: {
      "@type": "Person",
      name: `${SITE_NAME} 에디터`,
      url: `${SITE_URL}/about`,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/opengraph-image`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    url,
    articleSection: post.category.name,
    keywords: post.tags?.join(", "),
    inLanguage: "ko-KR",
  };
}

/** CollectionPage — 카테고리 아카이브 */
export function buildCollectionPageSchema(
  category: Category,
  postCount: number,
) {
  const url = `${SITE_URL}/category/${category.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: category.name,
    description: category.description || `${category.name} 실험 아카이브`,
    url,
    inLanguage: "ko-KR",
    isPartOf: { "@type": "WebSite", url: SITE_URL, name: SITE_NAME },
    numberOfItems: postCount,
  };
}

/** ItemList — 카테고리 글 목록 */
export function buildItemListSchema(
  category: Category,
  posts: Pick<Post, "slug" | "title">[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${category.name} 글 목록`,
    itemListElement: posts.map((post, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `${SITE_URL}/post/${post.slug}`,
      name: post.title,
    })),
  };
}

/** WebPage — 정적 페이지 */
export function buildWebPageSchema({
  name,
  description,
  path,
}: {
  name: string;
  description: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name,
    description,
    url: `${SITE_URL}${path}`,
    inLanguage: "ko-KR",
    isPartOf: { "@type": "WebSite", url: SITE_URL, name: SITE_NAME },
  };
}
