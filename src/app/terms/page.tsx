import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";

export const metadata: Metadata = {
  title: "이용약관 | 봉구픽",
  description: "봉구픽 서비스 이용약관",
};

const proseArticle =
  "prose prose-lg max-w-none dark:prose-invert prose-headings:font-serif prose-headings:font-bold prose-headings:text-charcoal prose-p:text-lg prose-p:leading-[1.8] prose-p:text-charcoal prose-li:text-lg prose-li:leading-[1.8] prose-strong:font-bold prose-strong:text-charcoal";

export default function TermsPage() {
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
            ─── TERMS OF SERVICE
          </p>

          <h1 className="font-serif mt-4 text-4xl font-bold leading-tight tracking-tight text-charcoal lg:text-5xl">
            이용약관
          </h1>

          <div className={`${proseArticle} mt-10`}>
            <p className="text-sm text-mute">시행일: 2026년 5월 13일</p>

            <h2 className="font-serif mt-10 text-2xl font-bold text-charcoal">
              제1조 (목적)
            </h2>
            <p className="mt-4">
              본 약관은 봉구픽(BongguPick, 이하 &quot;사이트&quot;)이 제공하는 모든
              서비스의 이용 조건 및 절차에 관한 사항을 규정함을 목적으로 합니다.
            </p>

            <h2 className="font-serif mt-10 text-2xl font-bold text-charcoal">
              제2조 (용어의 정의)
            </h2>
            <ul className="mt-4 list-disc space-y-3 pl-6">
              <li>
                <strong className="font-bold text-charcoal">&quot;사이트&quot;</strong>
                : bonggupick.com 도메인에서 운영되는 콘텐츠 매거진
              </li>
              <li>
                <strong className="font-bold text-charcoal">&quot;이용자&quot;</strong>
                : 사이트에 접속하여 콘텐츠를 이용하는 자
              </li>
              <li>
                <strong className="font-bold text-charcoal">&quot;콘텐츠&quot;</strong>
                : 사이트에 게시된 모든 글, 이미지, 영상 등
              </li>
            </ul>

            <h2 className="font-serif mt-10 text-2xl font-bold text-charcoal">
              제3조 (콘텐츠의 권리)
            </h2>
            <p className="mt-4">
              사이트에 게재된 모든 콘텐츠의 저작권은 봉구픽에 있습니다. 이용자는
              개인적 용도로만 콘텐츠를 이용할 수 있으며, 상업적 이용·복제·배포·전송
              시 사전 동의가 필요합니다.
            </p>

            <h2 className="font-serif mt-10 text-2xl font-bold text-charcoal">
              제4조 (책임의 한계)
            </h2>
            <ul className="mt-4 list-disc space-y-3 pl-6">
              <li>
                사이트는 콘텐츠의 정확성을 위해 노력하나, 모든 정보의 완전성을
                보장하지 않습니다
              </li>
              <li>
                정부 지원사업, 금융 정보 등은 변경될 수 있으므로 공식 출처를
                확인해야 합니다
              </li>
              <li>
                이용자가 본 사이트의 정보를 기반으로 한 결정에 대한 책임은
                이용자에게 있습니다
              </li>
              <li>사이트는 외부 링크에 대해 책임지지 않습니다</li>
            </ul>

            <h2 className="font-serif mt-10 text-2xl font-bold text-charcoal">
              제5조 (광고)
            </h2>
            <p className="mt-4">
              본 사이트는 운영을 위해 광고를 게재합니다. 광고 내용은 광고주의
              책임이며, 사이트는 광고 내용에 대해 책임지지 않습니다.
            </p>

            <h2 className="font-serif mt-10 text-2xl font-bold text-charcoal">
              제6조 (금지 행위)
            </h2>
            <p className="mt-4">이용자는 다음 행위를 해서는 안 됩니다.</p>
            <ul className="mt-4 list-disc space-y-2 pl-6">
              <li>콘텐츠의 무단 복제 및 배포</li>
              <li>사이트 운영을 방해하는 행위</li>
              <li>타인의 개인정보 침해</li>
              <li>허위 정보 유포</li>
            </ul>

            <h2 className="font-serif mt-10 text-2xl font-bold text-charcoal">
              제7조 (약관의 변경)
            </h2>
            <p className="mt-4">
              본 약관은 필요 시 변경될 수 있으며, 변경 시 사이트에 공지합니다.
            </p>

            <h2 className="font-serif mt-10 text-2xl font-bold text-charcoal">
              제8조 (분쟁 해결)
            </h2>
            <p className="mt-4">
              본 약관과 관련된 분쟁은 대한민국 법령을 따르며, 관할 법원은 사이트
              운영자 주소지 법원으로 합니다.
            </p>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
