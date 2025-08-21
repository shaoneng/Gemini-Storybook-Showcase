import { useState } from 'react';
import { getStories } from '../utils/storyData';

export default function MobileTest() {
  const [testResults, setTestResults] = useState({});

  const testImageUrl = (story) => {
    const img = new Image();
    img.onload = () => {
      setTestResults(prev => ({ 
        ...prev, 
        [story.id]: { status: 'success', message: '加载成功' }
      }));
    };
    img.onerror = () => {
      setTestResults(prev => ({ 
        ...prev, 
        [story.id]: { status: 'error', message: '加载失败' }
      }));
    };
    img.src = story.coverImageUrl;
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">移动端图片测试</h1>
      
      <div className="mb-4 p-3 bg-blue-50 rounded">
        <p className="text-sm">用户代理: {typeof window !== 'undefined' ? window.navigator.userAgent : 'SSR'}</p>
      </div>
      
      {getStories().map((story) => (
        <div key={story.id} className="mb-6 p-4 border rounded">
          <h3 className="font-semibold mb-2">{story.title.zh}</h3>
          <p className="text-sm text-gray-600 mb-2">路径: {story.coverImageUrl}</p>
          
          <button 
            onClick={() => testImageUrl(story)}
            className="mb-2 px-3 py-1 bg-blue-500 text-white rounded text-sm"
          >
            测试加载
          </button>
          
          {testResults[story.id] && (
            <div className={`p-2 rounded text-sm ${
              testResults[story.id].status === 'success' 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}>
              {testResults[story.id].message}
            </div>
          )}
          
          <div className="mt-2 w-full h-32 bg-gray-100 rounded overflow-hidden">
            <img 
              src={story.coverImageUrl} 
              alt={story.title.zh}
              className="w-full h-full object-cover"
              onLoad={() => console.log('直接加载成功:', story.coverImageUrl)}
              onError={() => console.log('直接加载失败:', story.coverImageUrl)}
            />
          </div>
        </div>
      ))}
      
      <div className="mt-6 p-3 bg-gray-50 rounded">
        <h4 className="font-semibold mb-2">调试信息</h4>
        <p className="text-sm">当前域名: {typeof window !== 'undefined' ? window.location.origin : 'SSR'}</p>
        <p className="text-sm">屏幕宽度: {typeof window !== 'undefined' ? window.screen.width : 'SSR'}</p>
      </div>
    </div>
  );
}