import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { ResourceCard } from "@/components/ui/ResourceCard";
import { CARD_GRID } from "@/components/ui/card-grid";
import { buildWebPageSchema } from "@/lib/json-ld";
import { pageMetadata } from "@/lib/metadata";
import { getPublishedResources } from "@/lib/resources";
import { SITE_DESCRIPTION, SITE_EMAIL } from "@/lib/site";

export const revalidate = 60;

export const metadata = pageMetadata({
  title: "무료 템플릿·리소스",
  description:
    "TikTok·쇼츠·AI 상세·실험 기록에 쓰는 무료 템플릿과 운영 리소스 모음",
  path: "/resources",
});

const proseBlock =
  "prose prose-sm max-w-none prose-headings:font-bold prose-headings:text-charcoal prose-p:text-charcoal prose-li:text-charcoal";

export default async function ResourcesPage() {
  const templates = await getPublishedResources("template");
  const all = await getPublishedResources();

  return (
    <div className="flex min-h-screen flex-col bg-cream">
      <JsonLd
        data={buildWebPageSchema({
          name: "무료 템플릿·리소스",
          description: SITE_DESCRIPTION,
          path: "/resources",
        })}
      />
      <SiteHeader />
      <main className="flex-1 px-4 py-10 sm:px-6 sm:py-14">
        <div className="mx-auto w-full max-w-6xl">
          <Breadcrumbs
            items={[
              { label: "홈", href: "/" },
              { label: "무료 템플릿·리소스" },
            ]}
          />

          <header>
            <p className="text-xs font-medium text-caramel">RESOURCES</p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-charcoal sm:text-4xl">
              무료 템플릿·리소스
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-mute sm:text-lg">
              운영·실험에 바로 쓰는 체크리스트와 브리프입니다. 개인·소규모 운영에
              자유롭게 활용해 주세요.
            </p>
          </header>

          {templates.length > 0 ? (
            <section className="mt-10" aria-label="템플릿 목록">
            <ul className={`${CARD_GRID} mt-10`}>
              {templates.map((item) => (
                <li key={item.id}>
                  <ResourceCard resource={item} />
                </li>
              ))}
            </ul>
            </section>
          ) : (
            <p className="mt-10 rounded-xl border border-dashed border-line-soft py-12 text-center text-sm text-mute">
              등록된 템플릿이 없습니다.
            </p>
          )}

          <section className="mx-auto mt-16 max-w-3xl" aria-label="리소스 상세">
            <ul className="space-y-16">
              {all.map((item) => (
                <li key={item.id} id={item.slug} className="scroll-mt-24">
                  <p className="text-xs font-semibold text-caramel">{item.tag}</p>
                  <h2 className="mt-1 text-xl font-bold text-charcoal sm:text-2xl">
                    {item.title}
                  </h2>
                  {item.description ? (
                    <p className="mt-2 text-sm text-mute">{item.description}</p>
                  ) : null}
                  {item.external_url ? (
                    <p className="mt-4">
                      <a
                        href={item.external_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-semibold text-caramel hover:underline"
                      >
                        외부 링크 열기 →
                      </a>
                    </p>
                  ) : null}
                  {item.content ? (
                    <div
                      className={`${proseBlock} mt-6 rounded-xl border border-line-soft bg-paper p-6 sm:p-8`}
                    >
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {item.content}
                      </ReactMarkdown>
                    </div>
                  ) : null}
                </li>
              ))}
            </ul>

            {all.length === 0 && templates.length === 0 ? (
              <p className="rounded-xl border border-dashed border-line-soft py-16 text-center text-sm text-mute">
                등록된 리소스가 없습니다.
              </p>
            ) : null}

            <p className="mt-16 text-center text-sm text-mute">
              문의:{" "}
              <a
                href={`mailto:${SITE_EMAIL}`}
                className="font-medium text-caramel hover:underline"
              >
                {SITE_EMAIL}
              </a>
            </p>
          </section>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
