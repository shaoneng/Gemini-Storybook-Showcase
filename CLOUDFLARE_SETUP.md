# Cloudflare Pages 部署设置指南

## 🚀 手动部署步骤

### 1. 构建项目

```bash
# 完整构建和验证
npm run deploy:full

# 或者快速构建
npm run deploy
```

### 2. 上传到 Cloudflare Pages

1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. 进入 **Pages** 部分
3. 点击 **Create a project**
4. 选择 **Upload assets**
5. 将 `out/` 文件夹中的所有内容拖拽上传
6. 设置项目名称为 `geministorybook`
7. 点击 **Deploy site**

### 3. 配置自定义域名

1. 在项目设置中点击 **Custom domains**
2. 添加域名 `geministorybook.online`
3. 按照提示配置 DNS 记录

## 🔧 自动化部署设置（可选）

如果你想设置自动化部署，需要以下步骤：

### 1. 获取 Cloudflare API 令牌

1. 访问 [Cloudflare API Tokens](https://dash.cloudflare.com/profile/api-tokens)
2. 点击 **Create Token**
3. 使用 **Custom token** 模板
4. 设置权限：
   - **Zone:Zone:Read**
   - **Zone:Page Rules:Edit**
   - **Account:Cloudflare Pages:Edit**
5. 复制生成的令牌
b6dwOVpqmjTk62JB95T0UPsYnXndOhtSBAf6ct_l

### 2. 配置 GitHub Secrets

在你的 GitHub 仓库中：

1. 进入 **Settings** > **Secrets and variables** > **Actions**
2. 添加以下 secrets：
   - `CLOUDFLARE_API_TOKEN`: 你的 API 令牌
   - `CLOUDFLARE_ACCOUNT_ID`: 你的 Cloudflare 账户 ID

### 3. 更新 GitHub Actions 工作流

```yaml
# .github/workflows/deploy.yml
name: Deploy to Cloudflare Pages

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v4
    
    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '18'
        cache: 'npm'
        
    - name: Install and build
      run: |
        npm ci
        npm run deploy
        
    - name: Deploy to Cloudflare Pages
      uses: cloudflare/pages-action@v1
      with:
        apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
        accountId: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
        projectName: geministorybook
        directory: out
```

## 📋 部署检查清单

在每次部署前，确保：

- [ ] 运行 `npm run test:i18n` 检查翻译文件
- [ ] 运行 `npm run build` 构建成功
- [ ] 运行 `npm run verify` 验证构建输出
- [ ] 检查 `out/_redirects` 文件存在
- [ ] 测试关键页面的语言切换功能

## 🌐 部署后测试

部署完成后，测试以下 URL：

- ✅ `https://geministorybook.online/` - 中文首页
- ✅ `https://geministorybook.online/en` - 英文首页
- ✅ `https://geministorybook.online/about` - 中文关于页面
- ✅ `https://geministorybook.online/en/about` - 英文关于页面
- ✅ `https://geministorybook.online/story/a-brave-cat-explorer` - 中文故事
- ✅ `https://geministorybook.online/en/story/a-brave-cat-explorer` - 英文故事
- ✅ 语言切换器功能

## 🔍 故障排除

### 问题：页面显示 404
- 检查 `_redirects` 文件是否正确上传
- 确认文件路径与重定向规则匹配

### 问题：语言切换不工作
- 检查 JavaScript 是否正确加载
- 确认翻译文件路径正确

### 问题：样式丢失
- 确认 `_next/static/` 目录完整上传
- 检查 CSS 文件是否正确生成

## 📞 支持

如果遇到问题，可以：
1. 检查 Cloudflare Pages 的构建日志
2. 使用浏览器开发者工具检查网络请求
3. 查看 `DEPLOYMENT.md` 了解技术细节