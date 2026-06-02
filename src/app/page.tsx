import Link from "next/link";
import { CategoryCards } from "@/components/home/CategoryCards";
import { CategoryPostsSection } from "@/components/home/CategoryPostsSection";
import { FreeTemplatesSection } from "@/components/home/FreeTemplatesSection";
import { Hero } from "@/components/home/Hero";
import { LatestPosts } from "@/components/home/LatestPosts";
import { JsonLd } from "@/components/seo/JsonLd";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { getHomePageData } from "@/lib/home";
import { buildWebPageSchema } from "@/lib/json-ld";
import { pageMetadata } from "@/lib/metadata";
import { SITE_DESCRIPTION, SITE_TAGLINE } from "@/lib/site";

export const revalidate = 60;

export const metadata = pageMetadata({
  title: "AI 쇼핑·숏폼 운영 연구소",
  description: SITE_DESCRIPTION,
  path: "/",
});

export default async function Home() {
  const data = await getHomePageData();

  return (
    <div className="flex min-h-screen flex-col bg-cream">
      <JsonLd
        data={buildWebPageSchema({
          name: "봉구픽 — AI 쇼핑·숏폼 운영 연구소",
          description: SITE_DESCRIPTION,
          path: "/",
        })}
      />
      <SiteHeader />
      <main id="main-content" className="flex-1">
        <Hero />
        <p className="sr-only">{SITE_TAGLINE}</p>
        <CategoryCards categories={data.categoryCards} />
        <LatestPosts
          featuredPosts={data.featuredPosts}
          posts={data.latestPosts}
        />
        <FreeTemplatesSection templates={data.templates} />
        <CategoryPostsSection
          id="ai-tools"
          category={data.aiToolsCategory}
          posts={data.aiToolsPosts}
        />
        <CategoryPostsSection
          id="experiment"
          category={data.experimentCategory}
          posts={data.experimentPosts}
        />

        <nav
          className="border-t border-line-soft bg-paper/40 py-10"
          aria-label="사이트 안내 링크"
        >
          <div className="mx-auto flex max-w-6xl flex-wrap justify-center gap-x-6 gap-y-2 px-4 text-sm">
            <Link href="/categories" className="text-caramel hover:underline">
              전체 카테고리
            </Link>
            <Link href="/about" className="text-caramel hover:underline">
              소개
            </Link>
            <Link href="/contact" className="text-caramel hover:underline">
              연락처
            </Link>
            <Link href="/privacy" className="text-caramel hover:underline">
              개인정보처리방침
            </Link>
            <Link href="/terms" className="text-caramel hover:underline">
              이용약관
            </Link>
          </div>
        </nav>
      </main>
      <SiteFooter />
    </div>
  );
}
