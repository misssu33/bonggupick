"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { isNavActive, type NavItem } from "@/lib/navigation";

const linkClass = (active: boolean) =>
  `shrink-0 whitespace-nowrap text-[13px] transition-base lg:text-sm ${
    active
      ? "font-semibold text-caramel"
      : "text-charcoal hover:text-caramel"
  }`;

type HeaderProps = {
  navItems: NavItem[];
};

/**
 * 상단 네비 — xl 데스크톱 / lg~xl 가로 스크롤 / 모바일 햄버거
 */
export function Header({ navItems }: HeaderProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-line-soft bg-cream/95 backdrop-blur-sm">
      <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-3">
          <Link
            href="/"
            className="min-w-0 shrink-0 transition-base hover:opacity-90"
            onClick={() => setOpen(false)}
          >
            <span className="text-lg font-bold tracking-tight text-charcoal sm:text-xl">
              봉구픽
            </span>
            <span className="mt-0.5 block truncate text-[11px] font-medium text-mute sm:text-xs">
              AI 쇼핑·숏폼 연구소
            </span>
          </Link>

          <nav
            className="hidden max-w-[58%] overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] lg:flex xl:max-w-none xl:overflow-visible [&::-webkit-scrollbar]:hidden"
            aria-label="주 메뉴"
          >
            <div className="flex items-center gap-4 xl:gap-5">
              {navItems.map((item) => {
                const active = isNavActive(pathname, item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={linkClass(active)}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </nav>

          <button
            type="button"
            className="shrink-0 rounded-md p-2 text-charcoal transition-base hover:bg-paper lg:hidden"
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

        <nav
          id="mobile-nav"
          className={`mt-4 flex flex-col gap-1 border-t border-line-soft pt-4 lg:hidden ${
            open ? "" : "hidden"
          }`}
          aria-label="모바일 메뉴"
        >
          {navItems.map((item) => {
            const active = isNavActive(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-md px-2 py-2.5 text-sm ${linkClass(active)}`}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
