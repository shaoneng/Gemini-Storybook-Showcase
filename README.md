# Gemini Storybook Showcase

一个展示由 Google Gemini Storybook 生成的 AI 故事的社区平台，支持中英文双语。

## 🌟 功能特点

- **双语支持**: 完整的中英文国际化
- **响应式设计**: 适配各种设备
- **故事展示**: 精美的故事卡片和详情页面
- **提示词分享**: 一键复制生成故事的提示词
- **静态部署**: 优化的 Cloudflare Pages 部署

## 🚀 快速开始

### 开发环境

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 在浏览器中打开 http://localhost:3000
```

### 构建和部署

```bash
# 构建项目
npm run build

# 验证构建结果
npm run verify

# 测试国际化配置
npm run test:i18n

# 完整部署流程
npm run deploy:full
```

## 🌐 在线访问

- **中文版**: https://geministorybook.online/
- **英文版**: https://geministorybook.online/en

## 📁 项目结构

```
├── components/          # React 组件
│   ├── Header.js       # 导航栏
│   ├── Layout.js       # 页面布局
│   ├── StoryCard.js    # 故事卡片
│   └── LanguageSwitcher.js # 语言切换器
├── pages/              # 页面路由
│   ├── index.js        # 中文首页
│   ├── en.js          # 英文首页
│   ├── about.js        # 关于页面
│   └── story/[id].js   # 故事详情页
├── data/
│   └── stories.json    # 故事数据
├── public/
│   ├── locales/        # 翻译文件
│   └── _redirects      # Cloudflare Pages 重定向规则
└── scripts/            # 构建和部署脚本
```

## 🔧 技术栈

- **框架**: Next.js 15.4.6
- **样式**: Tailwind CSS 4.0
- **国际化**: next-i18next
- **UI 组件**: Headless UI
- **部署**: Cloudflare Pages

## 🌍 国际化

项目支持中文（默认）和英文两种语言：

- 中文路径: `/`, `/about`, `/story/[id]`
- 英文路径: `/en`, `/en/about`, `/en/story/[id]`
- 自动重定向: `/zh/*` → 对应的中文路径

## 📝 添加新故事

1. 编辑 `data/stories.json` 文件
2. 添加新的故事对象，包含中英文内容
3. 将封面图片放入 `public/covers/` 目录
4. 重新构建和部署

## 🛠️ 开发脚本

| 命令 | 描述 |
|------|------|
| `npm run dev` | 启动开发服务器 |
| `npm run build` | 构建生产版本 |
| `npm run verify` | 验证构建输出 |
| `npm run test:i18n` | 测试国际化配置 |
| `npm run test:deployment` | 测试部署后的网站 |
| `npm run deploy` | 快速构建和验证 |
| `npm run deploy:full` | 完整部署流程 |

## 📋 部署指南

详细的部署说明请参考：
- [CLOUDFLARE_SETUP.md](./CLOUDFLARE_SETUP.md) - Cloudflare Pages 设置
- [DEPLOYMENT.md](./DEPLOYMENT.md) - 技术实现细节

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

MIT License

## 🙏 致谢

- [Google Gemini](https://gemini.google.com/) - AI 故事生成
- [Next.js](https://nextjs.org/) - React 框架
- [Tailwind CSS](https://tailwindcss.com/) - CSS 框架
- [Cloudflare Pages](https://pages.cloudflare.com/) - 静态网站托管