import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PostCard } from "@/components/ui/PostCard";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import {
  CATEGORY_LABELS,
  getCategoryDescription,
  getCategoryKo,
  isCategorySlug,
} from "@/lib/categories";
import { getPostsByCategory } from "@/lib/posts";
import type { Category } from "@/types/post";

export const revalidate = 60;

const ALL: Category[] = ["daily", "it", "support"];

type PageProps = {
  params: { slug: string };
};

export function generateStaticParams() {
  return ALL.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  if (!isCategorySlug(params.slug)) {
    return { title: "카테고리 | 봉구픽" };
  }
  const ko = getCategoryKo(params.slug);
  return {
    title: `${ko} | 봉구픽`,
    description: getCategoryDescription(params.slug),
  };
}

export default async function CategoryPage({ params }: PageProps) {
  if (!isCategorySlug(params.slug)) notFound();

  const category = params.slug;
  const posts = await getPostsByCategory(category);
  const others = ALL.filter((c) => c !== category);

  return (
    <div className="flex min-h-screen flex-col bg-cream">
      <Header />
      <main className="flex-1 px-4 py-8 sm:px-8 sm:py-12">
        <div className="mx-auto w-full max-w-[1100px]">
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-sm text-mute transition-base hover:text-caramel"
          >
            <span aria-hidden>←</span> 홈으로 돌아가기
          </Link>

          <p className="mt-8 text-xs tracking-wider text-mute sm:text-sm">
            ─── {category.toUpperCase()}
          </p>
          <h1 className="font-serif mt-4 text-4xl font-bold leading-tight tracking-tight text-charcoal sm:text-5xl">
            {getCategoryKo(category)}
          </h1>
          <p className="mt-4 max-w-2xl text-lg italic leading-relaxed text-mute">
            {getCategoryDescription(category)}
          </p>
          <div
            className="mt-8 h-px max-w-2xl bg-caramel/80"
            aria-hidden
          />

          <section className="mt-12" aria-label={`${getCategoryKo(category)} 글 목록`}>
            {posts.length === 0 ? (
              <div className="rounded-lg border border-dashed border-line-soft bg-paper/50 py-16 text-center">
                <p className="text-mute">아직 발행된 글이 없어요</p>
                <Link
                  href="/"
                  className="mt-6 inline-block text-sm font-medium text-caramel underline-offset-4 transition-base hover:underline"
                >
                  홈으로 가기 →
                </Link>
              </div>
            ) : (
              <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
                {posts.map((post) => (
                  <li key={post.id}>
                    <PostCard post={post} />
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section
            className="mt-20 border-t border-line-soft pt-12"
            aria-label="다른 카테고리"
          >
            <h2 className="text-sm font-medium uppercase tracking-widest text-mute">
              다른 카테고리 둘러보기
            </h2>
            <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {others.map((c) => {
                const o = CATEGORY_LABELS[c];
                return (
                  <li key={c}>
                    <Link
                      href={`/category/${c}`}
                      className="flex items-center gap-3 rounded-lg border border-line-soft bg-paper/60 p-4 transition-base hover:border-caramel/40 hover:bg-paper hover:shadow-soft sm:p-5"
                    >
                      <span className="text-2xl" aria-hidden>
                        {o.emoji}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="font-serif text-lg font-semibold text-charcoal">
                          {o.ko}
                        </p>
                        <p className="mt-0.5 line-clamp-2 text-xs text-mute">
                          {getCategoryDescription(c)}
                        </p>
                      </div>
                      <span className="text-caramel" aria-hidden>
                        →
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
