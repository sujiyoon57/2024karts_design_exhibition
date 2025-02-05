/** @type {import('next').NextConfig} */
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
        "videos.ctfassets.net" // 🚀 추가된 도메인
      ],
    },
  
    // ✅ 환경 변수 적용
    env: {
      CONTENTFUL_SPACE_ID: process.env.CONTENTFUL_SPACE_ID,
      CONTENTFUL_ACCESS_TOKEN: process.env.CONTENTFUL_ACCESS_TOKEN,
    },
  
    eslint: {
      ignoreDuringBuilds: true,
    },
  };
  
  module.exports = nextConfig;
  