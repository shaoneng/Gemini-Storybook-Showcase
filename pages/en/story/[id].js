import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { getStories } from '../../../utils/storyData';

const EnglishStoryPage = ({ story }) => {
  const { t } = useTranslation('common');
  const locale = 'en'; // 固定为英文
  const [copyButtonText, setCopyButtonText] = useState(t('story_copy_button'));

  if (!story) {
    return <div>Story not found.</div>;
  }

  const handleCopyPrompt = async () => {
    if (!story.prompt[locale]) return;
    try {
      await navigator.clipboard.writeText(story.prompt[locale]);
      setCopyButtonText(t('story_copy_success'));
      setTimeout(() => setCopyButtonText(t('story_copy_button')), 2000);
    } catch (err) {
      console.error('Copy failed: ', err);
    }
  };

  return (
    <>
      <Head>
        <title>{story.title[locale]} - {t('site_title')}</title>
        <meta name="description" content={`Explore the AI story "${story.title[locale]}" by ${story.author[locale] || t('anonymous_author')} and discover the magic prompt behind it.`} />
      </Head>
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden mb-8">
          <div className="relative w-full h-80">
            <Image 
              src={story.coverImageUrl} 
              alt={`Cover: ${story.title[locale]}`} 
              layout="fill" 
              objectFit="cover" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-6">
              <h1 className="text-3xl md:text-4xl font-bold text-white shadow-lg">
                {story.title[locale]}
              </h1>
              <p className="mt-1 text-md text-gray-200">
                {t('story_author_prefix')}: {story.author[locale] || t('anonymous_author')}
              </p>
            </div>
          </div>
          <div className="p-6 text-center">
            <a 
              href={story.shareUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-block px-10 py-4 text-lg font-bold text-white bg-blue-600 rounded-full shadow-lg hover:bg-blue-700 transform hover:scale-105 transition-all"
            >
              {t('story_open_button')}
            </a>
          </div>
        </div>
        <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg">
          <div className="mt-2">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              {t('story_prompt_title')}
            </h2>
            <div className="bg-gray-100 p-6 rounded-lg text-gray-700 font-mono text-sm whitespace-pre-wrap leading-relaxed">
              {story.prompt[locale]}
            </div>
            <button 
              onClick={handleCopyPrompt} 
              className="mt-4 px-6 py-2 font-semibold text-white bg-green-600 rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75 transition-all"
            >
              {copyButtonText}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export async function getStaticPaths() {
  const stories = getStories();
  const paths = stories.map((story) => ({
    params: { id: story.id },
  }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const stories = getStories();
  const story = stories.find((s) => s.id === params.id);
  if (!story) {
    return { notFound: true };
  }
  return {
    props: {
      ...(await serverSideTranslations('en', ['common'])),
      story,
    },
  };
}

export default EnglishStoryPage;