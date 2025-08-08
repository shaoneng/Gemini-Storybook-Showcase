// 文件路径: /pages/story/[id].js
import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
// *** 关键修改 1: 直接从本地导入故事数据 ***
import storiesData from '../../data/stories.json';

const StoryPage = ({ story }) => {
  const { t } = useTranslation('common');
  const router = useRouter();
  // 从路径检测语言，因为静态导出时 router.locale 不可用
  const locale = router.asPath.startsWith('/en') ? 'en' : 'zh';
  const [copyButtonText, setCopyButtonText] = useState(t('story_copy_button'));

  if (!story) {
    return <div>Story not found.</div>;
  }

  // ... (您的组件其余部分代码保持不变)
  const handleCopyPrompt = async () => {
    if (!story.prompt[locale]) return;
    try {
      await navigator.clipboard.writeText(story.prompt[locale]);
      setCopyButtonText(t('story_copy_success'));
      setTimeout(() => setCopyButtonText(t('story_copy_button')), 2000);
    } catch (err) {
      console.error('复制失败: ', err);
    }
  };

  return (
    <>
      <Head>
        <title>{`${story.title[locale]} - ${t('site_title')}`}</title>
        <meta name="description" content={`探索由 ${story.author[locale] || t('anonymous_author')} 创作的AI故事《${story.title[locale]}》及其背后的魔法提示词。`} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "Book", "name": story.title[locale], "author": { "@type": "Person", "name": story.author[locale] || t('anonymous_author') }, "inLanguage": locale }) }} />
      </Head>
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden mb-8">
          <div className="relative w-full h-80">
            <Image src={story.coverImageUrl} alt={`封面图: ${story.title[locale]}`} layout="fill" objectFit="cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-6">
              <h1 className="text-3xl md:text-4xl font-bold text-white shadow-lg">{story.title[locale]}</h1>
              <p className="mt-1 text-md text-gray-200">{t('story_author_prefix')}: {story.author[locale] || t('anonymous_author')}</p>
            </div>
          </div>
          <div className="p-6 text-center">
            <a href={story.shareUrl} target="_blank" rel="noopener noreferrer" className="inline-block px-10 py-4 text-lg font-bold text-white bg-blue-600 rounded-full shadow-lg hover:bg-blue-700 transform hover:scale-105 transition-all">
              {t('story_open_button')}
            </a>
          </div>
        </div>
        <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg">
          <div className="mt-2">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">{t('story_prompt_title')}</h2>
            <div className="bg-gray-100 p-6 rounded-lg text-gray-700 font-mono text-sm whitespace-pre-wrap leading-relaxed">
              {story.prompt[locale]}
            </div>
            <button onClick={handleCopyPrompt} className="mt-4 px-6 py-2 font-semibold text-white bg-green-600 rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75 transition-all">
              {copyButtonText}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

// *** 关键修改 2: 静态导出时不依赖 locales 参数 ***
export async function getStaticPaths() {
  const paths = storiesData.map((story) => ({
    params: { id: story.id },
  }));
  return { paths, fallback: false };
}

// *** 关键修改 3: 使用导入的数据为每个页面获取 props ***

export async function getStaticProps({ params }) {
  const story = storiesData.find((s) => s.id === params.id);
  return {
    props: {
      ...(await serverSideTranslations('zh', ['common'])),
      story,
    },
  };
}

export default StoryPage;