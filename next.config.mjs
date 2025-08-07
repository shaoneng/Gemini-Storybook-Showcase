// 文件路径: /next.config.js
/** @type {import('next').NextConfig} */

// 首先，默认导入整个配置文件
import nextI18NextConfig from './next-i18next.config.js';

// 然后，从导入的对象中解构出我们需要的 i18n 部分
const { i18n } = nextI18NextConfig;

const nextConfig = {
  reactStrictMode: true,
  i18n,
};

// 最后，使用 export default 导出配置
export default nextConfig;

