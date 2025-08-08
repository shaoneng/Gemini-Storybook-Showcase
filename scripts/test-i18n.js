#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🌐 测试国际化配置...');

// 检查翻译文件
const locales = ['zh', 'en'];
const namespaces = ['common', 'about'];

let allTranslationsExist = true;

locales.forEach(locale => {
  namespaces.forEach(namespace => {
    const filePath = path.join(__dirname, `../public/locales/${locale}/${namespace}.json`);
    if (fs.existsSync(filePath)) {
      console.log(`✅ ${locale}/${namespace}.json`);
      
      // 检查翻译文件是否为有效 JSON
      try {
        const content = fs.readFileSync(filePath, 'utf8');
        JSON.parse(content);
      } catch (error) {
        console.log(`❌ ${locale}/${namespace}.json - 无效的 JSON 格式`);
        allTranslationsExist = false;
      }
    } else {
      console.log(`❌ ${locale}/${namespace}.json - 文件不存在`);
      allTranslationsExist = false;
    }
  });
});

// 检查关键翻译键
const requiredKeys = [
  'site_title',
  'hero_title',
  'hero_subtitle',
  'nav_submit_story',
  'story_author_prefix',
  'story_prompt_title'
];

console.log('\n🔑 检查关键翻译键...');

locales.forEach(locale => {
  const commonFile = path.join(__dirname, `../public/locales/${locale}/common.json`);
  if (fs.existsSync(commonFile)) {
    const translations = JSON.parse(fs.readFileSync(commonFile, 'utf8'));
    
    requiredKeys.forEach(key => {
      if (translations[key]) {
        console.log(`✅ ${locale}: ${key}`);
      } else {
        console.log(`❌ ${locale}: ${key} - 缺失`);
        allTranslationsExist = false;
      }
    });
  }
});

if (allTranslationsExist) {
  console.log('\n🎉 所有国际化配置检查通过！');
} else {
  console.log('\n❌ 国际化配置检查失败，请修复上述问题');
  process.exit(1);
}