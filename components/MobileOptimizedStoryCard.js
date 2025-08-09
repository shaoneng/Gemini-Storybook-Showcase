import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { useState, useEffect } from 'react';

const MobileOptimizedStoryCard = ({ story }) => {
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

  const handleImageLoad = () => {
    console.log('✅ 图片加载成功:', imageUrl, '设备:', isMobile ? '移动端' : '桌面端');
    setImageLoaded(true);
  };

  const handleImageError = (e) => {
    console.error('❌ 图片加载失败:', imageUrl, '错误:', e.target.error);
    console.error('设备信息:', {
      isMobile,
      userAgent: navigator.userAgent,
      screenWidth: window.screen.width,
      windowWidth: window.innerWidth
    });
    setImageError(true);
  };

  // 预加载图片
  useEffect(() => {
    const img = new Image();
    img.onload = handleImageLoad;
    img.onerror = handleImageError;
    img.src = imageUrl;
  }, [imageUrl]);

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

export default MobileOptimizedStoryCard;