import type { Category } from "@/types/database";

type HeroCoverProps = {
  category: Category;
  title: string;
  issueLabel?: string;
};

const GRADIENT: Record<string, string> = {
  tiktok: "bg-gradient-to-br from-blue-100 via-slate-100 to-white",
  shorts: "bg-gradient-to-br from-indigo-100 via-slate-100 to-white",
  "ai-detail": "bg-gradient-to-br from-sky-100 via-slate-100 to-white",
  life: "bg-gradient-to-br from-emerald-50 via-slate-100 to-white",
  "ai-tools": "bg-gradient-to-br from-violet-100 via-slate-100 to-white",
  experiment: "bg-gradient-to-br from-slate-200 via-slate-100 to-white",
};

const DEFAULT_GRADIENT =
  "bg-gradient-to-br from-slate-100 via-slate-50 to-white";

/**
 * 글 상단 커버
 */
export function HeroCover({
  category,
  title,
  issueLabel = "EXPERIMENT ARCHIVE",
}: HeroCoverProps) {
  const gradient = GRADIENT[category.slug] ?? DEFAULT_GRADIENT;

  return (
    <div
      className={`relative aspect-video w-full overflow-hidden rounded-xl border border-line-soft shadow-soft ${gradient}`}
    >
      <p
        className="pointer-events-none absolute inset-0 flex items-center justify-center text-8xl opacity-25 select-none"
        aria-hidden
      >
        {category.emoji}
      </p>
      <p className="absolute right-6 top-5 max-w-[60%] text-right text-[10px] font-medium uppercase tracking-widest text-mute sm:right-8 sm:top-6 sm:text-xs">
        {issueLabel}
      </p>
      <div className="absolute bottom-6 left-6 right-6 sm:bottom-8 sm:left-8 sm:right-8">
        <p className="text-[10px] font-medium uppercase tracking-widest text-mute sm:text-xs">
          {category.name}
        </p>
        <h2 className="mt-2 line-clamp-2 text-balance text-xl font-bold leading-snug text-charcoal sm:text-2xl md:text-3xl">
          {title}
        </h2>
      </div>
    </div>
  );
}
