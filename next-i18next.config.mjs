// 文件路径: /next-i18next.config.mjs
/** @type {import('next-i18next').UserConfig} */
const config = {
  i18n: {
    locales: ['en', 'zh'],
    defaultLocale: 'zh',
  },
  /**
   * @type {import('next-i18next').I18NConfig['reloadOnPrerender']}
   */
  reloadOnPrerender: process.env.NODE_ENV === 'development',
};

export default config;