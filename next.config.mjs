import nextI18NextConfig from './next-i18next.config.js';

const nextConfig = {
  reactStrictMode: true,
  // 移除 i18n 配置，因为静态导出不支持
  // i18n,
  trailingSlash: true,
  output: 'export',
  distDir: 'out',
  images: {
    unoptimized: true,
    domains: ['localhost', 'geministorybook.online'],
    formats: ['image/webp', 'image/avif'],
  },
  env: {
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    GA_TRACKING_ID: process.env.GA_TRACKING_ID || 'G-49WRVFC2QQ',
  },
  // 移除 exportPathMap，让 Next.js 自动处理
};

export default nextConfig;