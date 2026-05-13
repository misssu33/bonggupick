import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";

export const metadata: Metadata = {
  title: "봉구픽 소개",
  description:
    "20~30대를 위한 트렌드 큐레이션 매거진, 봉구픽을 소개합니다",
};

const proseArticle =
  "prose prose-lg max-w-none dark:prose-invert prose-headings:font-serif prose-headings:font-bold prose-headings:text-charcoal prose-p:text-lg prose-p:leading-[1.8] prose-p:text-charcoal prose-li:text-lg prose-li:leading-[1.8] prose-strong:font-bold prose-strong:text-charcoal";

export default function AboutPage() {
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
            ─── ABOUT
          </p>

          <h1 className="font-serif mt-4 text-4xl font-bold leading-tight tracking-tight text-charcoal lg:text-5xl">
            트렌드를 읽는 1인 IT 에이전트
          </h1>

          <div className={`${proseArticle} mt-10`}>
            <p>
              봉구픽(BongguPick)은 매주 월요일과 목요일,
              20~30대를 위한 트렌드를 큐레이션하는 1인 매거진입니다.
            </p>

            <h2 className="font-serif mt-10 text-2xl font-bold text-charcoal">
              우리가 다루는 것
            </h2>
            <ul className="mt-4 list-disc space-y-3 pl-6">
              <li>
                🌱 <strong className="font-bold text-charcoal">일상노하우</strong>
                : 더 나은 하루를 만드는 작은 팁들
              </li>
              <li>
                💡 <strong className="font-bold text-charcoal">IT</strong>: AI와
                디지털 트렌드, 도구 활용법
              </li>
              <li>
                🎁{" "}
                <strong className="font-bold text-charcoal">국가지원사업</strong>
                : 놓치면 아까운 정부 지원금과 정책
              </li>
            </ul>

            <h2 className="font-serif mt-10 text-2xl font-bold text-charcoal">
              왜 봉구픽인가요?
            </h2>
            <p className="mt-4">
              매일 쏟아지는 정보 속에서, 정말 가치 있는 것만 골라 전합니다.
              <br />
              광고가 아닌, 실제로 써보고 검증한 것만 추천합니다.
              <br />
              한 사람의 시선으로, 사계절 질리지 않는 콘텐츠를 쌓아갑니다.
            </p>

            <h2 className="font-serif mt-10 text-2xl font-bold text-charcoal">
              발행 주기
            </h2>
            <p className="mt-4">
              매주 월요일, 목요일 오전 발행 (공휴일과 명절 제외)
            </p>

            <h2 className="font-serif mt-10 text-2xl font-bold text-charcoal">
              운영자
            </h2>
            <p className="mt-4">
              봉구픽 에디터
              <br />
              연락:{" "}
              <a
                href="mailto:minilo0619@gmail.com"
                className="font-medium text-caramel underline-offset-2 hover:underline"
              >
                minilo0619@gmail.com
              </a>
            </p>

            <p className="mt-10 text-sm text-mute">마지막 업데이트: 2026년 5월</p>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
