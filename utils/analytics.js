// 简单的页面访问统计
export const trackPageView = (url, locale) => {
  if (typeof window !== 'undefined') {
    // 可以集成 Google Analytics 或其他分析工具
    console.log(`Page view: ${url} (${locale})`);
    
    // 示例：发送到分析服务
    // gtag('config', 'GA_MEASUREMENT_ID', {
    //   page_title: document.title,
    //   page_location: url,
    //   custom_map: { custom_parameter_1: 'locale' },
    //   locale: locale
    // });
  }
};

// 语言切换统计
export const trackLanguageSwitch = (fromLang, toLang) => {
  if (typeof window !== 'undefined') {
    console.log(`Language switch: ${fromLang} -> ${toLang}`);
    
    // 示例：发送事件到分析服务
    // gtag('event', 'language_switch', {
    //   event_category: 'engagement',
    //   event_label: `${fromLang}_to_${toLang}`,
    //   value: 1
    // });
  }
};