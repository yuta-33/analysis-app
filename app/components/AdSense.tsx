// app/components/AdSense.tsx
"use client";

import { useEffect, useState } from "react";

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

export default function AdSense() {
  // マウントされたかどうかのフラグ（ハイドレーションエラー防止）
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // 開発環境では実行しない
    if (process.env.NODE_ENV === "development") return;

    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error("AdSense error:", err);
    }
  }, []);

  // まだマウントされていない場合、または開発環境の場合はダミーを表示
  if (!isMounted || process.env.NODE_ENV === "development") {
    return (
      <div className="w-full h-[250px] flex items-center justify-center bg-gray-200 text-gray-500 text-xs border border-dashed border-gray-400 my-4">
        {process.env.NODE_ENV === "development" ? "【広告スペース】(開発中は非表示)" : "Loading Ads..."}
      </div>
    );
  }

  return (
    <div className="w-full flex justify-center my-4 overflow-hidden">
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-XXXXXXXXXXXXXXXX" // ★あなたのID
        data-ad-slot="1234567890"               // ★広告ユニットID
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}