import Image from "next/image";
import Link from "next/link";
import type { Post } from "@/types/database";
import { formatPublishedDate } from "@/lib/posts";
import { CategoryBadge } from "@/components/ui/CategoryBadge";

type PostCardProps = {
  post: Post;
  featured?: boolean;
};

const THUMB_GRADIENT: Record<string, string> = {
  tiktok: "bg-gradient-to-br from-blue-100 via-slate-50 to-white",
  shorts: "bg-gradient-to-br from-indigo-100 via-slate-50 to-white",
  "ai-detail": "bg-gradient-to-br from-sky-100 via-slate-50 to-white",
  life: "bg-gradient-to-br from-emerald-50 via-slate-50 to-white",
  "ai-tools": "bg-gradient-to-br from-violet-100 via-slate-50 to-white",
  experiment: "bg-gradient-to-br from-slate-200 via-slate-50 to-white",
};

const DEFAULT_GRADIENT =
  "bg-gradient-to-br from-slate-100 via-slate-50 to-white";

/**
 * 게시글 카드
 */
export function PostCard({ post, featured = false }: PostCardProps) {
  const href = `/post/${post.slug}`;
  const dateStr = formatPublishedDate(post.published_at);
  const slug = post.category.slug;
  const gradient = THUMB_GRADIENT[slug] ?? DEFAULT_GRADIENT;
  const emoji = post.category.emoji;

  return (
    <article className="group h-full">
      <Link
        href={href}
        className={`flex h-full flex-col overflow-hidden rounded-xl border bg-cream shadow-soft transition-base hover:-translate-y-0.5 hover:shadow-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-caramel focus-visible:ring-offset-2 ${
          featured
            ? "border-caramel/40 ring-1 ring-caramel/20"
            : "border-line-soft hover:border-caramel/25"
        }`}
      >
        <div
          className={`relative aspect-[16/10] w-full overflow-hidden bg-paper ${!post.thumbnail_url ? gradient : ""}`}
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
          {featured || post.is_featured ? (
            <span className="absolute left-3 top-3 rounded-full bg-caramel px-2.5 py-0.5 text-[10px] font-semibold text-white">
              FEATURED
            </span>
          ) : null}
        </div>
        <div className="flex flex-1 flex-col gap-3 p-4 sm:p-5">
          <CategoryBadge category={post.category} variant="name" />
          <h3 className="text-balance text-base font-semibold leading-snug text-charcoal transition-base group-hover:text-caramel sm:text-lg">
            {post.title}
          </h3>
          {post.excerpt ? (
            <p className="line-clamp-2 text-sm leading-relaxed text-mute">
              {post.excerpt}
            </p>
          ) : null}
          <div className="mt-auto flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-mute">
            {dateStr ? (
              <time dateTime={post.published_at ?? undefined}>{dateStr}</time>
            ) : null}
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
