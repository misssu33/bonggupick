import Link from "next/link";
import type { Category } from "@/types/database";
import { SectionHead } from "@/components/ui/SectionHead";
import { CARD_GRID } from "@/components/ui/card-grid";

type CategoryCardsProps = {
  categories: Category[];
};

/**
 * Supabase categories 기반 카테고리 카드
 */
export function CategoryCards({ categories }: CategoryCardsProps) {
  return (
    <section aria-label="연구 카테고리">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 md:py-20 lg:px-8">
        <SectionHead
          title="연구 카테고리"
          subtitle="TikTok·쇼츠·AI 상세·생활형 상품·AI 툴까지 실험 아카이브"
        />
        {categories.length === 0 ? (
          <p className="rounded-xl border border-dashed border-line-soft py-12 text-center text-sm text-mute">
            등록된 카테고리가 없습니다.
          </p>
        ) : (
          <ul className={CARD_GRID}>
            {categories.map((cat) => (
              <li key={cat.id}>
                <article>
                  <Link
                    href={`/category/${cat.slug}`}
                    className="group flex h-full flex-col gap-3 rounded-xl border border-line-soft bg-cream p-6 transition-base hover:border-caramel/30 hover:shadow-hover sm:p-7"
                  >
                    <span className="text-2xl" aria-hidden>
                      {cat.emoji}
                    </span>
                    <h3 className="text-lg font-semibold text-charcoal group-hover:text-caramel">
                      {cat.name}
                    </h3>
                    {cat.description ? (
                      <p className="text-sm leading-relaxed text-mute">
                        {cat.description}
                      </p>
                    ) : null}
                    <span className="mt-auto text-xs font-medium text-caramel">
                      아카이브 보기 →
                    </span>
                  </Link>
                </article>
              </li>
            ))}
          </ul>
        )}
        <p className="mt-8 text-center">
          <Link
            href="/categories"
            className="text-sm font-semibold text-caramel hover:underline"
          >
            전체 카테고리 보기 →
          </Link>
        </p>
      </div>
    </section>
  );
}
