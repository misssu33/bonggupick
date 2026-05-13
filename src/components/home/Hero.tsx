/**
 * 메인 히어로 — 에디토리얼 타이포 + 구분선 + 서브카피
 */
export function Hero() {
  return (
    <section
      className="border-b border-line-soft"
      aria-labelledby="hero-heading"
    >
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
        <p className="text-xs tracking-wider text-mute">
          ── ISSUE 01 · 2026 WINTER
        </p>
        <h1
          id="hero-heading"
          className="font-serif mt-6 max-w-4xl text-5xl font-bold leading-[1.2] tracking-tight text-charcoal"
        >
          이번 주
          <br />
          트렌드{" "}
          <span className="font-serif font-bold italic text-caramel">Pick</span>
          .
        </h1>
        <div
          className="mt-6 h-px w-6 bg-caramel"
          aria-hidden
          role="presentation"
        />
        <p className="mt-6 text-lg text-mute">매주 월·목, 새 픽이 도착합니다.</p>
      </div>
    </section>
  );
}
