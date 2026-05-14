import { CATEGORY_LABELS, isCategorySlug } from "@/lib/categories";

type HeroCoverProps = {
  category: string;
  title: string;
  emoji?: string;
  /** 없으면 기본 매거진 라벨 */
  issueLabel?: string;
};

const GRADIENT: Record<string, string> = {
  support:
    "bg-gradient-to-br from-amber-100 via-orange-200 to-rose-200 dark:from-amber-900/40 dark:via-orange-900/40 dark:to-rose-900/40",
  it: "bg-gradient-to-br from-sky-100 via-indigo-200 to-purple-200 dark:from-sky-900/40 dark:via-indigo-900/40 dark:to-purple-900/40",
  daily:
    "bg-gradient-to-br from-emerald-100 via-teal-200 to-cyan-200 dark:from-emerald-900/40 dark:via-teal-900/40 dark:to-cyan-900/40",
};

const DEFAULT_GRADIENT =
  "bg-gradient-to-br from-paper via-line-soft to-cream dark:from-charcoal/80 dark:via-paper dark:to-charcoal";

/**
 * 글 상단 매거진형 커버 — 외부 이미지 없이 그라데이션·타이포만 사용
 */
export function HeroCover({
  category,
  title,
  emoji: emojiProp,
  issueLabel = "ISSUE 01 · 2026 WINTER",
}: HeroCoverProps) {
  const key = category.toLowerCase();
  const gradient = GRADIENT[key] ?? DEFAULT_GRADIENT;
  const emoji =
    emojiProp ??
    (isCategorySlug(key) ? CATEGORY_LABELS[key].emoji : "📰");
  const label = key === "support" ? "SUPPORT" : key.toUpperCase();

  return (
    <div
      className={`relative aspect-video w-full overflow-hidden rounded-2xl shadow-lg ring-1 ring-black/5 dark:ring-white/10 ${gradient}`}
    >
      <p
        className="pointer-events-none absolute inset-0 flex items-center justify-center text-8xl opacity-30 select-none"
        aria-hidden
      >
        {emoji}
      </p>
      <p className="absolute right-6 top-5 max-w-[60%] text-right text-[10px] font-medium uppercase tracking-[0.2em] text-charcoal/70 dark:text-cream/80 sm:right-8 sm:top-6 sm:text-xs">
        {issueLabel}
      </p>
      <div className="absolute bottom-6 left-6 right-6 sm:bottom-8 sm:left-8 sm:right-8">
        <p className="text-[10px] font-medium uppercase tracking-widest text-charcoal/70 dark:text-cream/75 sm:text-xs">
          ─── {label}
        </p>
        <h2 className="font-serif mt-2 line-clamp-2 text-balance text-xl font-bold leading-snug text-charcoal drop-shadow-sm dark:text-cream sm:text-2xl md:text-3xl">
          {title}
        </h2>
      </div>
    </div>
  );
}
