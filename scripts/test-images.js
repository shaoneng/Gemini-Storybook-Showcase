#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🖼️  测试图片文件...\n');

// 读取stories.json
const storiesPath = path.join(__dirname, '../data/stories.json');
const stories = JSON.parse(fs.readFileSync(storiesPath, 'utf8'));

console.log(`📚 找到 ${stories.length} 个故事`);

// 检查每个故事的封面图片
stories.forEach((story, index) => {
  const imagePath = path.join(__dirname, '../public', story.coverImageUrl);
  const exists = fs.existsSync(imagePath);
  
  console.log(`${index + 1}. ${story.title.zh}`);
  console.log(`   图片路径: ${story.coverImageUrl}`);
  console.log(`   文件存在: ${exists ? '✅' : '❌'}`);
  
  if (exists) {
    const stats = fs.statSync(imagePath);
    console.log(`   文件大小: ${(stats.size / 1024).toFixed(2)} KB`);
  }
  console.log('');
});

console.log('✨ 图片检查完成！');