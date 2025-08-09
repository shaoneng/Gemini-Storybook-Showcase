// 文件路径: /components/Layout.js
import Header from './Header';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

const Footer = () => {
  const { t } = useTranslation('common');
  const router = useRouter();
  
  // 检测当前语言并生成正确的链接
  const isEnglish = router.asPath.startsWith('/en');
  const homeLink = isEnglish ? '/en' : '/';
  const aboutLink = isEnglish ? '/en/about' : '/about';
  return (
    <footer className="bg-gray-100 border-t">
      <div className="container mx-auto px-6 py-8 text-center text-gray-500">
        <div className="flex justify-center space-x-6 mb-4">
          <Link href={homeLink} className="hover:text-blue-500">{t('footer_home')}</Link>
          <Link href={aboutLink} className="hover:text-blue-500">{t('footer_about')}</Link>
        </div>
        <p className="text-sm">&copy; {new Date().getFullYear()} {t('site_title')}. {t('footer_copyright')}</p>
      </div>
    </footer>
  );
};

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-6 py-8">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;