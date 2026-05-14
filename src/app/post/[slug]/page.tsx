import { cache } from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { CategoryBadge } from "@/components/ui/CategoryBadge";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { HeroCover } from "@/components/post/HeroCover";
import { PickConclusion } from "@/components/post/PickConclusion";
import { StatCard } from "@/components/post/StatCard";
import { formatPublishedDate, getPostBySlug } from "@/lib/posts";

const getPost = cache(async (slug: string) => getPostBySlug(slug));

/** 청년도약계좌 글 — StatCard·PickConclusion을 본문 흐름에 끼워 넣기 */
const YOUTH_LEAP_SLUG = "youth-leap-account-truth";

/** 프로젝트 토큰에 맞춤 (cream-100 등 기본 팔레트 없음 → paper·line-soft) */
const PROSE_MARKDOWN =
  "prose prose-lg prose-neutral max-w-none dark:prose-invert " +
  "prose-headings:font-noto-serif prose-headings:font-bold " +
  "prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-4 prose-h2:border-l-4 prose-h2:border-accent-caramel prose-h2:pl-4 " +
  "prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3 " +
  "prose-p:leading-loose prose-p:text-base prose-p:my-4 " +
  "prose-strong:text-accent-caramel prose-strong:font-bold " +
  "prose-ul:my-4 prose-li:my-1 " +
  "prose-table:text-sm prose-table:my-8 " +
  "prose-th:bg-paper dark:prose-th:bg-charcoal/25 prose-th:p-2 " +
  "prose-td:p-2 prose-td:border-t prose-td:border-line-soft " +
  "prose-hr:my-12 prose-hr:border-line-soft " +
  "prose-a:text-accent-caramel prose-a:no-underline hover:prose-a:underline";

type PageProps = {
  params: { slug: string };
};

/** HeroCover 우측 상단 ISSUE 라벨 (발행일 기준) */
function formatMagazineIssueLabel(iso: string | null): string {
  if (!iso) return "ISSUE 01 · 2026 WINTER";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "ISSUE 01 · 2026 WINTER";
  const m = d.getMonth() + 1;
  const y = d.getFullYear();
  const season =
    m <= 2 || m === 12
      ? "WINTER"
      : m <= 5
        ? "SPRING"
        : m <= 8
          ? "SUMMER"
          : "AUTUMN";
  return `ISSUE ${String(m).padStart(2, "0")} · ${y} ${season}`;
}

function splitBodyBlocks(content: string): string[] {
  const t = content.trim();
  if (!t) return [];
  return t.split(/\n\s*\n+/).filter(Boolean);
}

/** [STATCARD:…]·[PICK:…] 마커는 페이지에서 컴포넌트로 처리하므로 문자열에서 제거 */
function stripStatPickMarkers(raw: string): string {
  return raw
    .replace(/^\s*\[STATCARD:[^\]]+\]\s*$/gim, "")
    .replace(/\s*\[PICK:[\s\S]*?\]\s*/gi, "");
}

/** 마크다운 본문 (GFM 테이블·취소선 등) */
function MarkdownArticle({ content }: { content: string }) {
  const md = stripStatPickMarkers(content).trim();
  if (!md) return null;
  return (
    <div className={PROSE_MARKDOWN}>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{md}</ReactMarkdown>
    </div>
  );
}

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

export default async function PostPage({ params }: PageProps) {
  const post = await getPost(params.slug);
  if (!post) notFound();

  const publishedStr = formatPublishedDate(post.published_at);
  const createdStr = formatPublishedDate(post.created_at);
  const updatedStr = formatPublishedDate(post.updated_at);

  const metaParts: string[] = [];
  if (post.reading_time > 0) metaParts.push(`${post.reading_time}분 읽기`);
  if (publishedStr) metaParts.push(publishedStr);
  metaParts.push(`조회 ${post.view_count}`);

  const cleaned = stripStatPickMarkers(post.content);
  const blocks = splitBodyBlocks(cleaned);
  const isYouthLeap = params.slug === YOUTH_LEAP_SLUG;
  const hasSplit = isYouthLeap && blocks.length > 2;
  const headText = hasSplit ? blocks.slice(0, 2).join("\n\n") : cleaned;
  const tailText = hasSplit ? blocks.slice(2).join("\n\n") : "";

  return (
    <div className="flex min-h-screen flex-col bg-cream">
      <Header />
      <main className="flex-1 px-4 py-8 sm:px-8 sm:py-12">
        <div className="mx-auto w-full max-w-[700px]">
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

            <div className="mt-8 h-px w-full bg-caramel/80" aria-hidden />
          </div>

          <div className="mt-10">
            <HeroCover
              category={post.category}
              title={post.title}
              issueLabel={formatMagazineIssueLabel(post.published_at)}
            />
          </div>

          <div className="mx-auto mt-12 max-w-[700px]">
            {isYouthLeap ? (
              <>
                <MarkdownArticle content={headText} />
                <StatCard
                  number="14.9%"
                  label="청년도약계좌 중도해지율 (2024년)"
                  source="매일경제"
                />
                {tailText ? <MarkdownArticle content={tailText} /> : null}
                <PickConclusion>
                  <p>
                    도약계좌는 &apos;무조건 들어야 하는 상품&apos;이 아니라, 내
                    소비·저축 패턴과 맞을 때 이득이 나는 구조예요. 해지율이
                    높다는 건 아이러니하게도, &apos;필요한 사람에게 제대로
                    안내가 됐다&apos;는 신호이기도 합니다. 가입 전 본인
                    자금·목표를 한 번 더 점검해 보세요.
                  </p>
                </PickConclusion>
              </>
            ) : (
              <MarkdownArticle content={post.content} />
            )}
          </div>

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
