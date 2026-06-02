import type { ReactNode } from "react";
import { StaticPage } from "@/components/layout/StaticPage";
import { pageMetadata } from "@/lib/metadata";
import { SITE_EMAIL, SITE_NAME, SITE_URL } from "@/lib/site";

export const metadata = pageMetadata({
  title: "개인정보 처리방침",
  description: `${SITE_NAME} 개인정보 처리방침. 쿠키, 광고(AdSense), 제휴 링크, 분석 도구 사용 안내.`,
  path: "/privacy",
});

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
      className="font-medium text-caramel hover:underline"
    >
      {children}
    </a>
  );
}

export default function PrivacyPage() {
  return (
    <StaticPage
      label="Privacy Policy"
      title="개인정보 처리방침"
      description={`${SITE_NAME} 개인정보 처리방침. 쿠키, 광고, 제휴 링크 안내.`}
      path="/privacy"
    >
      <p className="text-sm text-mute">시행일: 2026년 6월 2일</p>

      <p className="mt-6">
        {SITE_NAME}(이하 &quot;사이트&quot;, {SITE_URL})는 이용자의 개인정보를
        중요하게 생각하며, 「개인정보 보호법」 등 관련 법령을 준수하기 위해
        노력합니다. 본 방침은 사이트 이용 시 적용됩니다.
      </p>

      <h2 className="mt-10 text-2xl font-bold text-charcoal">
        1. 수집하는 개인정보
      </h2>
      <p className="mt-4">
        사이트는 회원가입·댓글 등을 통한 <strong>직접적인 개인정보 수집 절차를
        운영하지 않을 수 있습니다</strong>. 다만, 서비스 이용 과정에서 아래 정보가
        자동으로 생성·수집될 수 있습니다.
      </p>
      <ul className="mt-4 list-disc space-y-2 pl-6">
        <li>IP 주소, 접속 일시, 이용 기록, 오류 로그</li>
        <li>브라우저·OS·기기 정보, 화면 해상도</li>
        <li>방문 페이지 URL, 체류 시간, 유입 경로</li>
        <li>쿠키(Cookie) 및 유사 기술을 통해 수집되는 식별 정보</li>
      </ul>
      <p className="mt-4">
        이용자가 이메일로 문의할 경우,{" "}
        <strong>이메일 주소·문의 내용</strong>이 수집될 수 있으며, 문의
        처리 목적으로만 사용합니다.
      </p>

      <h2 className="mt-10 text-2xl font-bold text-charcoal">
        2. 개인정보의 이용 목적
      </h2>
      <ul className="mt-4 list-disc space-y-2 pl-6">
        <li>사이트 운영·보안·부정 이용 방지</li>
        <li>방문 통계 분석 및 콘텐츠·UI 개선</li>
        <li>광고 게재·성과 측정 및 맞춤형 광고 제공</li>
        <li>문의·민원 응대</li>
        <li>법령상 의무 이행</li>
      </ul>

      <h2 className="mt-10 text-2xl font-bold text-charcoal">
        3. 쿠키(Cookie) 및 유사 기술
      </h2>
      <p className="mt-4">
        사이트는 다음 목적으로 쿠키 및 로컬 스토리지 등을 사용할 수 있습니다.
      </p>
      <ul className="mt-4 list-disc space-y-2 pl-6">
        <li>방문·이용 통계(예: Google Analytics)</li>
        <li>광고 노출·클릭 측정·맞춤형 광고(예: Google AdSense)</li>
        <li>사용자 환경 설정(예: 테마·표시 설정) 저장</li>
        <li>제휴 링크·외부 서비스 연동 시 추적 파라미터</li>
      </ul>
      <p className="mt-4">
        이용자는 브라우저 설정에서 쿠키 저장을 거부·삭제할 수 있습니다. 일부
        거부 시 사이트 기능·광고 맞춤이 제한될 수 있습니다.
      </p>
      <p className="mt-4">
        Google 맞춤 광고 설정:{" "}
        <ExternalLink href="https://www.google.com/settings/ads">
          google.com/settings/ads
        </ExternalLink>
      </p>

      <h2 className="mt-10 text-2xl font-bold text-charcoal">
        4. 광고 서비스
      </h2>
      <p className="mt-4">
        사이트는 운영 비용 충당을 위해 <strong>Google AdSense</strong> 등
        제3자 광고 네트워크를 사용할 수 있습니다. 광고주·광고 네트워크는
        쿠키를 사용하여 이용자의 관심사에 기반한 광고를 표시할 수 있으며,
        이전 방문 기록 등이 활용될 수 있습니다.
      </p>
      <ul className="mt-4 list-disc space-y-2 pl-6">
        <li>광고 내용·거래는 광고주·네트워크의 책임입니다.</li>
        <li>
          Google 광고 정책:{" "}
          <ExternalLink href="https://policies.google.com/technologies/ads">
            Google 광고 기술 정책
          </ExternalLink>
        </li>
        <li>
          Google 개인정보처리방침:{" "}
          <ExternalLink href="https://policies.google.com/privacy">
            policies.google.com/privacy
          </ExternalLink>
        </li>
      </ul>

      <h2 className="mt-10 text-2xl font-bold text-charcoal">
        5. 제휴(어필리에이트) 링크
      </h2>
      <p className="mt-4">
        일부 글·리소스에는 <strong>제휴 마케팅 링크</strong>(TikTok Shop,
        쿠팡 파트너스, Amazon Associates 등)가 포함될 수 있습니다. 이용자가
        해당 링크를 통해 상품·서비스를 구매하면, 사이트 운영자에게 소정의
        수수료가 지급될 수 있습니다.
      </p>
      <ul className="mt-4 list-disc space-y-2 pl-6">
        <li>제휴 링크는 콘텐츠에 표시·고지됩니다.</li>
        <li>구매 가격·조건은 각 판매처 정책을 따릅니다.</li>
        <li>사이트는 판매처·제3자 거래에 대해 책임지지 않습니다.</li>
      </ul>

      <h2 className="mt-10 text-2xl font-bold text-charcoal">
        6. 제3자 서비스 제공자
      </h2>
      <p className="mt-4">사이트는 운영을 위해 아래 서비스를 사용할 수 있습니다.</p>

      <h3 className="mt-8 text-xl font-bold text-charcoal">Google Analytics</h3>
      <ul className="mt-3 list-disc space-y-2 pl-6">
        <li>방문 통계·행동 분석</li>
        <li>
          정책:{" "}
          <ExternalLink href="https://policies.google.com/privacy">
            Google Privacy Policy
          </ExternalLink>
        </li>
      </ul>

      <h3 className="mt-8 text-xl font-bold text-charcoal">Supabase</h3>
      <ul className="mt-3 list-disc space-y-2 pl-6">
        <li>콘텐츠·데이터 저장 및 전달</li>
        <li>해외(미국 등) 서버에 데이터가 처리·저장될 수 있음</li>
      </ul>

      <h2 className="mt-10 text-2xl font-bold text-charcoal">
        7. 보유 기간
      </h2>
      <p className="mt-4">
        자동 수집 정보는 각 분석·광고 서비스의 정책에 따릅니다. 이메일 문의
        내용은 처리 완료 후 <strong>최대 1년</strong> 보관 후 파기할 수
        있습니다(법령상 보존 의무가 있는 경우 해당 기간 준수).
      </p>

      <h2 className="mt-10 text-2xl font-bold text-charcoal">
        8. 이용자의 권리
      </h2>
      <p className="mt-4">
        이용자는 개인정보 열람·정정·삭제·처리 정지 등을 요청할 수 있습니다.
        요청은 아래 이메일로 연락해 주세요.
      </p>
      <p className="mt-4">
        <a
          href={`mailto:${SITE_EMAIL}`}
          className="font-medium text-caramel hover:underline"
        >
          {SITE_EMAIL}
        </a>
      </p>

      <h2 className="mt-10 text-2xl font-bold text-charcoal">
        9. 개인정보 보호책임자
      </h2>
      <p className="mt-4">
        성명: {SITE_NAME} 운영자
        <br />
        이메일:{" "}
        <a
          href={`mailto:${SITE_EMAIL}`}
          className="font-medium text-caramel hover:underline"
        >
          {SITE_EMAIL}
        </a>
      </p>

      <h2 className="mt-10 text-2xl font-bold text-charcoal">
        10. 방침 변경
      </h2>
      <p className="mt-4">
        본 방침은 법령·서비스 변경에 따라 수정될 수 있으며, 변경 시 본 페이지에
        게시합니다. 중요한 변경은 사이트 공지로 안내할 수 있습니다.
      </p>
    </StaticPage>
  );
}
