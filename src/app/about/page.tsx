import Link from "next/link";
import { StaticPage } from "@/components/layout/StaticPage";
import { getCategories } from "@/lib/categories";
import { pageMetadata } from "@/lib/metadata";
import {
  SITE_EMAIL,
  SITE_NAME,
  SITE_NAME_EN,
  SITE_TAGLINE,
  SITE_URL,
} from "@/lib/site";

export const metadata = pageMetadata({
  title: "소개",
  description: `${SITE_NAME}은 ${SITE_TAGLINE}입니다. TikTok Affiliate, AI 상세페이지, 쇼츠 전환 구조를 연구·아카이브합니다.`,
  path: "/about",
});

export default async function AboutPage() {
  const categories = await getCategories();

  return (
    <StaticPage
      label="About"
      title={`${SITE_NAME} 소개`}
      description={`${SITE_NAME}은 ${SITE_TAGLINE}입니다.`}
      path="/about"
    >
      <p className="text-lg font-medium text-charcoal">{SITE_TAGLINE}</p>

      <p className="mt-6">
        <strong>
          {SITE_NAME}({SITE_NAME_EN})
        </strong>
        은 AI·숏폼·제휴 마케팅을 활용한 쇼핑·콘텐츠 운영을 직험 실험하고, 그
        과정·수치·구조를 글로 정리하는{" "}
        <strong>운영형 콘텐츠 미디어</strong>입니다. 트렌드 요약이 아니라,
        &quot;어떤 구조가 전환에 도움이 되었는지&quot;를 아카이브하는 것이
        목표입니다.
      </p>

      <h2 className="mt-10 text-2xl font-bold text-charcoal">무엇을 다루나요</h2>
      <p className="mt-4">
        TikTok Affiliate, AI 상세페이지 제작, 쇼츠(숏폼) 전환 구조, 생활 해결형
        상품 리서치, AI 툴 비교, 운영자 실험 기록 등을 다룹니다. 무료 템플릿·
        체크리스트도 제공하여 독자가 바로 실험할 수 있도록 돕습니다.
      </p>

      {categories.length > 0 ? (
        <>
          <h2 className="mt-10 text-2xl font-bold text-charcoal">
            연구 카테고리
          </h2>
          <ul className="mt-4 list-none space-y-3 pl-0">
            {categories.map((cat) => (
              <li key={cat.id} className="flex gap-2">
                <span aria-hidden>{cat.emoji}</span>
                <span>
                  <Link
                    href={`/category/${cat.slug}`}
                    className="font-semibold text-caramel hover:underline"
                  >
                    {cat.name}
                  </Link>
                  {cat.description ? ` — ${cat.description}` : ""}
                </span>
              </li>
            ))}
          </ul>
        </>
      ) : null}

      <h2 className="mt-10 text-2xl font-bold text-charcoal">콘텐츠 원칙</h2>
      <ul className="mt-4 list-disc space-y-2 pl-6">
        <li>
          실제로 시도·측정한 내용을 중심으로 작성하며, 과장된 광고 문구를 지양합니다.
        </li>
        <li>
          제휴 링크·협찬·유료 광고가 포함된 경우 본문 또는 상단에 명시합니다.
        </li>
        <li>
          정책·지원금·금융·의료 등 민감 주제는 공식 출처 확인을 권장하는 문구를
          함께 제공합니다.
        </li>
        <li>
          AI 생성 콘텐츠·이미지를 사용한 경우, 해당 사실을 가능한 범위에서
          밝힙니다.
        </li>
      </ul>

      <h2 className="mt-10 text-2xl font-bold text-charcoal">수익 구조</h2>
      <p className="mt-4">
        사이트 운영을 위해 Google AdSense 등 디스플레이 광고, 제휴(어필리에이트)
        링크, 스폰서 콘텐츠가 포함될 수 있습니다. 광고·제휴는 콘텐츠 편집
        방향에 영향을 줄 수 있으나, 독자에게 유용한 정보 제공을 우선합니다.
      </p>

      <h2 className="mt-10 text-2xl font-bold text-charcoal">운영 정보</h2>
      <ul className="mt-4 list-none space-y-2 pl-0 text-base">
        <li>
          <strong>사이트:</strong>{" "}
          <a href={SITE_URL} className="text-caramel hover:underline">
            {SITE_URL}
          </a>
        </li>
        <li>
          <strong>운영자:</strong> {SITE_NAME} 에디터
        </li>
        <li>
          <strong>문의:</strong>{" "}
          <a
            href={`mailto:${SITE_EMAIL}`}
            className="font-medium text-caramel hover:underline"
          >
            {SITE_EMAIL}
          </a>{" "}
          (<Link href="/contact" className="text-caramel hover:underline">
            연락처 페이지
          </Link>
          )
        </li>
      </ul>

      <p className="mt-10 text-sm text-mute">마지막 업데이트: 2026년 6월 2일</p>
    </StaticPage>
  );
}
