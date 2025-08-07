// 文件路径: /components/Header.js

import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import LanguageSwitcher from './LanguageSwitcher';

const Header = () => {
  const { t } = useTranslation('common');
  const googleFormLink = "https://forms.gle/7LEUEsvjHL3fp4Zz7";

  return (
    <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
      <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-gray-800 hover:text-blue-500 transition-colors">
          {t('site_title')}
        </Link>
        <div className="flex items-center space-x-4">
          <Link href="/about" className="hidden sm:block px-4 py-2 text-sm font-semibold text-gray-700 hover:text-blue-500 transition-colors">
            {t('nav_what_is_storybook')}
          </Link>
          <a
            href={googleFormLink}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-full shadow-lg hover:bg-blue-700 transition-all"
          >
            {t('nav_submit_story')}
          </a>
          {/* 将语言切换器放在最后 */}
          <LanguageSwitcher />
        </div>
      </nav>
    </header>
  );
};

export default Header;