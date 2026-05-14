type StatCardProps = {
  number: string;
  label: string;
  source?: string;
  accent?: "caramel" | "mute";
};

const BORDER: Record<NonNullable<StatCardProps["accent"]>, string> = {
  caramel: "border-l-4 border-l-accent-caramel",
  mute: "border-l-4 border-l-mute",
};

/**
 * 본문 중간 강조 수치 카드 — 매거진 인포그래픽 톤
 */
export function StatCard({
  number,
  label,
  source,
  accent = "caramel",
}: StatCardProps) {
  return (
    <aside
      className={`my-8 rounded-r-xl border-y border-r border-line-soft bg-paper/70 py-6 pl-5 pr-5 shadow-soft dark:bg-paper/20 sm:pl-6 sm:pr-8 ${BORDER[accent]}`}
      aria-label="강조 수치"
    >
      <p className="font-serif text-5xl font-bold leading-none tracking-tight text-charcoal dark:text-cream">
        {number}
      </p>
      <p className="mt-3 text-sm leading-relaxed text-mute">{label}</p>
      {source ? (
        <p className="mt-2 text-xs italic text-mute/90">출처: {source}</p>
      ) : null}
    </aside>
  );
}
