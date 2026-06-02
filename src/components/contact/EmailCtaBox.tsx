"use client";

import { useCallback, useState } from "react";

import { SITE_EMAIL } from "@/lib/site";

const EMAIL = SITE_EMAIL;

/**
 * 연락처 페이지 — 이메일 강조 박스 + mailto + 클립보드 복사
 */
export function EmailCtaBox() {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // 클립보드 API 미지원·거부 시 무시
    }
  }, []);

  return (
    <div className="relative mt-8 overflow-hidden rounded-lg border border-caramel/45 bg-caramel/10 p-5 sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <a
          href={`mailto:${EMAIL}`}
          className="break-all text-lg font-semibold text-caramel underline-offset-2 transition-base hover:underline sm:text-xl"
        >
          {EMAIL}
        </a>
        <button
          type="button"
          onClick={handleCopy}
          className="shrink-0 rounded-md border border-caramel/50 bg-paper/80 px-4 py-2 text-sm font-medium text-charcoal transition-base hover:border-caramel hover:bg-paper"
        >
          복사
        </button>
      </div>
      {copied ? (
        <p
          className="mt-3 text-center text-sm font-medium text-caramel sm:text-right"
          role="status"
        >
          복사됨!
        </p>
      ) : null}
    </div>
  );
}
