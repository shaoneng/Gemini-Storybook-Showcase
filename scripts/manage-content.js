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

// 显示所有故事
function listStories() {
  const storiesPath = path.join(__dirname, '../data/stories.json');
  const stories = JSON.parse(fs.readFileSync(storiesPath, 'utf8'));
  
  console.log(`\n📚 当前共有 ${stories.length} 个故事:\n`);
  stories.forEach((story, index) => {
    console.log(`${index + 1}. ${story.title.zh} (${story.title.en})`);
    console.log(`   ID: ${story.id}`);
    console.log(`   作者: ${story.author.zh} (${story.author.en})`);
    console.log(`   提交时间: ${new Date(story.submissionDate).toLocaleDateString()}`);
    console.log('');
  });
}

// 删除故事
async function deleteStory() {
  const storiesPath = path.join(__dirname, '../data/stories.json');
  const stories = JSON.parse(fs.readFileSync(storiesPath, 'utf8'));
  
  listStories();
  
  const storyId = await question('请输入要删除的故事 ID: ');
  const storyIndex = stories.findIndex(s => s.id === storyId);
  
  if (storyIndex === -1) {
    console.log('❌ 未找到指定的故事');
    return;
  }
  
  const story = stories[storyIndex];
  console.log(`\n将要删除: ${story.title.zh} (${story.title.en})`);
  
  const confirm = await question('确认删除? (y/N): ');
  if (confirm.toLowerCase() !== 'y' && confirm.toLowerCase() !== 'yes') {
    console.log('❌ 取消删除');
    return;
  }
  
  // 删除故事
  stories.splice(storyIndex, 1);
  fs.writeFileSync(storiesPath, JSON.stringify(stories, null, 2));
  
  // 删除封面图片
  const imageName = story.coverImageUrl.replace('/covers/', '');
  const imagePath = path.join(__dirname, '../public/covers', imageName);
  if (fs.existsSync(imagePath)) {
    fs.unlinkSync(imagePath);
    console.log(`✅ 已删除封面图片: ${imageName}`);
  }
  
  // 从重定向规则中移除
  const redirectsPath = path.join(__dirname, '../public/_redirects');
  let redirectsContent = fs.readFileSync(redirectsPath, 'utf8');
  const lines = redirectsContent.split('\n');
  const filteredLines = lines.filter(line => !line.includes(`/story/${storyId}`));
  fs.writeFileSync(redirectsPath, filteredLines.join('\n'));
  
  console.log(`✅ 故事 "${story.title.zh}" 已删除`);
}

// 编辑故事
async function editStory() {
  const storiesPath = path.join(__dirname, '../data/stories.json');
  const stories = JSON.parse(fs.readFileSync(storiesPath, 'utf8'));
  
  listStories();
  
  const storyId = await question('请输入要编辑的故事 ID: ');
  const storyIndex = stories.findIndex(s => s.id === storyId);
  
  if (storyIndex === -1) {
    console.log('❌ 未找到指定的故事');
    return;
  }
  
  const story = stories[storyIndex];
  console.log(`\n编辑故事: ${story.title.zh} (${story.title.en})\n`);
  
  // 编辑各个字段
  const newTitleZh = await question(`中文标题 [${story.title.zh}]: `) || story.title.zh;
  const newTitleEn = await question(`英文标题 [${story.title.en}]: `) || story.title.en;
  const newAuthorZh = await question(`中文作者 [${story.author.zh}]: `) || story.author.zh;
  const newAuthorEn = await question(`英文作者 [${story.author.en}]: `) || story.author.en;
  const newShareUrl = await question(`分享链接 [${story.shareUrl}]: `) || story.shareUrl;
  const newPromptZh = await question(`中文提示词 [${story.prompt.zh.substring(0, 50)}...]: `) || story.prompt.zh;
  const newPromptEn = await question(`英文提示词 [${story.prompt.en.substring(0, 50)}...]: `) || story.prompt.en;
  
  // 更新故事
  stories[storyIndex] = {
    ...story,
    title: { zh: newTitleZh, en: newTitleEn },
    author: { zh: newAuthorZh, en: newAuthorEn },
    shareUrl: newShareUrl,
    prompt: { zh: newPromptZh, en: newPromptEn }
  };
  
  fs.writeFileSync(storiesPath, JSON.stringify(stories, null, 2));
  console.log('✅ 故事已更新');
}

