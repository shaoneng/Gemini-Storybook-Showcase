// 文件路径: /next-i18next.config.js
module.exports = {
  i18n: {
    locales: ['en', 'zh'],
    defaultLocale: 'zh',
  },
  reloadOnPrerender: process.env.NODE_ENV === 'development',
};