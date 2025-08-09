import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { useState, useEffect } from 'react';

const FallbackStoryCard = ({ story }) => {
  const router = useRouter();
  const { t } = useTranslation('common');
  const [imageError, setImageError] = useState(false);
  const [useBackgroundImage, setUseBackgroundImage] = useState(false);
  
  // 从路径检测语言
  const locale = router.asPath.startsWith('/en') ? 'en' : 'zh';
  
  // 构建正确的故事链接
  const storyLink = locale === 'en' ? `/en/story/${story.id}` : `/story/${story.id}`;
  
  // 确保图片路径正确
  const imageUrl = story.coverImageUrl.startsWith('/') ? story.coverImageUrl : `/${story.coverImageUrl}`;

  const handleImageError = () => {
    console.log('img标签加载失败，切换到背景图片方案:', imageUrl);
    setImageError(true);
    setUseBackgroundImage(true);
  };

  // 如果是移动设备，直接使用背景图片
  useEffect(() => {
    const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if (isMobile) {
      console.log('检测到移动设备，使用背景图片方案');
      setUseBackgroundImage(true);
    }
  }, []);

  return (
    <Link href={storyLink} className="group block bg-white rounded-xl shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300">
      <div className="relative w-full h-56 overflow-hidden bg-gray-100">
        
        {useBackgroundImage ? (
          // 使用CSS背景图片
          <div 
            className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
            style={{
              backgroundImage: `url(${imageUrl})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
            onError={() => {
              console.log('背景图片也加载失败');
              setImageError(true);
            }}
          >
            {/* 如果背景图片也失败，显示占位符 */}
            {imageError && (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100">
                <div className="text-center">
                  <div className="text-4xl mb-2">📖</div>
                  <div className="text-sm text-gray-600">{story.title[locale]}</div>
                </div>
              </div>
            )}
          </div>
        ) : (
          // 使用img标签
          <>
            <img 
              src={imageUrl} 
              alt={story.title[locale]} 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              onError={handleImageError}
              loading="lazy"
            />
            
            {/* 加载失败时的占位符 */}
            {imageError && (
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100">
                <div className="text-center">
                  <div className="text-4xl mb-2">📚</div>
                  <div className="text-sm text-gray-600">切换显示方案中...</div>
                </div>
              </div>
            )}
          </>
        )}
        
      </div>
      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
          {story.title[locale]}
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          {t('story_author_prefix')} {story.author[locale] || t('anonymous_author')}
        </p>
      </div>
    </Link>
  );
};

export default FallbackStoryCard;