// 检查故事完整性
function checkStories() {
  const storiesPath = path.join(__dirname, '../data/stories.json');
  const stories = JSON.parse(fs.readFileSync(storiesPath, 'utf8'));
  
  console.log('\n🔍 检查故事完整性...\n');
  
  let issues = 0;
  
  stories.forEach((story, index) => {
    console.log(`${index + 1}. ${story.title.zh}:`);
    
    // 检查必填字段
    const requiredFields = ['id', 'title.zh', 'title.en', 'author.zh', 'author.en', 'coverImageUrl', 'shareUrl', 'prompt.zh', 'prompt.en'];
    requiredFields.forEach(field => {
      const value = field.includes('.') ? 
        field.split('.').reduce((obj, key) => obj?.[key], story) : 
        story[field];
      
      if (!value) {
        console.log(`   ❌ 缺少字段: ${field}`);
        issues++;
      }
    });
    
    // 检查封面图片
    const imageName = story.coverImageUrl.replace('/covers/', '');
    const imagePath = path.join(__dirname, '../public/covers', imageName);
    if (!fs.existsSync(imagePath)) {
      console.log(`   ❌ 封面图片不存在: ${imageName}`);
      issues++;
    } else {
      console.log(`   ✅ 封面图片存在`);
    }
    
    // 检查 ID 格式
    if (!/^[a-z0-9-]+$/.test(story.id)) {
      console.log(`   ❌ ID 格式不正确: ${story.id}`);
      issues++;
    }
    
    console.log('');
  });
  
  if (issues === 0) {
    console.log('🎉 所有故事都完整无误！');
  } else {
    console.log(`⚠️ 发现 ${issues} 个问题需要修复`);
  }
}

// 主菜单
async function mainMenu() {
  console.log('🎨 Gemini Storybook 内容管理工具\n');
  console.log('请选择操作:');
  console.log('1. 添加单个故事');
  console.log('2. 批量添加故事');
  console.log('3. 查看所有故事');
  console.log('4. 编辑故事');
  console.log('5. 删除故事');
  console.log('6. 检查故事完整性');
  console.log('7. 构建和部署');
  console.log('0. 退出\n');
  
  const choice = await question('请输入选项 (0-7): ');
  
  switch (choice) {
    case '1':
      console.log('\n启动单个故事添加工具...');
      rl.close();
      require('./smart-add-story.js');
      break;
      
    case '2':
      console.log('\n启动批量添加工具...');
      rl.close();
      require('./batch-add-stories.js');
      break;
      
    case '3':
      listStories();
      await question('\n按回车键继续...');
      mainMenu();
      break;
      
    case '4':
      await editStory();
      await question('\n按回车键继续...');
      mainMenu();
      break;
      
    case '5':
      await deleteStory();
      await question('\n按回车键继续...');
      mainMenu();
      break;
      
    case '6':
      checkStories();
      await question('\n按回车键继续...');
      mainMenu();
      break;
      
    case '7':
      console.log('\n🔨 开始构建和验证...');
      try {
        execSync('npm run build', { stdio: 'inherit' });
        execSync('npm run verify', { stdio: 'inherit' });
        console.log('\n✅ 构建完成！可以部署到 Cloudflare Pages');
      } catch (error) {
        console.log('\n❌ 构建失败，请检查错误信息');
      }
      await question('\n按回车键继续...');
      mainMenu();
      break;
      
    case '0':
      console.log('👋 再见！');
      rl.close();
      break;
      
    default:
      console.log('❌ 无效选项，请重新选择');
      mainMenu();
  }
}

mainMenu();