import Link from "next/link";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { getCategories } from "@/lib/categories";
import { buildWebPageSchema } from "@/lib/json-ld";
import { pageMetadata } from "@/lib/metadata";
import { SITE_DESCRIPTION, SITE_TAGLINE } from "@/lib/site";

export const revalidate = 60;

export const metadata = pageMetadata({
  title: "전체 카테고리",
  description: `봉구픽 연구 카테고리 목록. ${SITE_DESCRIPTION}`,
  path: "/categories",
});

export default async function CategoriesIndexPage() {
  const categories = await getCategories();

  return (
    <div className="flex min-h-screen flex-col bg-cream">
      <JsonLd
        data={buildWebPageSchema({
          name: "전체 카테고리",
          description: SITE_DESCRIPTION,
          path: "/categories",
        })}
      />
      <SiteHeader />
      <main className="flex-1 px-4 py-10 sm:px-6 sm:py-14">
        <div className="mx-auto w-full max-w-6xl">
          <Breadcrumbs
            items={[
              { label: "홈", href: "/" },
              { label: "전체 카테고리" },
            ]}
          />

          <header>
            <p className="text-xs font-medium text-caramel">CATEGORIES</p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-charcoal sm:text-4xl">
              연구 카테고리
            </h1>
            <p className="mt-4 max-w-2xl text-base text-mute">{SITE_TAGLINE}</p>
          </header>

          <section className="mt-12" aria-label="카테고리 목록">
            {categories.length === 0 ? (
              <p className="rounded-xl border border-dashed border-line-soft py-12 text-center text-sm text-mute">
                등록된 카테고리가 없습니다.
              </p>
            ) : (
              <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {categories.map((cat) => (
                  <li key={cat.id}>
                    <article className="flex h-full flex-col rounded-xl border border-line-soft bg-cream p-6 transition-base hover:border-caramel/30 hover:shadow-soft">
                      <Link href={`/category/${cat.slug}`} className="flex flex-1 flex-col gap-2">
                        <span className="text-2xl" aria-hidden>
                          {cat.emoji}
                        </span>
                        <h2 className="text-lg font-semibold text-charcoal hover:text-caramel">
                          {cat.name}
                        </h2>
                        {cat.description ? (
                          <p className="text-sm leading-relaxed text-mute">
                            {cat.description}
                          </p>
                        ) : null}
                        <span className="mt-auto pt-3 text-xs font-medium text-caramel">
                          아카이브 보기 →
                        </span>
                      </Link>
                    </article>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <nav
            className="mt-12 flex flex-wrap gap-4 text-sm"
            aria-label="관련 페이지"
          >
            <Link href="/" className="text-caramel hover:underline">
              홈
            </Link>
            <Link href="/resources" className="text-caramel hover:underline">
              무료 템플릿
            </Link>
            <Link href="/about" className="text-caramel hover:underline">
              소개
            </Link>
          </nav>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
