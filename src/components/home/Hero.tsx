import Link from "next/link";

/**
 * 메인 히어로 — 연구소 톤, CTA 2개
 */
export function Hero() {
  return (
    <section
      className="border-b border-line-soft bg-paper/40"
      aria-labelledby="hero-heading"
    >
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20 md:py-28 lg:px-8">
        <p className="inline-flex items-center gap-2 rounded-full border border-line-soft bg-cream px-3 py-1 text-xs font-medium text-mute">
          <span
            className="h-1.5 w-1.5 rounded-full bg-caramel"
            aria-hidden
          />
          AI 쇼핑·숏폼 운영 연구소
        </p>

        <h1
          id="hero-heading"
          className="mt-6 max-w-3xl text-balance text-3xl font-bold leading-tight tracking-tight text-charcoal sm:text-4xl md:text-5xl"
        >
          AI로 쇼핑과 콘텐츠를 연구합니다.
        </h1>

        <p className="mt-5 max-w-2xl text-base leading-relaxed text-mute sm:text-lg">
          TikTok Affiliate · AI 상세페이지 · 쇼츠 전환 구조 아카이브
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
          <Link
            href="/#latest"
            className="inline-flex items-center justify-center rounded-lg bg-caramel px-6 py-3 text-sm font-semibold text-white transition-base hover:bg-accent-primary-hover hover:shadow-hover"
          >
            최신 실험 보기
          </Link>
          <Link
            href="/resources"
            className="inline-flex items-center justify-center rounded-lg border border-line-soft bg-cream px-6 py-3 text-sm font-semibold text-charcoal transition-base hover:border-caramel/40 hover:bg-paper"
          >
            무료 템플릿 받기
          </Link>
        </div>
      </div>
    </section>
  );
}
