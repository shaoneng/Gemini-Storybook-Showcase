// 文件路径: /components/LanguageSwitcher.js
import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

const GlobeIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C13.18 7.76 14.16 9 15.334 9s2.154-1.24 2.4-2.636M15.334 9v12m-3.334-12V3m0 12h-3.334" />
    </svg>
);

const LanguageSwitcher = () => {
  const router = useRouter();
  const availableLocales = ['zh', 'en'];
  const activeLocale = router.asPath.startsWith('/en') ? 'en' : 'zh';
  
  // 构建语言切换链接 - 适配独立页面结构
  const getLanguageLink = (targetLocale) => {
    const currentPath = router.asPath;
    
    if (targetLocale === 'en') {
      // 切换到英文版本
      if (currentPath.startsWith('/en')) {
        return currentPath; // 已经是英文路径
      }
      
      // 根据当前页面映射到对应的英文页面
      if (currentPath === '/') {
        return '/en';
      } else if (currentPath === '/about') {
        return '/en/about';
      } else if (currentPath.startsWith('/story/')) {
        return `/en${currentPath}`;
      }
      
      return `/en${currentPath}`;
    } else {
      // 切换到中文版本
      if (!currentPath.startsWith('/en')) {
        return currentPath; // 已经是中文路径
      }
      
      // 从英文路径映射到中文路径
      if (currentPath === '/en' || currentPath === '/en/') {
        return '/';
      } else if (currentPath === '/en/about') {
        return '/about';
      } else if (currentPath.startsWith('/en/story/')) {
        return currentPath.replace('/en', '');
      }
      
      return currentPath.replace('/en', '') || '/';
    }
  };

  // 处理语言切换 - 添加平滑过渡和状态反馈
  const handleLanguageChange = (targetLocale, event) => {
    const targetUrl = getLanguageLink(targetLocale);
    
    // 添加平滑过渡效果
    document.body.style.opacity = '0.8';
    
    // 添加加载状态反馈
    const button = event?.currentTarget;
    if (button) {
      const originalText = button.textContent;
      button.textContent = targetLocale === 'zh' ? '切换中...' : 'Switching...';
      button.disabled = true;
      
      setTimeout(() => {
        if (button) {
          button.textContent = originalText;
          button.disabled = false;
        }
      }, 1000);
    }
    
    // 延迟导航以允许动画完成
    setTimeout(() => {
      router.push(targetUrl);
    }, 150);
  };

  return (
    <div className="relative inline-block text-left">
      <Menu as="div" className="relative">
        <div>
          <Menu.Button className="inline-flex justify-center w-full px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-full shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            <GlobeIcon className="w-5 h-5" aria-hidden="true" />
          </Menu.Button>
        </div>

        <Transition as={Fragment}>
          <Menu.Items className="absolute right-0 z-10 w-32 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              {availableLocales.map((locale) => (
                <Menu.Item key={locale}>
                  {({ active }) => (
                    <button
                      onClick={(e) => handleLanguageChange(locale, e)}
                      className={`
                        ${active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'}
                        ${locale === activeLocale ? 'font-bold' : 'font-normal'}
                        block px-4 py-2 text-sm w-full text-left transition-colors duration-200
                        hover:bg-blue-50 hover:text-blue-700
                      `}
                      disabled={locale === activeLocale}
                    >
                      {locale === 'zh' ? '中文' : 'English'}
                      {locale === activeLocale && (
                        <span className="ml-2 text-xs text-green-600">✓</span>
                      )}
                    </button>
                  )}
                </Menu.Item>
              ))}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

export default LanguageSwitcher;