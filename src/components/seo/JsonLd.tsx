type JsonLdProps = {
  data: Record<string, unknown> | Record<string, unknown>[];
};

/**
 * JSON-LD 구조화 데이터 (schema.org)
 */
export function JsonLd({ data }: JsonLdProps) {
  const json = Array.isArray(data) ? data : [data];
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}
