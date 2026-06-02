import type { Metadata } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildOrganizationSchema, buildWebSiteSchema } from "@/lib/json-ld";
import { rootMetadata } from "@/lib/metadata";
import "./globals.css";

export const metadata: Metadata = rootMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="light" suppressHydrationWarning>
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"
          crossOrigin="anonymous"
        />
      </head>
      <body className="min-h-screen bg-cream font-sans antialiased" suppressHydrationWarning>
        <JsonLd data={[buildWebSiteSchema(), buildOrganizationSchema()]} />
        {children}
        {process.env.NODE_ENV === "production" && (
          <GoogleAnalytics gaId="G-W222W5DLC3" />
        )}
      </body>
    </html>
  );
}
