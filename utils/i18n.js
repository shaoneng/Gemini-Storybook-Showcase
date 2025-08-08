// 客户端语言检测和管理工具
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export const LOCALES = ['zh', 'en'];
export const DEFAULT_LOCALE = 'zh';

// 从路径中检测语言
export function getLocaleFromPath(pathname) {
  if (pathname.startsWith('/en')) return 'en';
  return 'zh';
}

// 获取本地化的路径
export function getLocalizedPath(pathname, locale) {
  // 移除现有的语言前缀
  const cleanPath = pathname.replace(/^\/(en|zh)/, '') || '/';
  
  if (locale === 'en') {
    return `/en${cleanPath === '/' ? '' : cleanPath}`;
  }
  
  return cleanPath;
}

// 切换语言的路径
export function getSwitchLanguagePath(currentPath, targetLocale) {
  const currentLocale = getLocaleFromPath(currentPath);
  
  if (currentLocale === targetLocale) {
    return currentPath;
  }
  
  return getLocalizedPath(currentPath, targetLocale);
}

// React Hook 用于语言管理
export function useLocale() {
  const router = useRouter();
  const [locale, setLocale] = useState(DEFAULT_LOCALE);
  
  useEffect(() => {
    const detectedLocale = getLocaleFromPath(router.asPath);
    setLocale(detectedLocale);
  }, [router.asPath]);
  
  const switchLanguage = (newLocale) => {
    const newPath = getSwitchLanguagePath(router.asPath, newLocale);
    router.push(newPath);
  };
  
  return {
    locale,
    switchLanguage,
    availableLocales: LOCALES,
  };
}