import Link from "next/link";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";

/**
 * 존재하지 않는 카테고리 slug 접근 시
 */
export default function CategoryNotFound() {
  return (
    <div className="flex min-h-screen flex-col bg-cream">
      <SiteHeader />
      <main className="flex flex-1 flex-col items-center justify-center px-4 py-16 text-center">
        <p className="text-2xl font-semibold text-charcoal">
          찾을 수 없는 카테고리예요
        </p>
        <p className="mt-3 text-sm text-mute">
          주소가 올바른지 확인해 주세요.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex rounded-lg bg-caramel px-6 py-3 text-sm font-semibold text-white transition-base hover:bg-accent-primary-hover"
        >
          홈으로 돌아가기
        </Link>
      </main>
      <SiteFooter />
    </div>
  );
}
