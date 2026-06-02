import Link from "next/link";
import type { Resource } from "@/types/database";
import { ResourceCard } from "@/components/ui/ResourceCard";
import { SectionHead } from "@/components/ui/SectionHead";
import { CARD_GRID } from "@/components/ui/card-grid";

type FreeTemplatesSectionProps = {
  templates: Resource[];
};

/**
 * Supabase resources (resource_type=template)
 */
export function FreeTemplatesSection({ templates }: FreeTemplatesSectionProps) {
  return (
    <section
      id="templates"
      className="border-t border-line-soft bg-paper/50"
      aria-label="무료 템플릿"
    >
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 md:py-20 lg:px-8">
        <SectionHead
          title="무료 템플릿"
          subtitle="운영·실험에 바로 쓰는 체크리스트와 브리프"
        />
        {templates.length === 0 ? (
          <p className="rounded-xl border border-dashed border-line-soft py-12 text-center text-sm text-mute">
            등록된 템플릿이 없습니다.
          </p>
        ) : (
          <ul className={CARD_GRID}>
            {templates.map((item) => (
              <li key={item.id}>
                <ResourceCard resource={item} />
              </li>
            ))}
          </ul>
        )}
        <p className="mt-8 text-center">
          <Link
            href="/resources"
            className="text-sm font-semibold text-caramel underline-offset-4 transition-base hover:underline"
          >
            전체 리소스 보기 →
          </Link>
        </p>
      </div>
    </section>
  );
}
