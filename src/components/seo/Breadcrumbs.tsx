import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildBreadcrumbSchema, type BreadcrumbItem } from "@/lib/json-ld";

export type BreadcrumbLink = {
  label: string;
  href?: string;
};

type BreadcrumbsProps = {
  items: BreadcrumbLink[];
};

/**
 * 시맨틱 breadcrumb + BreadcrumbList JSON-LD
 */
export function Breadcrumbs({ items }: BreadcrumbsProps) {
  const schemaItems: BreadcrumbItem[] = items.map((item) => ({
    name: item.label,
    path: item.href ?? "",
  }));

  return (
    <>
      <JsonLd data={buildBreadcrumbSchema(schemaItems)} />
      <nav aria-label="현재 위치" className="mb-6">
        <ol className="flex flex-wrap items-center gap-1 text-sm text-mute">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            return (
              <li key={`${item.label}-${index}`} className="flex items-center gap-1">
                {index > 0 ? (
                  <span className="text-line-soft" aria-hidden>
                    /
                  </span>
                ) : null}
                {item.href && !isLast ? (
                  <Link
                    href={item.href}
                    className="transition-base hover:text-caramel"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span
                    className={isLast ? "font-medium text-charcoal" : undefined}
                    aria-current={isLast ? "page" : undefined}
                  >
                    {item.label}
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
