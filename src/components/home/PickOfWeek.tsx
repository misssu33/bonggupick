import Image from "next/image";
import Link from "next/link";
import type { Post } from "@/types/post";
import { CATEGORY_LABELS } from "@/lib/categories";
import { formatPublishedDate } from "@/lib/posts";
import { CategoryBadge } from "@/components/ui/CategoryBadge";

function SectionHead({ title }: { title: string }) {
  return (
    <div className="mb-8 flex items-center gap-4 sm:mb-10">
      <h2 className="shrink-0 text-sm font-medium uppercase tracking-widest text-mute">
        {title}
      </h2>
      <div className="h-px flex-1 bg-line-soft" aria-hidden />
    </div>
  );
}

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

type PickOfWeekProps = {
  post: Post;
};

/**
 * 이번 주 픽 — 60/40 벤토형(데스크톱), 모바일 세로 스택
 */
export function PickOfWeek({ post }: PickOfWeekProps) {
  const href = `/post/${post.slug}`;
  const dateStr = formatPublishedDate(post.published_at);
  const emoji = CATEGORY_LABELS[post.category].emoji;

  return (
    <section className="border-b border-line-soft" aria-label="이번 주 추천 칼럼">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
        <SectionHead title="PICK OF THE WEEK" />

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-5 lg:gap-6">
          <Link
            href={href}
            className={`relative aspect-[4/3] overflow-hidden rounded-lg transition-base hover:opacity-95 lg:col-span-3 lg:aspect-auto lg:min-h-[320px] ${!post.thumbnail_url ? THUMB_GRADIENT[post.category] : "bg-paper"}`}
          >
            {post.thumbnail_url ? (
              <Image
                src={post.thumbnail_url}
                alt={post.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 60vw"
                priority
              />
            ) : (
              <span
                className="absolute inset-0 flex items-center justify-center text-6xl opacity-90"
                aria-hidden
              >
                {emoji}
              </span>
            )}
          </Link>

          <div className="flex flex-col justify-center rounded-lg bg-paper p-8 lg:col-span-2">
            <CategoryBadge category={post.category} variant="label" />
            <h3 className="font-serif mt-4 text-2xl font-semibold leading-snug text-charcoal sm:text-3xl">
              {post.title}
            </h3>
            {post.excerpt ? (
              <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-mute sm:text-base">
                {post.excerpt}
              </p>
            ) : null}
            <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-mute">
              {post.reading_time > 0 ? (
                <span>{post.reading_time}분 읽기</span>
              ) : null}
              {post.reading_time > 0 && dateStr ? (
                <span className="text-line-soft" aria-hidden>
                  |
                </span>
              ) : null}
              {dateStr ? <time dateTime={post.published_at ?? undefined}>{dateStr}</time> : null}
            </div>
            <p className="mt-8">
              <Link
                href={href}
                className="text-sm font-medium text-caramel underline-offset-4 transition-base hover:underline"
              >
                칼럼 읽기 →
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
