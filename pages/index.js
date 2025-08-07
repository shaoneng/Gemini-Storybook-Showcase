// 文件路径: /pages/index.js
import Head from 'next/head';
import StoryCard from '../components/StoryCard';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import path from 'path';
import fs from 'fs/promises';

const HomePage = ({ stories }) => {
  const { t } = useTranslation('common');

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
          <StoryCard key={story.id} story={story} />
        ))}
      </div>
    </>
  );
};

export async function getStaticProps({ locale }) {
  const filePath = path.join(process.cwd(), 'data', 'stories.json');
  const jsonData = await fs.readFile(filePath, 'utf-8');
  const storiesData = JSON.parse(jsonData);

  const sortedStories = storiesData.sort((a, b) => new Date(b.submissionDate) - new Date(a.submissionDate));
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      stories: sortedStories,
    },
  };
}

export default HomePage;