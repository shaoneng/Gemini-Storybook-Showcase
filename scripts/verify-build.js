#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '../out');

console.log('🔍 验证构建输出...');

// 检查必要的文件是否存在
const requiredFiles = [
  'index.html',
  'about/index.html',
  'story/a-brave-cat-explorer/index.html',
  'story/the-robot-who-learned-to-dance/index.html',
  'en/index.html',
  'en/about/index.html',
  'en/story/a-brave-cat-explorer/index.html',
  'en/story/the-robot-who-learned-to-dance/index.html',
  '_redirects'
];

let allFilesExist = true;

requiredFiles.forEach(file => {
  const filePath = path.join(outDir, file);
  if (fs.existsSync(filePath)) {
    console.log(`✅ ${file}`);
  } else {
    console.log(`❌ ${file} - 文件不存在`);
    allFilesExist = false;
  }
});

if (allFilesExist) {
  console.log('\n🎉 所有必要文件都已生成！');
  console.log('\n📋 部署说明：');
  console.log('1. 将 out/ 文件夹的内容上传到 Cloudflare Pages');
  console.log('2. _redirects 文件会自动处理路由重定向');
  console.log('3. 测试以下 URL：');
  console.log('   - https://geministorybook.online/ (中文首页)');
  console.log('   - https://geministorybook.online/en (英文首页)');
  console.log('   - https://geministorybook.online/en/about (英文关于页面)');
} else {
  console.log('\n❌ 构建验证失败，请检查构建过程');
  process.exit(1);
}