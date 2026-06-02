import type { Post } from "@/types/database";
import { PostCard } from "@/components/ui/PostCard";
import { SectionHead } from "@/components/ui/SectionHead";
import { CARD_GRID } from "@/components/ui/card-grid";

type LatestPostsProps = {
  featuredPosts: Post[];
  posts: Post[];
};

/**
 * 피처드 우선 + 최신 실험 글
 */
export function LatestPosts({ featuredPosts, posts }: LatestPostsProps) {
  const featuredIds = new Set(featuredPosts.map((p) => p.id));
  const rest = posts.filter((p) => !featuredIds.has(p.id));
  const hasAny = featuredPosts.length > 0 || rest.length > 0;

  return (
    <section id="latest" aria-label="최신 실험">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 md:py-20 lg:px-8">
        <SectionHead
          title="최신 실험"
          subtitle="주목 실험 글이 상단에 우선 노출됩니다"
        />

        {!hasAny ? (
          <p className="rounded-xl border border-dashed border-line-soft bg-paper py-16 text-center text-sm text-mute">
            아직 발행된 글이 없습니다.
          </p>
        ) : (
          <>
            {featuredPosts.length > 0 ? (
              <ul className={`${CARD_GRID} mb-8`}>
                {featuredPosts.map((post) => (
                  <li key={post.id}>
                    <PostCard post={post} featured />
                  </li>
                ))}
              </ul>
            ) : null}
            {rest.length > 0 ? (
              <ul className={CARD_GRID}>
                {rest.map((post) => (
                  <li key={post.id}>
                    <PostCard post={post} />
                  </li>
                ))}
              </ul>
            ) : null}
          </>
        )}
      </div>
    </section>
  );
}
