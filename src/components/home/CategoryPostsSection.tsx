import Link from "next/link";
import type { Category, Post } from "@/types/database";
import { PostCard } from "@/components/ui/PostCard";
import { SectionHead } from "@/components/ui/SectionHead";
import { CARD_GRID } from "@/components/ui/card-grid";

type CategoryPostsSectionProps = {
  category: Category | null;
  posts: Post[];
  /** 섹션 id (앵커) */
  id?: string;
};

/**
 * 카테고리별 글 미리보기 (AI 툴 연구 · 봉구 실험기록 등)
 */
export function CategoryPostsSection({
  category,
  posts,
  id,
}: CategoryPostsSectionProps) {
  if (!category) return null;

  return (
    <section
      id={id}
      className="border-t border-line-soft"
      aria-label={category.name}
    >
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 md:py-20 lg:px-8">
        <SectionHead
          title={category.name}
          subtitle={category.description || undefined}
        />
        {posts.length === 0 ? (
          <p className="rounded-xl border border-dashed border-line-soft py-12 text-center text-sm text-mute">
            아직 글이 없습니다.
          </p>
        ) : (
          <ul className={CARD_GRID}>
            {posts.map((post) => (
              <li key={post.id}>
                <PostCard post={post} />
              </li>
            ))}
          </ul>
        )}
        <p className="mt-8 text-center">
          <Link
            href={`/category/${category.slug}`}
            className="text-sm font-semibold text-caramel underline-offset-4 transition-base hover:underline"
          >
            {category.name} 전체 보기 →
          </Link>
        </p>
      </div>
    </section>
  );
}
