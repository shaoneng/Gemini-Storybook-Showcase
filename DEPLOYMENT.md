# Cloudflare Pages 部署指南

## 🎯 问题解决方案

这个解决方案解决了 Next.js 国际化路由在 Cloudflare Pages 静态部署时的问题。

### 🔧 核心修改

1. **移除了 Next.js 内置的 i18n 配置**
   - 静态导出不支持 Next.js 的内置国际化路由
   - 改用客户端语言检测

2. **创建了独立的英文首页** (`/pages/en.js`)
   - 使用英文翻译文件
   - 独立的静态生成

3. **修复了语言检测逻辑**
   - 所有组件都通过 `router.asPath.startsWith('/en')` 检测语言
   - 语言切换器正确处理路径转换

4. **优化了 Cloudflare Pages 重定向规则**
   - 英文路由：`/en/*` 映射到对应页面
   - 中文路由：`/zh/*` 重定向到默认路径

### 📁 文件结构

```
out/
├── index.html              # 中文首页
├── en/index.html           # 英文首页
├── about/index.html        # 中文关于页面
├── story/
│   ├── a-brave-cat-explorer/index.html
│   └── the-robot-who-learned-to-dance/index.html
└── _redirects              # Cloudflare Pages 重定向规则
```

### 🌐 路由映射

| 访问路径 | 实际文件 | 语言 |
|---------|---------|------|
| `/` | `/index.html` | 中文 |
| `/en` | `/en/index.html` | 英文 |
| `/en/` | `/en/index.html` | 英文 |
| `/about` | `/about/index.html` | 中文 |
| `/en/about` | `/about/index.html?lang=en` | 英文 |
| `/story/[id]` | `/story/[id]/index.html` | 中文 |
| `/en/story/[id]` | `/story/[id]/index.html?lang=en` | 英文 |
| `/zh/*` | 重定向到对应的中文路径 | 中文 |

### 🚀 部署步骤

1. **构建项目**：
   ```bash
   npm run deploy
   ```

2. **上传到 Cloudflare Pages**：
   - 将 `out/` 文件夹的所有内容上传到 Cloudflare Pages
   - `_redirects` 文件会自动处理路由重定向

3. **测试 URL**：
   - ✅ `https://geministorybook.online/` - 中文首页
   - ✅ `https://geministorybook.online/en` - 英文首页
   - ✅ `https://geministorybook.online/en/about` - 英文关于页面
   - ✅ `https://geministorybook.online/en/story/[id]` - 英文故事详情
   - ✅ `https://geministorybook.online/zh/*` - 重定向到中文版本

### 🔄 语言切换

语言切换器会正确地在以下路径间切换：
- 中文：`/` ↔ 英文：`/en`
- 中文：`/about` ↔ 英文：`/en/about`
- 中文：`/story/[id]` ↔ 英文：`/en/story/[id]`

### 📝 技术细节

- **语言检测**：通过 `router.asPath.startsWith('/en')` 检测当前语言
- **翻译加载**：每个页面在 `getStaticProps` 中加载对应语言的翻译文件
- **路由重定向**：通过 Cloudflare Pages 的 `_redirects` 文件处理
- **静态生成**：所有页面都是静态生成，性能最优

### ✅ 验证

运行 `npm run verify` 可以验证构建输出是否正确。

这个解决方案完全解决了 Cloudflare Pages 上的国际化路由问题，用户现在可以正常访问所有语言版本的页面。