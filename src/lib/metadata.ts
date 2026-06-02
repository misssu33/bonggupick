import type { Metadata } from "next";
import type { Category, Post } from "@/types/database";
import {
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TAGLINE,
  SITE_URL,
} from "@/lib/site";

const OG_IMAGE = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: `${SITE_NAME} — AI 쇼핑·숏폼 운영 연구소`,
};

const DEFAULT_ROBOTS: Metadata["robots"] = {
  index: true,
  follow: true,
  googleBot: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
  },
};

function absoluteUrl(path: string): string {
  if (!path || path === "/") return SITE_URL;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

function twitterMeta(title: string, description: string, images: string[]) {
  return {
    card: "summary_large_image" as const,
    title,
    description,
    images,
  };
}

/** 루트·공통 메타데이터 */
export const rootMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | AI 쇼핑·숏폼 운영 연구소`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "봉구픽",
    "TikTok Affiliate",
    "쇼츠",
    "AI 상세페이지",
    "AI 쇼핑",
    "숏폼",
    "제휴 마케팅",
    "AI 툴",
    "쇼핑 콘텐츠",
    "전환율",
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "technology",
  openGraph: {
    type: "website",
    locale: "ko_KR",
    siteName: SITE_NAME,
    url: SITE_URL,
    title: `${SITE_NAME} | AI 쇼핑·숏폼 운영 연구소`,
    description: SITE_DESCRIPTION,
    images: [OG_IMAGE],
  },
  twitter: twitterMeta(
    `${SITE_NAME} | AI 쇼핑·숏폼 운영 연구소`,
    SITE_DESCRIPTION,
    [OG_IMAGE.url],
  ),
  robots: DEFAULT_ROBOTS,
  alternates: {
    canonical: SITE_URL,
    languages: { "ko-KR": SITE_URL },
  },
};

/** 일반 페이지 메타 */
export function pageMetadata({
  title,
  description,
  path = "",
  ogType = "website",
}: {
  title: string;
  description: string;
  path?: string;
  ogType?: "website" | "article";
}): Metadata {
  const url = absoluteUrl(path);
  const fullTitle = `${title} | ${SITE_NAME}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: { "ko-KR": url },
    },
    openGraph: {
      type: ogType,
      locale: "ko_KR",
      siteName: SITE_NAME,
      url,
      title: fullTitle,
      description,
      images: [OG_IMAGE],
    },
    twitter: twitterMeta(fullTitle, description, [OG_IMAGE.url]),
    robots: DEFAULT_ROBOTS,
  };
}

/** 게시글 Article 메타 */
export function articleMetadata(post: Post): Metadata {
  const path = `/post/${post.slug}`;
  const url = absoluteUrl(path);
  const description =
    post.excerpt?.trim() ||
    `${post.title} — ${post.category.name} 카테고리 실험 기록. ${SITE_TAGLINE}`;
  const fullTitle = `${post.title} | ${SITE_NAME}`;

  const ogImages = post.thumbnail_url
    ? [
        {
          url: post.thumbnail_url,
          width: 1200,
          height: 630,
          alt: post.title,
        },
        OG_IMAGE,
      ]
    : [OG_IMAGE];

  return {
    title: post.title,
    description,
    authors: [{ name: `${SITE_NAME} 에디터`, url: `${SITE_URL}/about` }],
    alternates: {
      canonical: url,
      languages: { "ko-KR": url },
    },
    openGraph: {
      type: "article",
      locale: "ko_KR",
      siteName: SITE_NAME,
      url,
      title: fullTitle,
      description,
      publishedTime: post.published_at ?? undefined,
      modifiedTime: post.updated_at,
      section: post.category.name,
      tags: post.tags ?? undefined,
      images: ogImages,
    },
    twitter: twitterMeta(
      fullTitle,
      description,
      post.thumbnail_url ? [post.thumbnail_url] : [OG_IMAGE.url],
    ),
    robots: DEFAULT_ROBOTS,
  };
}

/** 카테고리 Collection 메타 */
export function categoryMetadata(category: Category): Metadata {
  const path = `/category/${category.slug}`;
  const description =
    category.description?.trim() ||
    `${category.name} — TikTok·쇼츠·AI 쇼핑 실험 글 아카이브. ${SITE_TAGLINE}`;

  return pageMetadata({
    title: category.name,
    description,
    path,
    ogType: "website",
  });
}
