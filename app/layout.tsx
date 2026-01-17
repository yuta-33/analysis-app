import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "行動心理・傾向分析 | Behavioral Pattern Analysis",
  description: "MBTI×血液型×星座から、あなたの現代社会における「役割」と「特性」を分析します。",
  openGraph: {
    title: "行動心理・傾向分析",
    description: "私だけの分析結果を見てみる？ MBTIと血液型でわかる行動パターン。",
    images: ["/og-image.jpeg"], // publicフォルダに入れた画像の拡張子が .jpeg で合っているか確認してください（.jpg の場合は書き換えて！）
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        {/* AdSense審査用コード（審査通過後に有効化） */}
        {/* ※今はコメントアウト状態でもOKですが、申請時は以下のパブリッシャーIDを書き換えてください */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX" 
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}