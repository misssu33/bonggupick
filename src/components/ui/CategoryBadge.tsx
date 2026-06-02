import type { Category } from "@/types/database";

type CategoryBadgeProps = {
  category: Category;
  /** label: 이모지+이름 / name: 이름만 */
  variant?: "label" | "name";
  className?: string;
};

/**
 * 카테고리 뱃지
 */
export function CategoryBadge({
  category,
  variant = "label",
  className = "",
}: CategoryBadgeProps) {
  const text =
    variant === "name"
      ? category.name
      : `${category.emoji} ${category.name}`;

  return (
    <span
      className={`inline-flex max-w-full items-center rounded-full border border-caramel/35 bg-accent-light/15 px-2.5 py-0.5 text-[11px] font-medium tracking-wide text-caramel sm:text-xs ${className}`}
    >
      <span className="truncate">{text}</span>
    </span>
  );
}
