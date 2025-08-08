// 文件路径: /next.config.mjs
/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  
  // 关键修改：移除 i18n 配置块，并添加 images 配置
  output: 'export',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;