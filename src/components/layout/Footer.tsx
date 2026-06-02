import Link from "next/link";
import type { Category } from "@/types/database";

const footerNav = [
  { href: "/about", label: "소개" },
  { href: "/resources", label: "무료 템플릿" },
  { href: "/contact", label: "연락처" },
  { href: "/privacy", label: "개인정보처리방침" },
  { href: "/terms", label: "이용약관" },
] as const;

type FooterProps = {
  categories: Category[];
};

/**
 * 하단 푸터
 */
export function Footer({ categories }: FooterProps) {
  const cardCategories = categories.filter(
    (c) => c.slug !== "experiment" && c.slug !== "ai-tools",
  );
  const experiment = categories.find((c) => c.slug === "experiment");

  return (
    <footer className="border-t border-line-soft bg-paper text-mute">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <p className="text-lg font-bold text-charcoal">봉구픽</p>
            <p className="mt-2 text-sm leading-relaxed">
              AI로 쇼핑과 콘텐츠를 연구하는
              <br />
              TikTok·쇼츠·AI 상세 운영 아카이브
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-charcoal">
              카테고리
            </p>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link
                  href="/categories"
                  className="font-medium text-caramel transition-base hover:underline"
                >
                  전체 카테고리
                </Link>
              </li>
              {cardCategories.map((cat) => (
                <li key={cat.id}>
                  <Link
                    href={`/category/${cat.slug}`}
                    className="transition-base hover:text-caramel"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
              {experiment ? (
                <li>
                  <Link
                    href={`/category/${experiment.slug}`}
                    className="transition-base hover:text-caramel"
                  >
                    {experiment.name}
                  </Link>
                </li>
              ) : null}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-charcoal">
              안내
            </p>
            <nav
              className="mt-3 flex flex-col gap-2 text-sm"
              aria-label="정책 및 안내"
            >
              {footerNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="transition-base hover:text-caramel"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        <p className="mt-10 border-t border-line-soft pt-8 text-center text-xs text-mute">
          © {new Date().getFullYear()} BongguPick. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
