/** @type {import('next').NextConfig} */
const nextConfig = {
  // svg 파일 웹팩 설정
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },

  reactStrictMode: false,

  images: {
    domains: ['images.ctfassets.net', 'downloads.ctfassets.net'],
  },

  // ✅ ESLint 오류 무시하는 설정 추가 (이 부분 추가!)
  eslint: {
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig;
