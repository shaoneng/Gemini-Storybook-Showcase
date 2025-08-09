#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// 批量添加故事的模板
const BATCH_TEMPLATE = `
// 批量添加故事模板
// 复制这个模板，填入你的故事信息，然后运行脚本

const newStories = [
  {
    titleZh: "示例故事1",
    titleEn: "Example Story 1",
    authorZh: "示例作者",
    authorEn: "Example Author",
    coverImage: "example-1.png", // 图片文件名
    shareUrl: "https://g.co/gemini/share/example1",
    promptZh: "这是一个示例中文提示词",
    promptEn: "This is an example English prompt"
  },
  {
    titleZh: "示例故事2",
    titleEn: "Example Story 2",
    authorZh: "另一个作者",
    authorEn: "Another Author",
    coverImage: "example-2.png",
    shareUrl: "https://g.co/gemini/share/example2",
    promptZh: "另一个示例中文提示词",
    promptEn: "Another example English prompt"
  }
  // 添加更多故事...
];

module.exports = newStories;
`;

// 生成 kebab-case ID
function generateId(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

// 更新重定向规则
function updateRedirectsForStories(storyIds) {
  const redirectsPath = path.join(__dirname, '../public/_redirects');
  let content = fs.readFileSync(redirectsPath, 'utf8');
  
  const lines = content.split('\n');
  const englishSectionIndex = lines.findIndex(line => line.includes('# 英文路由'));
  
  if (englishSectionIndex >= 0) {
    const newRules = [];
    storyIds.forEach(id => {
      if (!content.includes(`/en/story/${id}`)) {
        newRules.push(`/en/story/${id} /en/story/${id}.html 200`);
      }
    });
    
    if (newRules.length > 0) {
      lines.splice(englishSectionIndex + 1, 0, ...newRules);
      fs.writeFileSync(redirectsPath, lines.join('\n'));
      console.log(`✅ 已为 ${newRules.length} 个故事更新重定向规则`);
    }
  }
}

async function batchAddStories() {
  console.log('📚 批量添加故事工具\n');

  const templatePath = path.join(__dirname, 'batch-stories-template.js');
  
  // 创建模板文件（如果不存在）
  if (!fs.existsSync(templatePath)) {
    fs.writeFileSync(templatePath, BATCH_TEMPLATE);
    console.log(`📝 已创建模板文件: ${templatePath}`);
    console.log('请编辑模板文件，填入你的故事信息，然后重新运行此脚本。\n');
    return;
  }

  try {
    // 读取批量故事数据
    delete require.cache[require.resolve('./batch-stories-template.js')];
    const newStoriesData = require('./batch-stories-template.js');
    
    if (!Array.isArray(newStoriesData) || newStoriesData.length === 0) {
      console.log('❌ 模板文件中没有找到有效的故事数据');
      return;
    }

    console.log(`📖 找到 ${newStoriesData.length} 个故事待添加\n`);

    // 转换为标准格式
    const processedStories = newStoriesData.map(storyData => {
      const id = generateId(storyData.titleEn || storyData.titleZh);
      
      return {
        id,
        title: {
          en: storyData.titleEn,
          zh: storyData.titleZh
        },
        author: {
          en: storyData.authorEn,
          zh: storyData.authorZh
        },
        coverImageUrl: `/covers/${storyData.coverImage}`,
        shareUrl: storyData.shareUrl,
        prompt: {
          en: storyData.promptEn,
          zh: storyData.promptZh
        },
        submissionDate: new Date().toISOString()
      };
    });

    // 读取现有故事
    const storiesPath = path.join(__dirname, '../data/stories.json');
    const existingStories = JSON.parse(fs.readFileSync(storiesPath, 'utf8'));
    
    // 检查重复 ID
    const existingIds = new Set(existingStories.map(s => s.id));
    const duplicates = processedStories.filter(s => existingIds.has(s.id));
    
    if (duplicates.length > 0) {
      console.log('❌ 发现重复的故事 ID:');
      duplicates.forEach(s => console.log(`  - ${s.id}`));
      return;
    }

    // 合并故事（新故事添加到开头）
    const allStories = [...processedStories, ...existingStories];
    
    // 写入更新后的数据
    fs.writeFileSync(storiesPath, JSON.stringify(allStories, null, 2));
    console.log(`✅ 已添加 ${processedStories.length} 个故事到数据文件`);

    // 更新重定向规则
    const newIds = processedStories.map(s => s.id);
    updateRedirectsForStories(newIds);

    // 显示需要的图片文件
    console.log('\n🖼️ 需要的封面图片文件:');
    processedStories.forEach(story => {
      const imageName = story.coverImageUrl.replace('/covers/', '');
      const imagePath = path.join(__dirname, '../public/covers', imageName);
      const exists = fs.existsSync(imagePath);
      console.log(`  ${exists ? '✅' : '❌'} ${imageName}`);
    });

    // 构建和验证
    console.log('\n🔨 开始构建...');
    try {
      execSync('npm run build', { stdio: 'inherit' });
      execSync('npm run verify', { stdio: 'inherit' });
      
      console.log('\n🎉 批量添加完成！');
      console.log('\n📋 接下来的步骤:');
      console.log('1. 确保所有封面图片都已放入 public/covers/ 目录');
      console.log('2. 将 out/ 文件夹内容上传到 Cloudflare Pages');
      
      console.log('\n🌐 新故事访问地址:');
      processedStories.forEach(story => {
        console.log(`   ${story.title.zh}: https://geministorybook.online/story/${story.id}`);
        console.log(`   ${story.title.en}: https://geministorybook.online/en/story/${story.id}`);
      });
      
    } catch (error) {
      console.log('❌ 构建失败，请检查错误信息');
    }

  } catch (error) {
    console.error('❌ 批量添加失败:', error.message);
  }
}

batchAddStories();