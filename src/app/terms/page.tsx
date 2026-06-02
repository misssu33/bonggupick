import Link from "next/link";
import { StaticPage } from "@/components/layout/StaticPage";
import { pageMetadata } from "@/lib/metadata";
import { SITE_EMAIL, SITE_NAME, SITE_NAME_EN, SITE_URL } from "@/lib/site";

export const metadata = pageMetadata({
  title: "이용약관",
  description: `${SITE_NAME} 이용약관. 콘텐츠 이용, 광고, 제휴 링크, 면책 조항.`,
  path: "/terms",
});

export default function TermsPage() {
  return (
    <StaticPage
      label="Terms of Service"
      title="이용약관"
      description={`${SITE_NAME} 이용약관. 콘텐츠, 광고, 제휴 링크, 면책.`}
      path="/terms"
    >
      <p className="text-sm text-mute">시행일: 2026년 6월 2일</p>

      <p className="mt-6">
        본 약관은 {SITE_NAME}({SITE_NAME_EN}, {SITE_URL}, 이하
        &quot;사이트&quot;)가 제공하는 콘텐츠·서비스의 이용 조건을 정합니다.
        사이트에 접속·이용하면 본 약관에 동의한 것으로 봅니다.
      </p>

      <h2 className="mt-10 text-2xl font-bold text-charcoal">제1조 (목적)</h2>
      <p className="mt-4">
        본 약관은 이용자와 사이트 운영자 간의 권리·의무 및 책임 사항, 콘텐츠
        이용 조건을 규정함을 목적으로 합니다.
      </p>

      <h2 className="mt-10 text-2xl font-bold text-charcoal">
        제2조 (서비스 내용)
      </h2>
      <p className="mt-4">
        사이트는 AI·숏폼·쇼핑·전환 구조에 관한 연구 글, 템플릿·리소스, 카테고리
        아카이브 등 정보 제공 목적의 콘텐츠 미디어입니다. 운영자는 사전 통지
        없이 서비스의 전부 또는 일부를 변경·중단할 수 있습니다.
      </p>

      <h2 className="mt-10 text-2xl font-bold text-charcoal">
        제3조 (콘텐츠의 저작권)
      </h2>
      <p className="mt-4">
        사이트에 게재된 글·이미지·디자인·템플릿 등 콘텐츠의 저작권은 원칙적으로
        {SITE_NAME} 또는 정당한 권리자에게 귀속됩니다. 이용자는{" "}
        <strong>개인적·비상업적 열람</strong> 범위에서 이용할 수 있으며,
        복제·배포·2차 저작·상업적 이용 시 사전 서면 동의가 필요합니다.
      </p>

      <h2 className="mt-10 text-2xl font-bold text-charcoal">
        제4조 (정보의 성격 및 면책)
      </h2>
      <ul className="mt-4 list-disc space-y-2 pl-6">
        <li>
          사이트의 정보는 일반적인 참고·연구 목적이며, 투자·의료·법률·세무 등
          전문적 조언을 대체하지 않습니다.
        </li>
        <li>
          정책·지원사업·상품 가격·제휴 조건 등은 수시로 변경될 수 있으므로,
          이용자는 반드시 공식·판매처 정보를 확인해야 합니다.
        </li>
        <li>
          이용자가 사이트 정보를 바탕으로 한 결정·손해에 대해 운영자는 고의 또는
          중대한 과실이 없는 한 책임을 지지 않습니다.
        </li>
        <li>
          외부 사이트 링크의 내용·거래에 대해 운영자는 책임지지 않습니다.
        </li>
      </ul>

      <h2 className="mt-10 text-2xl font-bold text-charcoal">
        제5조 (광고)
      </h2>
      <p className="mt-4">
        사이트는 Google AdSense 등 <strong>제3자 광고</strong>를 게재할 수
        있습니다. 광고물의 내용·품질·거래는 광고주·광고 네트워크의 책임이며,
        운영자는 광고로 인한 이용자와 광고주 간 분쟁에 개입하지 않을 수
        있습니다.
      </p>

      <h2 className="mt-10 text-2xl font-bold text-charcoal">
        제6조 (제휴 링크)
      </h2>
      <p className="mt-4">
        콘텐츠에 <strong>제휴(어필리에이트) 링크</strong>가 포함될 수 있으며,
        링크를 통한 구매 등으로 운영자에게 수수료가 발생할 수 있습니다. 제휴
        관계가 있는 경우 본문 등에 표시·고지합니다. 이용자는 각 판매처의
        이용약관·환불 정책을 확인해야 합니다.
      </p>

      <h2 className="mt-10 text-2xl font-bold text-charcoal">
        제7조 (쿠키 및 추적 기술)
      </h2>
      <p className="mt-4">
        사이트는 통계·광고·기능 제공을 위해 쿠키 등을 사용할 수 있습니다. 자세한
        내용은{" "}
        <Link href="/privacy" className="font-medium text-caramel hover:underline">
          개인정보 처리방침
        </Link>
        을 참고해 주세요.
      </p>

      <h2 className="mt-10 text-2xl font-bold text-charcoal">
        제8조 (이용자의 의무)
      </h2>
      <p className="mt-4">이용자는 다음 행위를 해서는 안 됩니다.</p>
      <ul className="mt-4 list-disc space-y-2 pl-6">
        <li>콘텐츠의 무단 복제·스크래핑·자동 수집</li>
        <li>사이트·서버·제3자 서비스에 대한 해킹·과부하 공격</li>
        <li>타인의 권리·개인정보 침해, 허위 정보 유포</li>
        <li>운영자·제3자를 기망하는 행위</li>
        <li>법령 또는 공서양속에 반하는 행위</li>
      </ul>

      <h2 className="mt-10 text-2xl font-bold text-charcoal">
        제9조 (약관 변경)
      </h2>
      <p className="mt-4">
        운영자는 필요 시 본 약관을 변경할 수 있으며, 변경된 약관은 사이트에
        게시한 시점부터 효력이 발생합니다. 변경 후에도 사이트를 계속 이용하면
        변경 약관에 동의한 것으로 볼 수 있습니다.
      </p>

      <h2 className="mt-10 text-2xl font-bold text-charcoal">
        제10조 (준거법 및 관할)
      </h2>
      <p className="mt-4">
        본 약관은 대한민국 법령을 준거법으로 하며, 분쟁 발생 시 운영자 주소지를
        관할하는 법원을 제1심 관할 법원으로 합니다.
      </p>

      <h2 className="mt-10 text-2xl font-bold text-charcoal">문의</h2>
      <p className="mt-4">
        약관 관련 문의:{" "}
        <a
          href={`mailto:${SITE_EMAIL}`}
          className="font-medium text-caramel hover:underline"
        >
          {SITE_EMAIL}
        </a>{" "}
        ·{" "}
        <Link href="/contact" className="font-medium text-caramel hover:underline">
          연락처 페이지
        </Link>
      </p>
    </StaticPage>
  );
}
