// 文件路径: /next.config.mjs
/** @type {import('next').NextConfig} */

import nextI18NextConfig from './next-i18next.config.js';
const { i18n } = nextI18NextConfig;

const nextConfig = {
  reactStrictMode: true,
  i18n,
  // *** 新增的配置 ***
  output: 'export', 
};

export default nextConfig;