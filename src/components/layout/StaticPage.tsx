import type { ReactNode } from "react";
import { Breadcrumbs, type BreadcrumbLink } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { buildWebPageSchema } from "@/lib/json-ld";

export const STATIC_PROSE =
  "prose prose-lg max-w-none prose-headings:font-bold prose-headings:text-charcoal prose-p:text-base prose-p:leading-relaxed prose-p:text-charcoal prose-li:text-base prose-li:leading-relaxed prose-strong:text-charcoal prose-a:text-caramel prose-a:no-underline hover:prose-a:underline";

type StaticPageProps = {
  label: string;
  title: string;
  description: string;
  path: string;
  breadcrumbs?: BreadcrumbLink[];
  children: ReactNode;
};

/**
 * About·Contact·Privacy·Terms — 시맨틱 article + WebPage 스키마
 */
export function StaticPage({
  label,
  title,
  description,
  path,
  breadcrumbs,
  children,
}: StaticPageProps) {
  const crumbItems: BreadcrumbLink[] = breadcrumbs ?? [
    { label: "홈", href: "/" },
    { label: title },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-cream">
      <JsonLd
        data={buildWebPageSchema({ name: title, description, path })}
      />
      <SiteHeader />
      <main className="flex-1 px-4 py-10 sm:px-6 sm:py-14">
        <article className="mx-auto w-full max-w-3xl">
          <Breadcrumbs items={crumbItems} />

          <header>
            <p className="text-xs font-medium uppercase tracking-wide text-caramel">
              {label}
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-charcoal sm:text-4xl">
              {title}
            </h1>
          </header>

          <div className={`${STATIC_PROSE} mt-10`}>{children}</div>
        </article>
      </main>
      <SiteFooter />
    </div>
  );
}
