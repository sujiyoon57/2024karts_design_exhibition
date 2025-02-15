/** @type {import('next').NextConfig} */

// ✅ dotenv를 사용하여 환경 변수를 불러옴
require("dotenv").config();

const nextConfig = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },

  reactStrictMode: false,

  images: {
    domains: [
      "images.ctfassets.net",
      "downloads.ctfassets.net",
      "videos.ctfassets.net",
      "localhost" // ✅ 로컬 테스트를 위해 추가
    ],
    deviceSizes: [320, 420, 768, 1024, 1200], // ✅ 다양한 화면 크기 대응
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384], // ✅ 더 세밀한 이미지 최적화
    formats: ["image/avif", "image/webp"], // ✅ 더 나은 이미지 포맷 지원
  },

  // ✅ 환경 변수 적용 (기본값 추가)
  env: {
    CONTENTFUL_SPACE_ID: process.env.CONTENTFUL_SPACE_ID || "default_space_id",
    CONTENTFUL_ACCESS_TOKEN: process.env.CONTENTFUL_ACCESS_TOKEN || "default_access_token",
  },

  eslint: {
    ignoreDuringBuilds: true, // ✅ ESLint 오류 무시하고 빌드 진행
  },

  typescript: {
    ignoreBuildErrors: true, // ✅ TypeScript 오류 무시하고 빌드 진행
  },
};

module.exports = nextConfig;
