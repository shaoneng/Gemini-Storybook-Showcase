// 文件路径: /components/StoryCard.js
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';
import Image from 'next/image';

const StoryCard = ({ story }) => {
  const router = useRouter();
  const { t } = useTranslation('common');
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  
  // 骨架屏组件
  const SkeletonLoader = () => (
    <div className="animate-pulse bg-gray-200 rounded-xl group block transform hover:-translate-y-2 transition-transform duration-300">
      <div className="relative w-full h-56 bg-gray-300 rounded-t-xl"></div>
      <div className="p-6">
        <div className="h-6 bg-gray-300 rounded mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-2/3"></div>
      </div>
    </div>
  );
  
  // 从路径检测语言
  const locale = router.asPath.startsWith('/en') ? 'en' : 'zh';
  
  // 构建正确的故事链接
  const storyLink = locale === 'en' ? `/en/story/${story.id}` : `/story/${story.id}`;

  const handleImageLoad = () => {
    console.log('图片加载成功:', story.coverImageUrl);
    setImageLoaded(true);
  };

  const handleImageError = (e) => {
    console.error('图片加载失败:', story.coverImageUrl, e);
    setImageError(true);
  };

  // 如果故事数据不存在，显示骨架屏
  if (!story) {
    return <SkeletonLoader />;
  }

  return (
    <Link href={storyLink} className="group block bg-white rounded-xl shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300">
      <div className="relative w-full h-56 overflow-hidden bg-gray-100">

        
        {/* 加载状态 */}
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-200 animate-pulse">
            <div className="text-center">
              <div className="text-2xl mb-2">⏳</div>
              <div className="text-sm text-gray-500">加载中...</div>
            </div>
          </div>
        )}
        
        {/* 错误状态 */}
        {imageError && (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100">
            <div className="text-center">
              <div className="text-4xl mb-2">📚</div>
              <div className="text-sm text-gray-600">图片加载失败</div>
            </div>
          </div>
        )}
        
        {/* 图片 */}
        <Image 
          src={story.coverImageUrl} 
          alt={story.title[locale]} 
          fill
          className="object-cover transition-all duration-500 group-hover:scale-110"
          onLoad={handleImageLoad}
          onError={handleImageError}
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaUMkQjCbq6CvJaaH//2Q=="
        />
        
        {/* 遮罩层 */}
        {imageLoaded && <div className="absolute inset-0 bg-black bg-opacity-10 group-hover:bg-opacity-5 transition-colors"></div>}
      </div>
      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{story.title[locale]}</h2>
        <p className="mt-2 text-sm text-gray-600">{t('story_author_prefix')} {story.author[locale] || t('anonymous_author')}</p>
      </div>
    </Link>
  );
};

export default StoryCard;

