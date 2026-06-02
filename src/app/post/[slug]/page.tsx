import { cache } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { PostInternalLinks } from "@/components/seo/PostInternalLinks";
import { RelatedPosts } from "@/components/seo/RelatedPosts";
import { CategoryBadge } from "@/components/ui/CategoryBadge";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { HeroCover } from "@/components/post/HeroCover";
import { PickConclusion } from "@/components/post/PickConclusion";
import { StatCard } from "@/components/post/StatCard";
import { buildArticleSchema } from "@/lib/json-ld";
import { articleMetadata } from "@/lib/metadata";
import {
  formatPublishedDate,
  getAllPostSlugs,
  getPostBySlug,
  getRelatedPosts,
} from "@/lib/posts";

export const revalidate = 60;
export const dynamicParams = true;

type PageProps = {
  params: { slug: string };
};

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

const getPost = cache(async (slug: string) => getPostBySlug(slug));

const YOUTH_LEAP_SLUG = "youth-leap-account-truth";

const PROSE_MARKDOWN =
  "prose prose-lg prose-neutral max-w-none " +
  "prose-headings:font-bold prose-headings:text-charcoal " +
  "prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-4 prose-h2:border-l-4 prose-h2:border-accent-caramel prose-h2:pl-4 " +
  "prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3 " +
  "prose-p:leading-loose prose-p:text-base prose-p:my-4 " +
  "prose-strong:text-accent-caramel prose-strong:font-bold " +
  "prose-ul:my-4 prose-li:my-1 " +
  "prose-table:text-sm prose-table:my-8 " +
  "prose-th:bg-paper prose-th:p-2 " +
  "prose-td:p-2 prose-td:border-t prose-td:border-line-soft " +
  "prose-hr:my-12 prose-hr:border-line-soft " +
  "prose-a:text-accent-caramel prose-a:no-underline hover:prose-a:underline";

function formatMagazineIssueLabel(iso: string | null): string {
  if (!iso) return "EXPERIMENT ARCHIVE";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "EXPERIMENT ARCHIVE";
  const m = d.getMonth() + 1;
  const y = d.getFullYear();
  return `ARCHIVE ${y}.${String(m).padStart(2, "0")}`;
}

function splitBodyBlocks(content: string): string[] {
  const t = content.trim();
  if (!t) return [];
  return t.split(/\n\s*\n+/).filter(Boolean);
}

function stripStatPickMarkers(raw: string): string {
  return raw
    .replace(/^\s*\[STATCARD:[^\]]+\]\s*$/gim, "")
    .replace(/\s*\[PICK:[\s\S]*?\]\s*/gi, "");
}

function MarkdownArticle({ content }: { content: string }) {
  const md = stripStatPickMarkers(content).trim();
  if (!md) return null;
  return (
    <div className={PROSE_MARKDOWN}>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{md}</ReactMarkdown>
    </div>
  );
}

export async function generateMetadata({ params }: PageProps) {
  const post = await getPost(params.slug);
  if (!post) {
    return { title: "글을 찾을 수 없습니다", robots: { index: false, follow: false } };
  }
  return articleMetadata(post);
}

export default async function PostPage({ params }: PageProps) {
  const post = await getPost(params.slug);
  if (!post) notFound();

  const relatedPosts = await getRelatedPosts(post, 3);
  const publishedStr = formatPublishedDate(post.published_at);
  const createdStr = formatPublishedDate(post.created_at);
  const updatedStr = formatPublishedDate(post.updated_at);

  const cleaned = stripStatPickMarkers(post.content);
  const blocks = splitBodyBlocks(cleaned);
  const isYouthLeap = params.slug === YOUTH_LEAP_SLUG;
  const hasSplit = isYouthLeap && blocks.length > 2;
  const headText = hasSplit ? blocks.slice(0, 2).join("\n\n") : cleaned;
  const tailText = hasSplit ? blocks.slice(2).join("\n\n") : "";

  return (
    <div className="flex min-h-screen flex-col bg-cream">
      <JsonLd data={buildArticleSchema(post)} />
      <SiteHeader />
      <main className="flex-1 px-4 py-8 sm:px-8 sm:py-12">
        <article
          className="mx-auto w-full max-w-[700px]"
          itemScope
          itemType="https://schema.org/Article"
        >
          <Breadcrumbs
            items={[
              { label: "홈", href: "/" },
              { label: "카테고리", href: "/categories" },
              {
                label: post.category.name,
                href: `/category/${post.category.slug}`,
              },
              { label: post.title },
            ]}
          />

          <header>
            <Link
              href={`/category/${post.category.slug}`}
              className="inline-block"
            >
              <CategoryBadge category={post.category} variant="label" />
            </Link>

            <h1
              className="mt-4 text-3xl font-bold leading-tight tracking-tight text-charcoal sm:text-4xl lg:text-5xl"
              itemProp="headline"
            >
              {post.title}
            </h1>

            {post.excerpt ? (
              <p
                className="mt-5 text-lg leading-relaxed text-mute"
                itemProp="description"
              >
                {post.excerpt}
              </p>
            ) : null}

            <div className="mt-5 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-mute">
              {post.reading_time > 0 ? (
                <span>{post.reading_time}분 읽기</span>
              ) : null}
              {post.published_at ? (
                <>
                  <span className="text-line-soft" aria-hidden>
                    ·
                  </span>
                  <time dateTime={post.published_at} itemProp="datePublished">
                    {publishedStr}
                  </time>
                </>
              ) : null}
              <meta itemProp="dateModified" content={post.updated_at} />
              <span className="text-line-soft" aria-hidden>
                ·
              </span>
              <span>조회 {post.view_count}</span>
            </div>

            <div className="mt-8 h-px w-full bg-line-soft" aria-hidden />
          </header>

          <figure className="mt-10">
            <HeroCover
              category={post.category}
              title={post.title}
              issueLabel={formatMagazineIssueLabel(post.published_at)}
            />
          </figure>

          <section className="mt-12" itemProp="articleBody" aria-label="본문">
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
                    소비·저축 패턴과 맞을 때 이득이 나는 구조예요.
                  </p>
                </PickConclusion>
              </>
            ) : (
              <MarkdownArticle content={post.content} />
            )}
          </section>

          {post.tags && post.tags.length > 0 ? (
            <ul
              className="mt-12 flex flex-wrap gap-2"
              aria-label="태그"
              itemProp="keywords"
            >
              {post.tags.map((tag) => (
                <li key={tag}>
                  <span className="rounded-full border border-caramel/40 bg-accent-light/10 px-3 py-1 text-xs font-medium text-caramel">
                    #{tag}
                  </span>
                </li>
              ))}
            </ul>
          ) : null}

          <PostInternalLinks category={post.category} />

          <RelatedPosts
            posts={relatedPosts}
            categoryName={post.category.name}
            categorySlug={post.category.slug}
          />

          <footer className="mt-12 border-t border-line-soft pt-8">
            <p className="text-xs text-mute sm:text-sm">
              작성 {createdStr || "—"}
              {updatedStr && updatedStr !== createdStr ? (
                <> · 수정 {updatedStr}</>
              ) : null}
            </p>
            <Link
              href="/#latest"
              className="mt-6 inline-flex items-center justify-center rounded-lg bg-caramel px-8 py-3 text-sm font-medium text-white transition-base hover:bg-accent-primary-hover hover:shadow-hover"
            >
              최신 실험 더 보기 →
            </Link>
          </footer>
        </article>
      </main>
      <SiteFooter />
    </div>
  );
}
