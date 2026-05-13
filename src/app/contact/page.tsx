import type { Metadata } from "next";
import Link from "next/link";
import { EmailCtaBox } from "@/components/contact/EmailCtaBox";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";

export const metadata: Metadata = {
  title: "연락하기 | 봉구픽",
  description: "제휴, 광고, 제보 문의는 언제든 환영합니다",
};

const proseArticle =
  "prose prose-lg max-w-none dark:prose-invert prose-headings:font-serif prose-headings:font-bold prose-headings:text-charcoal prose-p:text-lg prose-p:leading-[1.8] prose-p:text-charcoal prose-li:text-lg prose-li:leading-[1.8] prose-strong:font-bold prose-strong:text-charcoal";

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col bg-cream">
      <Header />
      <main className="flex-1 px-4 py-8 sm:px-8 sm:py-12">
        <article className="mx-auto w-full max-w-[700px]">
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-sm text-mute transition-base hover:text-caramel"
          >
            <span aria-hidden>←</span> 홈으로 돌아가기
          </Link>

          <p className="mt-8 text-xs tracking-wider text-mute sm:text-sm">
            ─── CONTACT
          </p>

          <h1 className="font-serif mt-4 text-4xl font-bold leading-tight tracking-tight text-charcoal lg:text-5xl">
            봉구픽에 연락하기
          </h1>

          <div className={`${proseArticle} mt-10`}>
            <p>
              제휴, 광고, 콘텐츠 제보, 오타 신고, 의견 등
              <br />
              무엇이든 환영합니다.
            </p>

            <h2 className="font-serif mt-10 text-2xl font-bold text-charcoal">
              이메일
            </h2>

            <EmailCtaBox />

            <p className="mt-6">영업일 기준 2~3일 이내 답변 드립니다.</p>

            <h2 className="font-serif mt-10 text-2xl font-bold text-charcoal">
              이런 분들 환영합니다
            </h2>
            <ul className="mt-4 list-disc space-y-3 pl-6">
              <li>트렌드 제보를 하고 싶으신 분</li>
              <li>콘텐츠 제휴를 원하시는 브랜드</li>
              <li>광고/스폰서십 문의</li>
              <li>정정 보도 요청</li>
              <li>단순한 응원 메시지</li>
            </ul>

            <h2 className="font-serif mt-10 text-2xl font-bold text-charcoal">
              답변이 어려운 경우
            </h2>
            <ul className="mt-4 list-disc space-y-3 pl-6">
              <li>개인 투자 상담</li>
              <li>의료/법률 자문</li>
              <li>단순 무료 컨설팅 요청</li>
            </ul>

            <p className="mt-10">
              성실히 검토 후 답변드립니다. 감사합니다.
            </p>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
