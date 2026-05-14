import Link from "next/link";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";

/**
 * 존재하지 않는 카테고리 slug 접근 시
 */
export default function CategoryNotFound() {
  return (
    <div className="flex min-h-screen flex-col bg-cream">
      <Header />
      <main className="flex flex-1 flex-col items-center justify-center px-4 py-16 text-center">
        <p className="font-serif text-2xl font-semibold text-charcoal">
          카테고리를 찾을 수 없습니다
        </p>
        <p className="mt-3 text-sm text-mute">
          주소가 올바른지 확인해 주세요.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex rounded-lg bg-caramel px-6 py-3 text-sm font-medium text-white transition-base hover:bg-caramel/90"
        >
          홈으로 돌아가기
        </Link>
      </main>
      <Footer />
    </div>
  );
}
