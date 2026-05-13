"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import type { Category } from "@/types/post";
import { CATEGORY_LABELS } from "@/lib/categories";

const navLinks: { category: Category; href: string; label: string }[] = [
  { category: "daily", href: "#", label: "일상" },
  { category: "it", href: "#", label: "IT" },
  { category: "support", href: "#", label: "지원사업" },
];

/**
 * 다크/라이트 토글 — 마운트 후에만 아이콘 표시(하이드레이션 불일치 방지)
 */
function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        className="h-10 w-10 shrink-0 rounded-md"
        aria-hidden
        /* 레이아웃 유지용 자리 — 마운트 후 🌙/☀️ 버튼으로 교체 */
      />
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md text-lg transition-base hover:bg-paper hover:text-charcoal"
      aria-label={isDark ? "라이트 모드로 전환" : "다크 모드로 전환"}
      title={isDark ? "라이트 모드" : "다크 모드"}
    >
      <span aria-hidden>{isDark ? "☀️" : "🌙"}</span>
    </button>
  );
}

/**
 * 상단 네비 — 고정 아님(일반 스크롤), 모바일 햄버거
 */
export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="border-b border-line-soft transition-colors">
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          <Link
            href="/"
            className="flex flex-wrap items-baseline gap-2 transition-base hover:opacity-90"
          >
            <span className="font-serif text-xl font-bold tracking-tight text-charcoal sm:text-2xl">
              봉구픽
            </span>
            <span className="text-xs font-medium text-mute sm:text-sm">
              BongguPick
            </span>
          </Link>

          <div className="flex items-center gap-1 sm:gap-2">
            <nav
              className="hidden items-center gap-6 md:flex"
              aria-label="주 메뉴"
            >
              {navLinks.map((item) => (
                <Link
                  key={item.category}
                  href={item.href}
                  className="text-sm text-charcoal transition-base hover:text-caramel"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <ThemeToggle />
            <button
              type="button"
              className="rounded-md p-2 text-charcoal transition-base hover:bg-paper md:hidden"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? "메뉴 닫기" : "메뉴 열기"}
            >
              {open ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden
                >
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden
                >
                  <path d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        <nav
          id="mobile-nav"
          className={`mt-4 flex flex-col gap-3 border-t border-line-soft pt-4 transition-colors md:hidden ${
            open ? "" : "hidden"
          }`}
          aria-label="모바일 메뉴"
        >
          {navLinks.map((item) => (
            <Link
              key={item.category}
              href={item.href}
              className="text-sm text-charcoal transition-base hover:text-caramel"
              onClick={() => setOpen(false)}
            >
              {CATEGORY_LABELS[item.category].emoji} {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
