// 故事数据类型定义
export interface Story {
  id: string;
  title: {
    en: string;
    zh: string;
  };
  author: {
    en: string;
    zh: string;
  };
  coverImageUrl: string;
  shareUrl: string;
  prompt: {
    en: string;
    zh: string;
  };
  submissionDate: string;
}

// 故事卡片组件属性
export interface StoryCardProps {
  story: Story;
  locale?: 'en' | 'zh';
}

// 语言环境类型
export type Locale = 'en' | 'zh';

// 翻译键类型
export interface TranslationKeys {
  site_title: string;
  meta_description: string;
  hero_title: string;
  hero_subtitle: string;
  nav_what_is_storybook: string;
  nav_submit_story: string;
  footer_home: string;
  footer_about: string;
  footer_copyright: string;
  story_author_prefix: string;
  story_prompt_title: string;
  story_copy_button: string;
  story_copy_success: string;
  story_open_button: string;
  anonymous_author: string;
}