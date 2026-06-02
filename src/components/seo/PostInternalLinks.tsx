import Link from "next/link";
import type { Category } from "@/types/database";

type PostInternalLinksProps = {
  category: Category;
};

/** 게시글 하단 사이트 내부 링크 허브 */
export function PostInternalLinks({ category }: PostInternalLinksProps) {
  const links = [
    { href: "/", label: "홈" },
    { href: `/category/${category.slug}`, label: category.name },
    { href: "/categories", label: "전체 카테고리" },
    { href: "/resources", label: "무료 템플릿" },
    { href: "/about", label: "소개" },
    { href: "/contact", label: "연락처" },
  ];

  return (
    <nav
      className="mt-10 rounded-xl border border-line-soft bg-paper/60 p-5"
      aria-label="사이트 내부 링크"
    >
      <p className="text-xs font-semibold uppercase tracking-wide text-mute">
        더 둘러보기
      </p>
      <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="font-medium text-caramel hover:underline"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
