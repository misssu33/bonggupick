import Link from "next/link";
import type { Category } from "@/types/post";
import { CATEGORY_LABELS } from "@/lib/categories";

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

const ORDER: Category[] = ["daily", "it", "support"];

const BLURB: Record<Category, string> = {
  daily: "살림·습관·생산성, 오늘 바로 쓰는 팁",
  it: "도구, 바이브코딩, 디지털 트렌드",
  support: "신생아·유아부터 노인까지, 복지·지원 한눈에",
};

/**
 * 카테고리 바로가기 — 3열 카드(모바일 1열)
 */
export function CategoryNav() {
  return (
    <section className="border-b border-line-soft" aria-label="카테고리별 둘러보기">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
        <SectionHead title="BY CATEGORY" />
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6">
          {ORDER.map((slug) => {
            const meta = CATEGORY_LABELS[slug];
            return (
              <li key={slug}>
                <Link
                  href="#"
                  className="flex h-full flex-col gap-3 rounded-lg border border-line-soft bg-cream p-6 transition-base hover:border-caramel hover:bg-paper sm:p-8"
                >
                  <span className="text-4xl" aria-hidden>
                    {meta.emoji}
                  </span>
                  <span className="font-serif text-xl font-semibold text-charcoal">
                    {meta.ko}
                  </span>
                  <span className="text-sm leading-relaxed text-mute">
                    {BLURB[slug]}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
