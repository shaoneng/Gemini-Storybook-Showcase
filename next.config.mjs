
// 从 next-i18next 的配置文件中导入 i18n 配置
import nextI18NextConfig from './next-i18next.config.js';
const { i18n } = nextI18NextConfig;

const nextConfig = {
  reactStrictMode: true,
  // 关键修改：重新启用 Next.js 内置的 i18n 路由功能
  i18n,
};

export default nextConfig;