// 文件路径: /components/LanguageSwitcher.js
import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import nextI18NextConfig from '../next-i18next.config.mjs';

const GlobeIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C13.18 7.76 14.16 9 15.334 9s2.154-1.24 2.4-2.636M15.334 9v12m-3.334-12V3m0 12h-3.334" />
  </svg>
);

const LanguageSwitcher = () => {
  const router = useRouter();
  const { locale: activeLocale, asPath } = router;
  const { locales, defaultLocale } = nextI18NextConfig.i18n;

  // *** 关键修改：使用更健壮的逻辑来构建不同语言的 URL ***
  const getHrefForLocale = (locale) => {
    let path = asPath;

    // 如果当前 URL 包含语言前缀 (例如 /en/about)，则先将其移除，得到基础路径 (/about)
    if (activeLocale && path.startsWith(`/${activeLocale}`)) {
      path = path.substring(activeLocale.length);
      // 如果移除后为空，说明是语言首页，基础路径应为 /
      if (path === '') {
        path = '/';
      }
    }

    // 如果目标语言是默认语言 (zh)，则直接使用基础路径
    if (locale === defaultLocale) {
      return path;
    }

    // 如果目标语言不是默认语言，则在基础路径前添加语言前缀
    return `/${locale}${path}`;
  };

  return (
    <div className="relative inline-block text-left">
      <Menu as="div" className="relative">
        <div>
          <Menu.Button className="inline-flex justify-center w-full px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-full shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            <GlobeIcon className="w-5 h-5" aria-hidden="true" />
          </Menu.Button>
        </div>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 z-10 w-32 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              {(locales || []).map((locale) => (
                <Menu.Item key={locale}>
                  {({ active }) => (
                    <Link
                      href={getHrefForLocale(locale)}
                      locale={false} // 在静态导出模式下，必须为 false
                      className={`
                        ${active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'}
                        ${locale === activeLocale ? 'font-bold' : 'font-normal'}
                        block px-4 py-2 text-sm
                      `}
                    >
                      {locale === 'zh' ? '中文' : 'English'}
                    </Link>
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