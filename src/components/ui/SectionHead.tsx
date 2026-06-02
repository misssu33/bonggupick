type SectionHeadProps = {
  title: string;
  subtitle?: string;
};

/** 섹션 제목 + 구분선 */
export function SectionHead({ title, subtitle }: SectionHeadProps) {
  return (
    <div className="mb-8 sm:mb-10">
      <div className="flex items-center gap-4">
        <h2 className="shrink-0 text-sm font-semibold tracking-wide text-charcoal">
          {title}
        </h2>
        <div className="h-px flex-1 bg-line-soft" aria-hidden />
      </div>
      {subtitle ? (
        <p className="mt-2 text-sm text-mute">{subtitle}</p>
      ) : null}
    </div>
  );
}
