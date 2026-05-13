import type { Category } from "@/types/post";
import { getCategoryKo, getCategoryLabel } from "@/lib/categories";

type CategoryBadgeProps = {
  category: Category;
  /** label: 이모지+한글 / ko: 한글만 */
  variant?: "label" | "ko";
  className?: string;
};

/**
 * 칼럼 카테고리 뱃지 — 토큰 색상 기반 pill
 */
export function CategoryBadge({
  category,
  variant = "label",
  className = "",
}: CategoryBadgeProps) {
  const text =
    variant === "ko" ? getCategoryKo(category) : getCategoryLabel(category);

  return (
    <span
      className={`inline-flex max-w-full items-center rounded-full border border-caramel/35 bg-accent-light/15 px-2.5 py-0.5 text-[11px] font-medium tracking-wide text-caramel sm:text-xs ${className}`}
    >
      <span className="truncate">{text}</span>
    </span>
  );
}
