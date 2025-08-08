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
  },
  // 移除 exportPathMap，让 Next.js 自动处理
};

export default nextConfig;