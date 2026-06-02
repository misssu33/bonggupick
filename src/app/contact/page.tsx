import { EmailCtaBox } from "@/components/contact/EmailCtaBox";
import { StaticPage } from "@/components/layout/StaticPage";
import { pageMetadata } from "@/lib/metadata";
import { SITE_EMAIL, SITE_NAME } from "@/lib/site";

export const metadata = pageMetadata({
  title: "연락처",
  description: `${SITE_NAME} 제휴·광고·콘텐츠 제보·오류 신고 문의. 이메일: ${SITE_EMAIL}`,
  path: "/contact",
});

export default function ContactPage() {
  return (
    <StaticPage
      label="Contact"
      title="연락처"
      description={`${SITE_NAME} 제휴·광고·콘텐츠 제보 문의.`}
      path="/contact"
    >
      <p>
        {SITE_NAME}에 대한 문의·제안·제휴·광고·오류 신고는 아래 이메일로 보내
        주세요. 영업일 기준 <strong>2~3일</strong> 이내 답변을 드리며, 순서대로
        검토합니다.
      </p>

      <h2 className="mt-10 text-2xl font-bold text-charcoal">문의 이메일</h2>
      <p className="mt-4 text-mute">
        버튼을 누르면 메일 앱이 열리거나, 주소를 복사해 사용할 수 있습니다.
      </p>
      <EmailCtaBox />

      <h2 className="mt-10 text-2xl font-bold text-charcoal">이런 문의를 받습니다</h2>
      <ul className="mt-4 list-disc space-y-2 pl-6">
        <li>콘텐츠·실험 주제 제보</li>
        <li>브랜드·제휴·스폰서십 협업</li>
        <li>광고(AdSense 외 직접 광고) 문의</li>
        <li>글 내용 정정·삭제 요청</li>
        <li>개인정보·이용약관 관련 문의</li>
        <li>기타 사이트 운영 관련 의견</li>
      </ul>

      <h2 className="mt-10 text-2xl font-bold text-charcoal">
        답변이 어려운 문의
      </h2>
      <ul className="mt-4 list-disc space-y-2 pl-6">
        <li>개인 투자·재테크·세무 상담</li>
        <li>의료·법률 등 전문 자문</li>
        <li>무상 대행·대리 운영 요청</li>
        <li>스팸·홍보성 대량 메일</li>
      </ul>

      <p className="mt-8 text-sm text-mute">
        긴급한 개인정보 관련 요청은 제목에 [개인정보]를 붙여 주시면 우선
        확인합니다.
      </p>

      <p className="mt-10 text-sm text-mute">
        직접 입력:{" "}
        <a
          href={`mailto:${SITE_EMAIL}`}
          className="font-medium text-caramel hover:underline"
        >
          {SITE_EMAIL}
        </a>
      </p>
    </StaticPage>
  );
}
