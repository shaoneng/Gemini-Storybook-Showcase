#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { execSync } = require('child_process');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, resolve);
  });
}

// 生成 kebab-case ID
function generateId(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

// 自动下载图片（如果提供了 URL）
async function downloadImage(url, filename) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('下载失败');
    
    const buffer = await response.arrayBuffer();
    const imagePath = path.join(__dirname, '../public/covers', filename);
    fs.writeFileSync(imagePath, Buffer.from(buffer));
    
    console.log(`✅ 图片已下载: ${filename}`);
    return true;
  } catch (error) {
    console.log(`❌ 图片下载失败: ${error.message}`);
    return false;
  }
}

// 自动更新重定向规则
function updateRedirects(storyId) {
  const redirectsPath = path.join(__dirname, '../public/_redirects');
  let content = fs.readFileSync(redirectsPath, 'utf8');
  
  // 检查是否已存在
  if (content.includes(`/en/story/${storyId}`)) {
    return;
  }
  
  // 找到英文路由部分并添加新规则
  const lines = content.split('\n');
  const englishSectionIndex = lines.findIndex(line => line.includes('# 英文路由'));
  
  if (englishSectionIndex >= 0) {
    // 在英文路由部分添加新规则
    const insertIndex = englishSectionIndex + 1;
    const newRules = [
      `/en/story/${storyId} /en/story/${storyId}.html 200`
    ];
    
    lines.splice(insertIndex, 0, ...newRules);
    fs.writeFileSync(redirectsPath, lines.join('\n'));
    console.log(`✅ 重定向规则已更新`);
  }
}

// 验证构建
function verifyBuild() {
  try {
    console.log('🔨 开始构建...');
    execSync('npm run build', { stdio: 'inherit' });
    
    console.log('✅ 验证构建结果...');
    execSync('npm run verify', { stdio: 'inherit' });
    
    return true;
  } catch (error) {
    console.log('❌ 构建失败:', error.message);
    return false;
  }
}

async function smartAddStory() {
  console.log('🚀 智能故事添加工具 v2.0\n');

  try {
    // 基本信息收集
    console.log('📝 基本信息:');
    const titleZh = await question('中文标题: ');
    const titleEn = await question('英文标题 (留空自动翻译): ') || titleZh;
    
    // 自动生成 ID
    const suggestedId = generateId(titleEn || titleZh);
    const id = await question(`故事 ID [${suggestedId}]: `) || suggestedId;
    
    const authorZh = await question('中文作者名: ');
    const authorEn = await question('英文作者名 (留空使用中文): ') || authorZh;
    
    // 图片处理
    console.log('\n🖼️ 封面图片:');
    const imageChoice = await question('选择图片方式 (1: 本地文件路径, 2: 网络URL, 3: 稍后手动添加): ');
    
    let coverImage = `${id}.png`;
    let imageHandled = false;
    
    if (imageChoice === '1') {
      const imagePath = await question('本地图片文件路径: ');
      if (fs.existsSync(imagePath)) {
        const ext = path.extname(imagePath);
        coverImage = `${id}${ext}`;
        const destPath = path.join(__dirname, '../public/covers', coverImage);
        fs.copyFileSync(imagePath, destPath);
        console.log(`✅ 图片已复制: ${coverImage}`);
        imageHandled = true;
      }
    } else if (imageChoice === '2') {
      const imageUrl = await question('图片 URL: ');
      imageHandled = await downloadImage(imageUrl, coverImage);
    }
    
    // Gemini 信息
    console.log('\n🤖 Gemini 信息:');
    const shareUrl = await question('Gemini 分享链接: ');
    const promptZh = await question('中文提示词: ');
    const promptEn = await question('英文提示词 (留空使用中文): ') || promptZh;
    
    // 创建故事对象
    const newStory = {
      id,
      title: { en: titleEn, zh: titleZh },
      author: { en: authorEn, zh: authorZh },
      coverImageUrl: `/covers/${coverImage}`,
      shareUrl,
      prompt: { en: promptEn, zh: promptZh },
      submissionDate: new Date().toISOString()
    };
    
    // 读取并更新故事数据
    const storiesPath = path.join(__dirname, '../data/stories.json');
    const stories = JSON.parse(fs.readFileSync(storiesPath, 'utf8'));
    
    // 检查重复 ID
    if (stories.some(story => story.id === id)) {
      console.log(`❌ 故事 ID "${id}" 已存在！`);
      process.exit(1);
    }
    
    // 添加新故事到开头
    stories.unshift(newStory);
    fs.writeFileSync(storiesPath, JSON.stringify(stories, null, 2));
    console.log('✅ 故事数据已更新');
    
    // 更新重定向规则
    updateRedirects(id);
    
    // 询问是否立即构建
    const shouldBuild = await question('\n🔨 是否立即构建和验证? (y/N): ');
    if (shouldBuild.toLowerCase() === 'y' || shouldBuild.toLowerCase() === 'yes') {
      const buildSuccess = verifyBuild();
      
      if (buildSuccess) {
        console.log('\n🎉 故事添加完成！');
        console.log('\n📋 接下来的步骤:');
        if (!imageHandled) {
          console.log(`1. 将封面图片 "${coverImage}" 放入 public/covers/ 目录`);
        }
        console.log('2. 将 out/ 文件夹内容上传到 Cloudflare Pages');
        console.log('\n🌐 新故事访问地址:');
        console.log(`   中文: https://geministorybook.online/story/${id}`);
        console.log(`   英文: https://geministorybook.online/en/story/${id}`);
      }
    } else {
      console.log('\n✅ 故事数据已添加！');
      console.log('\n📋 手动步骤:');
      if (!imageHandled) {
        console.log(`1. 将封面图片 "${coverImage}" 放入 public/covers/ 目录`);
      }
      console.log('2. 运行 npm run build');
      console.log('3. 运行 npm run verify');
      console.log('4. 部署到 Cloudflare Pages');
    }
    
  } catch (error) {
    console.error('❌ 错误:', error.message);
    process.exit(1);
  } finally {
    rl.close();
  }
}

smartAddStory();