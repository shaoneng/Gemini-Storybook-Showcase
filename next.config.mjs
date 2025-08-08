import nextI18NextConfig from './next-i18next.config.js';
const { i18n } = nextI18NextConfig;

const nextConfig = {
  reactStrictMode: true,
  i18n,
  exportTrailingSlash: true,
  exportPathMap: async () => {
  return {
    '/': { page: '/' },
    '/en': { page: '/en' },
    '/en/story/[id]': { page: '/story/[id]' },
    '/zh': { page: '/zh' },
    '/zh/story/[id]': { page: '/story/[id]' },
  };
},
};

export default nextConfig;
