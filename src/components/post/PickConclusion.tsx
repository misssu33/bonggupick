import type { ReactNode } from "react";

type PickConclusionProps = {
  children: ReactNode;
};

/**
 * 글 맺음 — 봉구픽 픽 톤의 결론 카드
 */
export function PickConclusion({ children }: PickConclusionProps) {
  return (
    <div className="my-12 rounded-2xl border border-line-soft bg-charcoal p-8 text-cream shadow-soft dark:border-line-soft dark:bg-cream/5 dark:text-charcoal md:p-12">
      <div className="h-1 w-16 rounded-full bg-caramel" aria-hidden />
      <p className="mt-6 text-[10px] font-medium uppercase tracking-[0.25em] text-cream/70 dark:text-mute sm:text-xs">
        ─── BONGGU&apos;S PICK
      </p>
      <div className="font-serif mt-6 text-lg font-semibold leading-relaxed text-cream dark:text-charcoal sm:text-xl md:text-2xl">
        {children}
      </div>
    </div>
  );
}
