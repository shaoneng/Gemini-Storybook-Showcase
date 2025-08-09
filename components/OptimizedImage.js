import Image from 'next/image';
import { useState } from 'react';

const OptimizedImage = ({ src, alt, className, ...props }) => {
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const handleImageError = () => {
    setImageError(true);
    setIsLoading(false);
  };

  if (imageError) {
    return (
      <div className={`flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100 ${className}`}>
        <div className="text-center">
          <div className="text-4xl mb-2">📚</div>
          <div className="text-sm text-gray-600">图片加载失败</div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      {isLoading && (
        <div className={`absolute inset-0 flex items-center justify-center bg-gray-200 ${className}`}>
          <div className="text-center">
            <div className="text-2xl mb-2">⏳</div>
            <div className="text-sm text-gray-600">加载中...</div>
          </div>
        </div>
      )}
      <Image
        src={src}
        alt={alt}
        className={className}
        onLoad={handleImageLoad}
        onError={handleImageError}
        {...props}
      />
    </div>
  );
};

export default OptimizedImage;