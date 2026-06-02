import Link from "next/link";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";

/**
 * 글 상세에서 notFound() 시 표시되는 404
 */
export default function PostNotFound() {
  return (
    <div className="flex min-h-screen flex-col bg-cream">
      <SiteHeader />
      <main className="flex flex-1 flex-col items-center justify-center px-4 py-24 text-center">
        <p className="font-serif text-2xl font-semibold text-charcoal sm:text-3xl">
          글을 찾을 수 없습니다
        </p>
        <p className="mt-4 max-w-md text-sm text-mute sm:text-base">
          주소가 바뀌었거나 삭제된 글일 수 있어요. 홈에서 최신 픽을
          둘러보세요.
        </p>
        <Link
          href="/"
          className="mt-10 inline-flex items-center justify-center rounded-lg bg-caramel px-8 py-3 text-sm font-medium text-white transition-base hover:bg-caramel/90 hover:shadow-hover"
        >
          홈으로 돌아가기
        </Link>
      </main>
      <SiteFooter />
    </div>
  );
}
