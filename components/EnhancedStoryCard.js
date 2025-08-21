import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { useState, useEffect, useCallback } from 'react';

const EnhancedStoryCard = ({ story }) => {
  const router = useRouter();
  const { t } = useTranslation('common');
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  // 检测移动设备
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768 || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // 从路径检测语言
  const locale = router.asPath.startsWith('/en') ? 'en' : 'zh';
  
  // 构建正确的故事链接
  const storyLink = locale === 'en' ? `/en/story/${story.id}` : `/story/${story.id}`;
  
  // 确保图片路径正确，并添加缓存破坏参数
  const baseImageUrl = story.coverImageUrl.startsWith('/') ? story.coverImageUrl : `/${story.coverImageUrl}`;
  const imageUrl = isMobile ? `${baseImageUrl}?mobile=1` : baseImageUrl;

  const handleImageLoad = useCallback(() => {
    setImageLoaded(true);
  }, []);

  const handleImageError = useCallback((e) => {
    setImageError(true);
  }, []);

  // 预加载图片
  useEffect(() => {
    const img = new Image();
    img.onload = handleImageLoad;
    img.onerror = handleImageError;
    img.src = imageUrl;
  }, [imageUrl, handleImageLoad, handleImageError]);

  // 格式化标签显示
  const renderTags = () => {
    if (!story.tags || !Array.isArray(story.tags) || story.tags.length === 0) {
      return null;
    }
    
    return (
      <div className="mt-2 flex flex-wrap gap-1">
        {story.tags.slice(0, 3).map((tag, index) => (
          <span 
            key={index}
            className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
          >
            {tag}
          </span>
        ))}
        {story.tags.length > 3 && (
          <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
            +{story.tags.length - 3}
          </span>
        )}
      </div>
    );
  };

  // 显示年龄组信息
  const renderAgeGroup = () => {
    if (!story.ageGroup) return null;
    
    const ageGroupLabels = {
      'children': t('age_group_children') || '儿童',
      'young-adult': t('age_group_young_adult') || '青少年',
      'all-ages': t('age_group_all_ages') || '全年龄'
    };
    
    return (
      <div className="mt-1">
        <span className="inline-flex items-center px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
          {ageGroupLabels[story.ageGroup] || story.ageGroup}
        </span>
      </div>
    );
  };

  // 显示字数统计
  const renderWordCount = () => {
    if (!story.wordCount || !story.wordCount[locale]) return null;
    
    return (
      <div className="mt-1 text-xs text-gray-500">
        {t('word_count') || '字数'}: {story.wordCount[locale]}
      </div>
    );
  };

  return (
    <Link href={storyLink} className="group block bg-white rounded-xl shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300">
      <div className="relative w-full h-56 overflow-hidden bg-gray-100">
        
        {/* 调试信息 - 仅在开发环境显示 */}
        {process.env.NODE_ENV === 'development' && (
          <div className="absolute top-2 right-2 z-50 text-xs bg-black text-white px-2 py-1 rounded">
            {isMobile ? '📱' : '💻'} {imageLoaded ? '✅' : imageError ? '❌' : '⏳'}
          </div>
        )}
        
        {/* 加载状态 */}
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-200 animate-pulse">
            <div className="text-center">
              <div className="text-2xl mb-2">⏳</div>
              <div className="text-sm text-gray-500">
                {isMobile ? '移动端加载中...' : '加载中...'}
              </div>
            </div>
          </div>
        )}
        
        {/* 错误状态 */}
        {imageError && (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-red-100 to-orange-100">
            <div className="text-center p-4">
              <div className="text-4xl mb-2">🖼️</div>
              <div className="text-sm text-gray-700 font-medium">图片无法显示</div>
              <div className="text-xs text-gray-500 mt-1 break-all">{imageUrl}</div>
              <div className="text-xs text-gray-400 mt-1">
                {isMobile ? '移动设备' : '桌面设备'}
              </div>
            </div>
          </div>
        )}
        
        {/* 图片 - 使用多种加载策略 */}
        {!imageError && (
          <>
            {/* 主图片 */}
            <img 
              src={imageUrl} 
              alt={story.title[locale]} 
              className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 group-hover:scale-110 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={handleImageLoad}
              onError={handleImageError}
              loading="eager"
              decoding="async"
            />
            
            {/* 备用图片 - 如果主图片失败 */}
            {imageError && (
              <div 
                className="absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                style={{
                  backgroundImage: `url(${baseImageUrl})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              />
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
        
        {/* 新增的元数据信息 */}
        {renderTags()}
        {renderAgeGroup()}
        {renderWordCount()}
        
        {/* 调试信息 */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mt-2 text-xs text-gray-400">
            设备: {isMobile ? '移动端' : '桌面端'} | 
            语言: {locale} | 
            状态: {imageLoaded ? '已加载' : imageError ? '失败' : '加载中'}
          </div>
        )}
      </div>
    </Link>
  );
};

export default EnhancedStoryCard;