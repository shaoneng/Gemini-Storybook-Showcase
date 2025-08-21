// 文件路径: /pages/index.js
import Head from 'next/head';
import FallbackStoryCard from '../components/FallbackStoryCard';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import { getSortedStories } from '../utils/storyData';

const HomePage = ({ stories }) => {
  const { t } = useTranslation('common');
  const router = useRouter();
  const locale = router.asPath.startsWith('/en') ? 'en' : 'zh';

  return (
    <>
      <Head>
        <title>{t('site_title')}</title>
        <meta name="description" content={t('meta_description')} />
      </Head>
      <div className="text-center mb-16">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">{t('hero_title')}</h1>
        <p className="mt-4 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
          {t('hero_subtitle')}
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {stories.map((story) => (
          <FallbackStoryCard key={story.id} story={story} />
        ))}
      </div>
    </>
  );
};

// *** 关键修改：当 locale 不存在时，提供默认值 'zh' ***
export async function getStaticProps() {
  const sortedStories = getSortedStories();
  
  return {
    props: {
      ...(await serverSideTranslations('en', ['common'])),
      stories: sortedStories,
    },
  };
}

export default HomePage;