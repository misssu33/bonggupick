import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";

export const metadata: Metadata = {
  title: "개인정보 처리방침 | 봉구픽",
  description: "봉구픽의 개인정보 처리방침",
};

const proseArticle =
  "prose prose-lg max-w-none dark:prose-invert prose-headings:font-serif prose-headings:font-bold prose-headings:text-charcoal prose-p:text-lg prose-p:leading-[1.8] prose-p:text-charcoal prose-li:text-lg prose-li:leading-[1.8] prose-strong:font-bold prose-strong:text-charcoal prose-a:text-caramel";

function ExternalLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="font-medium text-caramel underline-offset-2 hover:underline"
    >
      {children}
    </a>
  );
}

export default function PrivacyPage() {
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
            ─── PRIVACY POLICY
          </p>

          <h1 className="font-serif mt-4 text-4xl font-bold leading-tight tracking-tight text-charcoal lg:text-5xl">
            개인정보 처리방침
          </h1>

          <div className={`${proseArticle} mt-10`}>
            <p>
              봉구픽(이하 &quot;사이트&quot;)은 이용자의 개인정보를 중요시하며,
              「개인정보 보호법」을 준수하기 위해 노력하고 있습니다.
            </p>
            <p className="mt-4 text-sm text-mute">시행일: 2026년 5월 13일</p>

            <h2 className="font-serif mt-10 text-2xl font-bold text-charcoal">
              1. 수집하는 개인정보 항목
            </h2>
            <p className="mt-4">
              본 사이트는 회원가입 절차가 없으며, 직접적으로 개인정보를 수집하지
              않습니다. 단, 다음 정보가 자동으로 수집될 수 있습니다.
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-6">
              <li>IP 주소, 쿠키, 방문 일시, 서비스 이용 기록</li>
              <li>브라우저 종류, OS 정보, 기기 정보</li>
              <li>접속 페이지, 머문 시간, 클릭한 링크</li>
            </ul>

            <h2 className="font-serif mt-10 text-2xl font-bold text-charcoal">
              2. 개인정보 수집 목적
            </h2>
            <ul className="mt-4 list-disc space-y-2 pl-6">
              <li>서비스 이용 통계 분석</li>
              <li>콘텐츠 개선 및 트래픽 분석</li>
              <li>광고 최적화 및 부정 이용 방지</li>
            </ul>

            <h2 className="font-serif mt-10 text-2xl font-bold text-charcoal">
              3. 제3자 서비스
            </h2>
            <p className="mt-4">
              본 사이트는 다음 제3자 서비스를 사용합니다.
            </p>

            <h3 className="font-serif mt-8 text-xl font-bold text-charcoal">
              Google Analytics
            </h3>
            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>방문자 행동 분석</li>
              <li>
                자세한 정보:{" "}
                <ExternalLink href="https://policies.google.com/privacy">
                  https://policies.google.com/privacy
                </ExternalLink>
              </li>
            </ul>

            <h3 className="font-serif mt-8 text-xl font-bold text-charcoal">
              Google AdSense
            </h3>
            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>광고 노출 및 맞춤형 광고 제공</li>
              <li>쿠키를 통해 이전 방문 정보를 사용할 수 있습니다</li>
              <li>
                광고 설정:{" "}
                <ExternalLink href="https://www.google.com/settings/ads">
                  https://www.google.com/settings/ads
                </ExternalLink>
              </li>
            </ul>

            <h3 className="font-serif mt-8 text-xl font-bold text-charcoal">
              Supabase
            </h3>
            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>콘텐츠 저장 및 전달</li>
              <li>미국/싱가포르 서버 사용 가능성</li>
            </ul>

            <h2 className="font-serif mt-10 text-2xl font-bold text-charcoal">
              4. 쿠키(Cookie) 사용
            </h2>
            <p className="mt-4">
              본 사이트는 다음 목적으로 쿠키를 사용합니다.
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-6">
              <li>사용자 환경 설정 저장 (다크모드 등)</li>
              <li>방문 분석</li>
              <li>광고 맞춤화</li>
            </ul>
            <p className="mt-4">
              브라우저 설정에서 쿠키를 거부할 수 있으나, 일부 기능이 제한될 수
              있습니다.
            </p>

            <h2 className="font-serif mt-10 text-2xl font-bold text-charcoal">
              5. 개인정보 보유 기간
            </h2>
            <p className="mt-4">
              본 사이트는 직접 수집한 개인정보가 없으므로 별도 보유 기간이
              없습니다. 제3자 서비스의 데이터는 각 서비스 정책을 따릅니다.
            </p>

            <h2 className="font-serif mt-10 text-2xl font-bold text-charcoal">
              6. 이용자 권리
            </h2>
            <p className="mt-4">이용자는 다음 권리를 행사할 수 있습니다.</p>
            <ul className="mt-4 list-disc space-y-2 pl-6">
              <li>개인정보 열람 요청</li>
              <li>정정·삭제 요청</li>
              <li>처리 정지 요청</li>
            </ul>
            <p className="mt-4">
              요청은{" "}
              <a
                href="mailto:minilo0619@gmail.com"
                className="font-medium text-caramel underline-offset-2 hover:underline"
              >
                minilo0619@gmail.com
              </a>
              로 보내주세요.
            </p>

            <h2 className="font-serif mt-10 text-2xl font-bold text-charcoal">
              7. 개인정보 보호책임자
            </h2>
            <p className="mt-4">
              성명: 봉구픽 에디터
              <br />
              이메일:{" "}
              <a
                href="mailto:minilo0619@gmail.com"
                className="font-medium text-caramel underline-offset-2 hover:underline"
              >
                minilo0619@gmail.com
              </a>
            </p>

            <h2 className="font-serif mt-10 text-2xl font-bold text-charcoal">
              8. 정책 변경
            </h2>
            <p className="mt-4">
              본 정책이 변경될 경우 사이트에 공지하며, 변경된 정책은 게시 즉시
              효력이 발생합니다.
            </p>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
