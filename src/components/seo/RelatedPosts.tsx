import Link from "next/link";
import type { Post } from "@/types/database";
import { PostCard } from "@/components/ui/PostCard";
import { CARD_GRID } from "@/components/ui/card-grid";

type RelatedPostsProps = {
  posts: Post[];
  categoryName: string;
  categorySlug: string;
};

/**
 * 내부 링크 — 같은 카테고리 관련 글
 */
export function RelatedPosts({
  posts,
  categoryName,
  categorySlug,
}: RelatedPostsProps) {
  if (posts.length === 0) return null;

  return (
    <aside
      className="mt-16 border-t border-line-soft pt-10"
      aria-labelledby="related-posts-heading"
    >
      <h2
        id="related-posts-heading"
        className="text-lg font-bold text-charcoal"
      >
        {categoryName} 관련 글
      </h2>
      <p className="mt-1 text-sm text-mute">
        같은 카테고리에서 더 읽어보세요.
      </p>
      <ul className={`${CARD_GRID} mt-6`}>
        {posts.map((post) => (
          <li key={post.id}>
            <PostCard post={post} />
          </li>
        ))}
      </ul>
      <p className="mt-6">
        <Link
          href={`/category/${categorySlug}`}
          className="text-sm font-semibold text-caramel underline-offset-4 hover:underline"
        >
          {categoryName} 전체 아카이브 →
        </Link>
      </p>
    </aside>
  );
}
