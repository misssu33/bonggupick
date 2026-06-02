import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { PostCard } from "@/components/ui/PostCard";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { CARD_GRID } from "@/components/ui/card-grid";
import { getCategories, getCategoryBySlug } from "@/lib/categories";
import {
  buildCollectionPageSchema,
  buildItemListSchema,
} from "@/lib/json-ld";
import { categoryMetadata } from "@/lib/metadata";
import { getPostsByCategorySlug } from "@/lib/posts";

export const revalidate = 60;
export const dynamicParams = true;

type PageProps = {
  params: { slug: string };
};

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const category = await getCategoryBySlug(params.slug);
  if (!category) {
    return { title: "카테고리", robots: { index: false, follow: false } };
  }
  return categoryMetadata(category);
}

export default async function CategoryPage({ params }: PageProps) {
  const category = await getCategoryBySlug(params.slug);
  if (!category) notFound();

  const [posts, allCategories] = await Promise.all([
    getPostsByCategorySlug(params.slug),
    getCategories(),
  ]);
  const others = allCategories.filter((c) => c.slug !== params.slug);

  return (
    <div className="flex min-h-screen flex-col bg-cream">
      <JsonLd
        data={[
          buildCollectionPageSchema(category, posts.length),
          ...(posts.length > 0
            ? [buildItemListSchema(category, posts)]
            : []),
        ]}
      />
      <SiteHeader />
      <main className="flex-1 px-4 py-10 sm:px-6 sm:py-14">
        <div className="mx-auto w-full max-w-6xl">
          <Breadcrumbs
            items={[
              { label: "홈", href: "/" },
              { label: "카테고리", href: "/categories" },
              { label: category.name },
            ]}
          />

          <header>
            <p className="text-xs font-medium text-caramel">ARCHIVE</p>
            <h1 className="mt-2 flex flex-wrap items-center gap-2 text-3xl font-bold tracking-tight text-charcoal sm:text-4xl">
              <span aria-hidden>{category.emoji}</span>
              {category.name}
            </h1>
            {category.description ? (
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-mute sm:text-lg">
                {category.description}
              </p>
            ) : null}
          </header>

          <section
            className="mt-12"
            aria-label={`${category.name} 글 목록`}
          >
            {posts.length === 0 ? (
              <div className="rounded-xl border border-dashed border-line-soft bg-paper py-16 text-center">
                <p className="text-mute">아직 발행된 글이 없습니다.</p>
                <Link
                  href="/#latest"
                  className="mt-6 inline-block text-sm font-semibold text-caramel underline-offset-4 hover:underline"
                >
                  최신 실험 보기 →
                </Link>
              </div>
            ) : (
              <ul className={CARD_GRID}>
                {posts.map((post) => (
                  <li key={post.id}>
                    <PostCard post={post} featured={post.is_featured} />
                  </li>
                ))}
              </ul>
            )}
          </section>

          {others.length > 0 ? (
            <section
              className="mt-16 border-t border-line-soft pt-12"
              aria-label="다른 카테고리"
            >
              <h2 className="text-sm font-semibold text-charcoal">
                다른 카테고리
              </h2>
              <ul className={`${CARD_GRID} mt-6`}>
                {others.map((c) => (
                  <li key={c.id}>
                    <article>
                      <Link
                        href={`/category/${c.slug}`}
                        className="flex h-full items-center gap-3 rounded-xl border border-line-soft bg-paper/60 p-4 transition-base hover:border-caramel/30 hover:shadow-soft"
                      >
                        <span className="text-xl" aria-hidden>
                          {c.emoji}
                        </span>
                        <div className="min-w-0 flex-1">
                          <h3 className="font-semibold text-charcoal">
                            {c.name}
                          </h3>
                          {c.description ? (
                            <p className="mt-0.5 line-clamp-2 text-xs text-mute">
                              {c.description}
                            </p>
                          ) : null}
                        </div>
                      </Link>
                    </article>
                  </li>
                ))}
              </ul>
              <p className="mt-8 text-center">
                <Link
                  href="/categories"
                  className="text-sm font-semibold text-caramel hover:underline"
                >
                  전체 카테고리 보기 →
                </Link>
              </p>
            </section>
          ) : null}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
