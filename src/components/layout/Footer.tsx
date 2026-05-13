import Link from "next/link";

const footerNav = [
  { href: "/about", label: "소개" },
  { href: "/contact", label: "연락처" },
  { href: "/privacy", label: "개인정보처리방침" },
  { href: "/terms", label: "이용약관" },
] as const;

/**
 * 하단 푸터 — 사이트 소개, 정책 링크, 저작권
 */
export function Footer() {
  return (
    <footer className="border-t border-line-soft bg-cream/80 text-mute transition-colors">
      <div className="mx-auto flex max-w-[700px] flex-col items-center gap-8 px-4 py-12 text-center sm:px-6">
        <div>
          <p className="font-serif text-lg font-bold text-charcoal">봉구픽</p>
          <p className="mt-2 text-sm text-mute">
            매주 월·목, 새로운 트렌드 Pick
          </p>
        </div>

        <nav
          className="flex flex-wrap items-center justify-center gap-x-1 text-sm text-mute"
          aria-label="정책 및 안내"
        >
          {footerNav.map((item, index) => (
            <span key={item.href} className="inline-flex items-center">
              {index > 0 ? (
                <span className="px-2 text-mute/50" aria-hidden>
                  ·
                </span>
              ) : null}
              <Link
                href={item.href}
                className="transition-base hover:text-caramel"
              >
                {item.label}
              </Link>
            </span>
          ))}
        </nav>

        <p className="text-xs text-mute sm:text-sm">
          © 2026 BongguPick. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
