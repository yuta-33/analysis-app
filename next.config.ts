import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // A8.netなどの外部画像の読み込みを許可する設定
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.a8.net', // すべてのa8.netドメインを許可
      },
    ],
  },
  // 以前設定したビルドエラー無視の設定があれば残す
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;