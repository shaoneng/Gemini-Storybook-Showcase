#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔍 测试路由配置...\n');

// 检查构建输出目录
const outDir = path.join(__dirname, '../out');

console.log('📁 检查构建输出目录结构:');

// 检查中文故事页面
const storyDir = path.join(outDir, 'story');
if (fs.existsSync(storyDir)) {
  const stories = fs.readdirSync(storyDir);
  console.log('\n📚 中文故事页面:');
  stories.forEach(story => {
    const indexPath = path.join(storyDir, story, 'index.html');
    const exists = fs.existsSync(indexPath);
    console.log(`  ${exists ? '✅' : '❌'} /story/${story}/index.html`);
  });
} else {
  console.log('❌ 中文故事目录不存在');
}

// 检查英文故事页面
const enStoryDir = path.join(outDir, 'en', 'story');
if (fs.existsSync(enStoryDir)) {
  const enStories = fs.readdirSync(enStoryDir);
  console.log('\n📚 英文故事页面:');
  enStories.forEach(story => {
    const indexPath = path.join(enStoryDir, story, 'index.html');
    const exists = fs.existsSync(indexPath);
    console.log(`  ${exists ? '✅' : '❌'} /en/story/${story}/index.html`);
  });
} else {
  console.log('❌ 英文故事目录不存在');
}

// 检查_redirects文件
const redirectsPath = path.join(outDir, '_redirects');
if (fs.existsSync(redirectsPath)) {
  console.log('\n✅ _redirects 文件存在');
  
  const redirectsContent = fs.readFileSync(redirectsPath, 'utf8');
  const lines = redirectsContent.split('\n').filter(line => line.trim() && !line.startsWith('#'));
  
  console.log('\n🔄 重定向规则:');
  lines.forEach(line => {
    if (line.includes('/story/')) {
      console.log(`  ${line}`);
    }
  });
} else {
  console.log('❌ _redirects 文件不存在');
}

console.log('\n🚀 测试建议:');
console.log('1. 部署后测试中文故事页面刷新: /story/the-hats-judgment');
console.log('2. 测试英文故事页面刷新: /en/story/the-hats-judgment');
console.log('3. 检查浏览器开发者工具的Network标签页');
console.log('4. 确认返回200状态码而不是404');

console.log('\n✨ 路由测试完成！');