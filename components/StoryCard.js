// 文件路径: /components/StoryCard.js
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

const StoryCard = ({ story }) => {
  const router = useRouter();
  const { t } = useTranslation('common');
  // 从路径检测语言
  const locale = router.asPath.startsWith('/en') ? 'en' : 'zh';
  
  // 构建正确的故事链接
  const storyLink = locale === 'en' ? `/en/story/${story.id}` : `/story/${story.id}`;

  return (
    <Link href={storyLink} className="group block bg-white rounded-xl shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300">
      <div className="relative w-full h-56">
        <Image src={story.coverImageUrl} alt={story.title[locale]} layout="fill" objectFit="cover" className="transition-transform duration-500 group-hover:scale-110" />
        <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-10 transition-colors"></div>
      </div>
      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{story.title[locale]}</h2>
        <p className="mt-2 text-sm text-gray-600">{t('story_author_prefix')} {story.author[locale] || t('anonymous_author')}</p>
      </div>
    </Link>
  );
};

export default StoryCard;

