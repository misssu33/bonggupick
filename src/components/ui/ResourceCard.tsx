import Link from "next/link";
import type { Resource } from "@/types/database";

type ResourceCardProps = {
  resource: Resource;
};

/**
 * 무료 템플릿·리소스 카드
 */
export function ResourceCard({ resource }: ResourceCardProps) {
  const href = `/resources#${resource.slug}`;

  return (
    <article className="group h-full">
      <Link
        href={href}
        className="flex h-full flex-col gap-2 rounded-xl border border-line-soft bg-cream p-5 transition-base hover:border-caramel/30 hover:shadow-hover sm:p-6"
      >
        <span className="text-xs font-medium text-caramel">{resource.tag}</span>
        <h3 className="font-semibold text-charcoal group-hover:text-caramel">
          {resource.title}
        </h3>
        {resource.description ? (
          <p className="line-clamp-2 text-sm text-mute">{resource.description}</p>
        ) : null}
      </Link>
    </article>
  );
}
