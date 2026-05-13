import Image from "next/image";
import Link from "next/link";
import type { Post } from "@/types/post";
import { CATEGORY_LABELS } from "@/lib/categories";
import { formatPublishedDate } from "@/lib/posts";
import { CategoryBadge } from "@/components/ui/CategoryBadge";

type PostCardProps = {
  post: Post;
};

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

/**
 * 최신글·목록용 카드 — 썸네일 또는 카테고리 그라데이션 + 뱃지 + 제목 + 발췌 + 메타
 */
export function PostCard({ post }: PostCardProps) {
  const href = `/post/${post.slug}`;
  const dateStr = formatPublishedDate(post.published_at);
  const emoji = CATEGORY_LABELS[post.category].emoji;

  return (
    <article className="group h-full">
      <Link
        href={href}
        className="flex h-full flex-col overflow-hidden rounded-md border border-line-soft bg-paper/80 shadow-soft transition-base hover:-translate-y-1 hover:border-caramel/30 hover:shadow-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-caramel focus-visible:ring-offset-2 focus-visible:ring-offset-cream"
      >
        <div
          className={`relative aspect-[16/10] w-full overflow-hidden bg-paper ${!post.thumbnail_url ? THUMB_GRADIENT[post.category] : ""}`}
        >
          {post.thumbnail_url ? (
            <Image
              src={post.thumbnail_url}
              alt={post.title}
              fill
              className="object-cover transition-base group-hover:scale-[1.02]"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <span
              className="absolute inset-0 flex items-center justify-center text-4xl opacity-90"
              aria-hidden
            >
              {emoji}
            </span>
          )}
        </div>
        <div className="flex flex-1 flex-col gap-3 p-4 sm:p-5">
          <CategoryBadge category={post.category} variant="ko" />
          <h3 className="text-balance text-base font-semibold leading-snug text-charcoal transition-base group-hover:text-caramel sm:text-lg">
            {post.title}
          </h3>
          {post.excerpt ? (
            <p className="line-clamp-2 text-sm leading-relaxed text-mute">
              {post.excerpt}
            </p>
          ) : null}
          <div className="mt-auto flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-mute">
            {dateStr ? <time dateTime={post.published_at ?? undefined}>{dateStr}</time> : null}
            {dateStr && post.reading_time > 0 ? (
              <span className="text-line-soft" aria-hidden>
                ·
              </span>
            ) : null}
            {post.reading_time > 0 ? (
              <span>{post.reading_time}분 읽기</span>
            ) : null}
          </div>
        </div>
      </Link>
    </article>
  );
}
