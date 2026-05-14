import type { Metadata } from "next";
import { GoogleAnalytics } from '@next/third-parties/google';
import { Noto_Serif_KR } from "next/font/google";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import "./globals.css";

const notoSerifKr = Noto_Serif_KR({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-noto-serif-kr",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://bonggupick.com"),
  title: {
    default: "봉구픽 | 이번 주 트렌드 Pick",
    template: "%s | 봉구픽",
  },
  description: "매주 월·목, 20~30대를 위한 트렌드 큐레이션 매거진",
  keywords: ["트렌드", "청년", "IT", "국가지원사업", "재테크", "봉구픽"],
  authors: [{ name: "봉구픽" }],
  openGraph: {
    type: "website",
    locale: "ko_KR",
    siteName: "봉구픽",
    url: "https://bonggupick.com",
    title: "봉구픽 | 이번 주 트렌드 Pick",
    description: "매주 월·목, 20~30대를 위한 트렌드 큐레이션 매거진",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  verification: { google: "" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={notoSerifKr.variable} suppressHydrationWarning>
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"
          crossOrigin="anonymous"
        />
      </head>
      <body className="min-h-screen font-sans antialiased" suppressHydrationWarning>
        <ThemeProvider>{children}</ThemeProvider>
        {process.env.NODE_ENV === "production" && (
          <GoogleAnalytics gaId="G-W222W5DLC3" />
        )}
      </body>
    </html>
  );
}
