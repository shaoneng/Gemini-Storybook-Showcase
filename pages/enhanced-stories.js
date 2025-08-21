import Head from 'next/head';
import EnhancedStoryCard from '../components/EnhancedStoryCard';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import { getSortedStories, getAllTags, getAllAgeGroups, getStoryStats } from '../utils/storyData';
import { useState } from 'react';

const EnhancedStoriesPage = ({ stories, tags, ageGroups, stats }) => {
  const { t } = useTranslation('common');
  const router = useRouter();
  const locale = router.asPath.startsWith('/en') ? 'en' : 'zh';
  
  const [selectedTag, setSelectedTag] = useState('all');
  const [selectedAgeGroup, setSelectedAgeGroup] = useState('all');
  const [sortBy, setSortBy] = useState('date');

  // 过滤和排序故事
  const filteredStories = stories
    .filter(story => {
      const tagMatch = selectedTag === 'all' || 
        (story.tags && story.tags.includes(selectedTag));
      const ageMatch = selectedAgeGroup === 'all' || 
        story.ageGroup === selectedAgeGroup;
      return tagMatch && ageMatch;
    })
    .sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(b.submissionDate) - new Date(a.submissionDate);
      } else if (sortBy === 'words') {
        const aWords = a.wordCount ? a.wordCount[locale] || 0 : 0;
        const bWords = b.wordCount ? b.wordCount[locale] || 0 : 0;
        return bWords - aWords;
      }
      return 0;
    });

  return (
    <>
      <Head>
        <title>{t('site_title')} - 增强视图</title>
        <meta name="description" content="探索带有标签、分类和统计信息的AI故事集合" />
      </Head>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 统计信息 */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 mb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{stats.totalStories}</div>
              <div className="text-sm text-gray-600">总故事数</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{stats.totalWords}</div>
              <div className="text-sm text-gray-600">总字数</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{stats.uniqueTags}</div>
              <div className="text-sm text-gray-600">独特标签</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{stats.ageGroups}</div>
              <div className="text-sm text-gray-600">年龄分类</div>
            </div>
          </div>
        </div>

        {/* 过滤控件 */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                按标签筛选
              </label>
              <select 
                value={selectedTag}
                onChange={(e) => setSelectedTag(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">所有标签</option>
                {tags.map(tag => (
                  <option key={tag} value={tag}>{tag}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                按年龄组筛选
              </label>
              <select 
                value={selectedAgeGroup}
                onChange={(e) => setSelectedAgeGroup(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">所有年龄组</option>
                {ageGroups.map(group => (
                  <option key={group} value={group}>
                    {group === 'children' ? '儿童' : 
                     group === 'young-adult' ? '青少年' : 
                     group === 'all-ages' ? '全年龄' : group}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                排序方式
              </label>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="date">最新优先</option>
                <option value="words">字数最多</option>
              </select>
            </div>
          </div>
          
          <div className="mt-4 text-sm text-gray-500">
            显示 {filteredStories.length} 个故事（共 {stories.length} 个）
          </div>
        </div>

        {/* 故事网格 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredStories.map((story) => (
            <EnhancedStoryCard key={story.id} story={story} />
          ))}
        </div>

        {filteredStories.length === 0 && (
          <div className="text-center py-12">
            <div className="text-2xl text-gray-400 mb-4">🎭</div>
            <p className="text-gray-500">没有找到匹配的故事</p>
            <button 
              onClick={() => {
                setSelectedTag('all');
                setSelectedAgeGroup('all');
              }}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              清除筛选条件
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export async function getStaticProps() {
  const stories = getSortedStories();
  const tags = getAllTags();
  const ageGroups = getAllAgeGroups();
  const stats = getStoryStats();
  
  return {
    props: {
      ...(await serverSideTranslations('zh', ['common'])),
      stories,
      tags,
      ageGroups,
      stats
    },
  };
}

export default EnhancedStoriesPage;