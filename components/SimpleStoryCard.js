import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';

const SimpleStoryCard = ({ story }) => {
  const router = useRouter();
  const { t } = useTranslation('common');
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  
  // 从路径检测语言
  const locale = router.asPath.startsWith('/en') ? 'en' : 'zh';
  
  // 构建正确的故事链接
  const storyLink = locale === 'en' ? `/en/story/${story.id}` : `/story/${story.id}`;
  
  // 确保图片路径正确
  const imageUrl = story.coverImageUrl.startsWith('/') ? story.coverImageUrl : `/${story.coverImageUrl}`;

  const handleImageLoad = () => {
    console.log('图片加载成功:', imageUrl);
    setImageLoaded(true);
  };

  const handleImageError = (e) => {
    console.error('图片加载失败:', imageUrl, e);
    setImageError(true);
  };

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
              <div className="text-xs text-gray-500 mt-1">{imageUrl}</div>
            </div>
          </div>
        )}
        
        {/* 图片 */}
        <img 
          src={imageUrl} 
          alt={story.title[locale]} 
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          onLoad={handleImageLoad}
          onError={handleImageError}
          loading="lazy"
        />
        
      </div>
      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{story.title[locale]}</h2>
        <p className="mt-2 text-sm text-gray-600">{t('story_author_prefix')} {story.author[locale] || t('anonymous_author')}</p>
      </div>
    </Link>
  );
};

export default SimpleStoryCard;