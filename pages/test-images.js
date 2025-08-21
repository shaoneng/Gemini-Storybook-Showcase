import Image from 'next/image';
import { useState } from 'react';
import { getStories } from '../utils/storyData';

export default function TestImages() {
  const [imageStates, setImageStates] = useState({});

  const handleImageLoad = (id) => {
    setImageStates(prev => ({ ...prev, [id]: 'loaded' }));
    console.log(`图片加载成功: ${id}`);
  };

  const handleImageError = (id, url) => {
    setImageStates(prev => ({ ...prev, [id]: 'error' }));
    console.log(`图片加载失败: ${id}, URL: ${url}`);
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-8">图片加载测试</h1>
      
      {getStories().map((story) => (
        <div key={story.id} className="mb-8 p-4 border rounded">
          <h2 className="text-lg font-semibold mb-2">{story.title.zh}</h2>
          <p className="text-sm text-gray-600 mb-4">图片路径: {story.coverImageUrl}</p>
          <p className="text-sm mb-4">状态: {imageStates[story.id] || '未加载'}</p>
          
          <div className="relative w-64 h-40 bg-gray-200 border">
            <Image
              src={story.coverImageUrl}
              alt={story.title.zh}
              fill
              style={{ objectFit: 'cover' }}
              onLoad={() => handleImageLoad(story.id)}
              onError={() => handleImageError(story.id, story.coverImageUrl)}
            />
          </div>
        </div>
      ))}
    </div>
  );
}