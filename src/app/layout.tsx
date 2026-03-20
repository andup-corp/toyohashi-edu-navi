import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "豊橋市 教育相談ナビ",
  description: "お子さんのことで気になることはありませんか？選択式の質問に答えるだけで、適切な相談先をご案内します。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className="bg-slate-50 min-h-screen">
        {children}
      </body>
    </html>
  );
}
