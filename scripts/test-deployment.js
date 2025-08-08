#!/usr/bin/env node

const https = require('https');
const fs = require('fs');

const baseUrl = 'https://geministorybook.online';
const testUrls = [
  '/',
  '/en',
  '/about',
  '/en/about',
  '/story/a-brave-cat-explorer',
  '/en/story/a-brave-cat-explorer'
];

console.log('🌐 测试部署后的网站访问...');

async function testUrl(url) {
  return new Promise((resolve) => {
    const fullUrl = `${baseUrl}${url}`;
    
    https.get(fullUrl, (res) => {
      const status = res.statusCode;
      if (status === 200) {
        console.log(`✅ ${url} - 状态码: ${status}`);
        resolve(true);
      } else {
        console.log(`❌ ${url} - 状态码: ${status}`);
        resolve(false);
      }
    }).on('error', (err) => {
      console.log(`❌ ${url} - 错误: ${err.message}`);
      resolve(false);
    });
  });
}

async function runTests() {
  console.log(`测试基础 URL: ${baseUrl}\n`);
  
  let allPassed = true;
  
  for (const url of testUrls) {
    const result = await testUrl(url);
    if (!result) allPassed = false;
    
    // 添加延迟避免请求过快
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  
  console.log('\n' + '='.repeat(50));
  
  if (allPassed) {
    console.log('🎉 所有测试通过！网站部署成功！');
    console.log('\n📝 建议进一步测试：');
    console.log('1. 手动测试语言切换功能');
    console.log('2. 检查故事页面的提示词复制功能');
    console.log('3. 验证移动端响应式设计');
  } else {
    console.log('❌ 部分测试失败，请检查部署配置');
    console.log('\n🔍 故障排除建议：');
    console.log('1. 检查 _redirects 文件是否正确上传');
    console.log('2. 确认所有静态文件都已上传');
    console.log('3. 查看 Cloudflare Pages 的部署日志');
  }
}

// 检查是否在本地环境
if (process.argv.includes('--local')) {
  console.log('🏠 本地测试模式 - 跳过网络测试');
  console.log('请先运行 npm run build 确保构建成功');
  process.exit(0);
}

runTests().catch(console.error);