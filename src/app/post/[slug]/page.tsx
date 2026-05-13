import { cache } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CategoryBadge } from "@/components/ui/CategoryBadge";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { CATEGORY_LABELS } from "@/lib/categories";
import { formatPublishedDate, getPostBySlug } from "@/lib/posts";
import type { Post } from "@/types/post";

const getPost = cache(async (slug: string) => getPostBySlug(slug));

const THUMB_GRADIENT: Record<
  Post["category"],
  string
> = {
  daily:
    "bg-gradient-to-br from-caramel/25 via-accent-light/20 to-paper dark:from-caramel/30 dark:via-charcoal/40 dark:to-paper",
  it: "bg-gradient-to-br from-accent-light/30 via-caramel/20 to-paper dark:from-accent-light/25 dark:to-charcoal/50",
  support:
    "bg-gradient-to-br from-caramel/30 via-line-soft/80 to-paper dark:from-caramel/35 dark:to-charcoal/40",
};

type PageProps = {
  params: { slug: string };
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const post = await getPost(params.slug);
  if (!post) {
    return { title: "글을 찾을 수 없습니다 | 봉구픽" };
  }
  const desc = post.excerpt ?? undefined;
  return {
    title: `${post.title} | 봉구픽`,
    description: desc,
    openGraph: {
      title: post.title,
      description: desc,
      type: "article",
      publishedTime: post.published_at ?? undefined,
    },
  };
}

/** 본문을 빈 줄 기준 단락으로 나누어 텍스트 렌더링 */
function ArticleBody({ content }: { content: string }) {
  const blocks = content.trim().split(/\n\s*\n+/).filter(Boolean);
  const paragraphs = blocks.length > 0 ? blocks : content.trim() ? [content] : [];

  return (
    <div
      className="prose prose-lg max-w-[700px] dark:prose-invert prose-headings:font-serif prose-headings:font-bold prose-headings:text-charcoal prose-p:text-lg prose-p:leading-[1.8] prose-p:text-charcoal prose-li:text-lg prose-li:leading-[1.8]"
    >
      {paragraphs.map((block, i) => (
        <p key={i} className="mb-8 last:mb-0 whitespace-pre-wrap">
          {block}
        </p>
      ))}
    </div>
  );
}

export default async function PostPage({ params }: PageProps) {
  const post = await getPost(params.slug);
  if (!post) notFound();

  const publishedStr = formatPublishedDate(post.published_at);
  const createdStr = formatPublishedDate(post.created_at);
  const updatedStr = formatPublishedDate(post.updated_at);
  const emoji = CATEGORY_LABELS[post.category].emoji;

  const metaParts: string[] = [];
  if (post.reading_time > 0) metaParts.push(`${post.reading_time}분 읽기`);
  if (publishedStr) metaParts.push(publishedStr);
  metaParts.push(`조회 ${post.view_count}`);

  return (
    <div className="flex min-h-screen flex-col bg-cream">
      <Header />
      <main className="flex-1 px-4 py-8 sm:px-8 sm:py-12">
        <div className="mx-auto w-full max-w-[700px]">
          {/* 상단: 좁은 헤더 블록 */}
          <div className="max-w-2xl">
            <Link
              href="/"
              className="inline-flex items-center gap-1 text-sm text-mute transition-base hover:text-caramel"
            >
              <span aria-hidden>←</span> 홈으로 돌아가기
            </Link>

            <div className="mt-8">
              <CategoryBadge category={post.category} variant="ko" />
            </div>

            <h1 className="font-serif mt-4 text-3xl font-bold leading-tight tracking-tight text-charcoal sm:text-4xl lg:text-5xl">
              {post.title}
            </h1>

            {post.excerpt ? (
              <p className="mt-5 text-lg italic leading-relaxed text-mute">
                {post.excerpt}
              </p>
            ) : null}

            <p className="mt-5 text-sm text-mute sm:text-base">
              {metaParts.join(" · ")}
            </p>

            <div
              className="mt-8 h-px w-full bg-caramel/80"
              aria-hidden
            />
          </div>

          {/* 썸네일 */}
          <div className="mt-10">
            {post.thumbnail_url ? (
              <div className="relative aspect-video w-full overflow-hidden rounded-lg">
                <Image
                  src={post.thumbnail_url}
                  alt={post.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 700px"
                  priority
                />
              </div>
            ) : (
              <div
                className={`flex h-[300px] w-full items-center justify-center rounded-lg text-7xl ${THUMB_GRADIENT[post.category]}`}
                aria-hidden
              >
                {emoji}
              </div>
            )}
          </div>

          {/* 본문 */}
          <div className="mx-auto mt-12 max-w-[700px]">
            <ArticleBody content={post.content} />
          </div>

          {/* 태그 */}
          {post.tags && post.tags.length > 0 ? (
            <div className="mx-auto mt-12 flex max-w-[700px] flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-caramel/40 bg-accent-light/10 px-3 py-1 text-xs font-medium text-caramel"
                >
                  #{tag}
                </span>
              ))}
            </div>
          ) : null}

          {/* 하단 */}
          <div className="mx-auto mt-16 max-w-[700px] border-t border-line-soft pt-8">
            <p className="text-xs text-mute sm:text-sm">
              작성 {createdStr || "—"}
              {updatedStr && updatedStr !== createdStr ? (
                <> · 수정 {updatedStr}</>
              ) : null}
            </p>
            <Link
              href="/"
              className="mt-6 inline-flex items-center justify-center rounded-lg bg-caramel px-8 py-3 text-sm font-medium text-white transition-base hover:bg-caramel/90 hover:shadow-hover"
            >
              다른 트렌드 보러가기 →
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
