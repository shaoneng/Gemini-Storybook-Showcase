#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🖼️  图片压缩脚本');
console.log('注意：这个脚本需要安装 sharp 库来压缩图片');
console.log('运行: npm install sharp');
console.log('');

const coversDir = path.join(__dirname, '../public/covers');
const files = fs.readdirSync(coversDir);

console.log('当前图片文件:');
files.forEach(file => {
  const filePath = path.join(coversDir, file);
  const stats = fs.statSync(filePath);
  const sizeMB = (stats.size / 1024 / 1024).toFixed(2);
  console.log(`  ${file}: ${sizeMB} MB`);
});

console.log('');
console.log('建议的优化方案:');
console.log('1. 将图片压缩到 500KB 以下');
console.log('2. 转换为 JPEG 格式（更小的文件大小）');
console.log('3. 调整尺寸到 800x600 像素');
console.log('');
console.log('手动压缩工具推荐:');
console.log('- TinyPNG (https://tinypng.com/)');
console.log('- ImageOptim (macOS)');
console.log('- 在线压缩工具');

// 如果安装了 sharp，可以自动压缩
try {
  const sharp = require('sharp');
  console.log('');
  console.log('✅ 检测到 sharp 库，开始自动压缩...');
  
  files.forEach(async (file) => {
    if (file.endsWith('.png')) {
      const inputPath = path.join(coversDir, file);
      const outputPath = path.join(coversDir, file.replace('.png', '-compressed.jpg'));
      
      try {
        await sharp(inputPath)
          .resize(800, 600, { fit: 'cover' })
          .jpeg({ quality: 80 })
          .toFile(outputPath);
        
        const originalStats = fs.statSync(inputPath);
        const compressedStats = fs.statSync(outputPath);
        const reduction = ((originalStats.size - compressedStats.size) / originalStats.size * 100).toFixed(1);
        
        console.log(`  ✅ ${file} -> ${file.replace('.png', '-compressed.jpg')} (减少 ${reduction}%)`);
      } catch (error) {
        console.error(`  ❌ 压缩失败: ${file}`, error.message);
      }
    }
  });
} catch (error) {
  console.log('');
  console.log('💡 要自动压缩图片，请运行:');
  console.log('   npm install sharp');
  console.log('   node scripts/compress-images.js');
}