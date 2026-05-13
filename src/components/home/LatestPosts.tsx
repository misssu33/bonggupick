import type { Post } from "@/types/post";
import { PostCard } from "@/components/ui/PostCard";

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

type LatestPostsProps = {
  posts: Post[];
};

/**
 * 최신 칼럼 그리드 — 모바일 1열, 태블릿 2열, 데스크톱 3열
 */
export function LatestPosts({ posts }: LatestPostsProps) {
  return (
    <section aria-label="최신 칼럼">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
        <SectionHead title="LATEST" />

        {posts.length === 0 ? (
          <p className="rounded-lg border border-dashed border-line-soft bg-paper/50 py-16 text-center text-sm text-mute">
            아직 발행된 글이 없습니다.
          </p>
        ) : (
          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {posts.map((post) => (
              <li key={post.id}>
                <PostCard post={post} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
