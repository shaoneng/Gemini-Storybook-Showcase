#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, resolve);
  });
}

async function addNewStory() {
  console.log('🎨 Gemini Storybook - 添加新故事工具\n');

  try {
    // 收集故事信息
    const id = await question('故事 ID (使用 kebab-case，如 my-new-story): ');
    const titleEn = await question('英文标题: ');
    const titleZh = await question('中文标题: ');
    const authorEn = await question('英文作者名: ');
    const authorZh = await question('中文作者名: ');
    const coverImage = await question('封面图片文件名 (如 my-story.png): ');
    const shareUrl = await question('Gemini 分享链接: ');
    const promptEn = await question('英文提示词: ');
    const promptZh = await question('中文提示词: ');

    // 验证输入
    if (!id || !titleEn || !titleZh || !coverImage) {
      console.log('❌ 必填字段不能为空！');
      process.exit(1);
    }

    // 验证 ID 格式
    if (!/^[a-z0-9-]+$/.test(id) || id.startsWith('-') || id.endsWith('-')) {
      console.log('❌ 故事 ID 格式不正确！请使用 kebab-case 格式（如 my-new-story）');
      process.exit(1);
    }

    // 创建新故事对象
    const newStory = {
      id,
      title: {
        en: titleEn,
        zh: titleZh
      },
      author: {
        en: authorEn,
        zh: authorZh
      },
      coverImageUrl: `/covers/${coverImage}`,
      shareUrl,
      prompt: {
        en: promptEn,
        zh: promptZh
      },
      submissionDate: new Date().toISOString()
    };

    // 读取现有故事数据
    const storiesPath = path.join(__dirname, '../data/stories.json');
    let stories = [];
    
    if (fs.existsSync(storiesPath)) {
      const storiesData = fs.readFileSync(storiesPath, 'utf8');
      stories = JSON.parse(storiesData);
    }

    // 检查 ID 是否已存在
    if (stories.some(story => story.id === id)) {
      console.log(`❌ 故事 ID "${id}" 已存在！请使用不同的 ID。`);
      process.exit(1);
    }

    // 将新故事添加到数组开头（最新的故事显示在前面）
    stories.unshift(newStory);

    // 写入更新后的故事数据
    fs.writeFileSync(storiesPath, JSON.stringify(stories, null, 2));

    // 更新重定向规则
    const redirectsPath = path.join(__dirname, '../public/_redirects');
    let redirectsContent = '';
    
    if (fs.existsSync(redirectsPath)) {
      redirectsContent = fs.readFileSync(redirectsPath, 'utf8');
    }

    // 检查是否已有该故事的重定向规则
    if (!redirectsContent.includes(`/en/story/${id}`)) {
      // 在英文路由部分添加新的重定向规则
      const newRedirects = [
        `/en/story/${id} /en/story/${id}.html 200`,
        `/zh/story/${id} /story/${id} 302`,
        `/story/${id} /story/${id}.html 200`
      ];

      // 找到合适的位置插入新规则
      const lines = redirectsContent.split('\n');
      const insertIndex = lines.findIndex(line => line.includes('# 中文重定向'));
      
      if (insertIndex > 0) {
        lines.splice(insertIndex, 0, ...newRedirects, '');
        redirectsContent = lines.join('\n');
        fs.writeFileSync(redirectsPath, redirectsContent);
      }
    }

    console.log('\n✅ 故事添加成功！');
    console.log('\n📋 接下来的步骤：');
    console.log(`1. 将封面图片 "${coverImage}" 放入 public/covers/ 目录`);
    console.log('2. 运行 npm run build 构建项目');
    console.log('3. 运行 npm run verify 验证构建结果');
    console.log('4. 部署到 Cloudflare Pages');
    console.log('\n🌐 新故事将在以下 URL 可用：');
    console.log(`   中文: https://geministorybook.online/story/${id}`);
    console.log(`   英文: https://geministorybook.online/en/story/${id}`);

  } catch (error) {
    console.error('❌ 添加故事时出错：', error.message);
    process.exit(1);
  } finally {
    rl.close();
  }
}

// 运行脚本
addNewStory();