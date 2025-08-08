# GitHub + Cloudflare Pages 完整部署指南

## 🎯 架构概览

```
GitHub Repository → GitHub Actions → Cloudflare Pages → 域名访问
     ↓                    ↓              ↓            ↓
   代码推送         →    自动构建    →   自动部署   →  geministorybook.online
```

## 📋 完整设置步骤

### 第一步：GitHub 仓库设置

1. **创建 GitHub 仓库**
   ```bash
   # 在 GitHub 上创建新仓库 'gemini-showcase'
   # 然后在本地初始化
   git init
   git add .
   git commit -m "Initial commit: Gemini Storybook Showcase"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/gemini-showcase.git
   git push -u origin main
   ```

2. **配置 GitHub Secrets**
   - 进入仓库 Settings → Secrets and variables → Actions
   - 添加以下 secrets：
     - `CLOUDFLARE_API_TOKEN`: Cloudflare API 令牌
     - `CLOUDFLARE_ACCOUNT_ID`: Cloudflare 账户 ID

### 第二步：获取 Cloudflare 凭据

1. **获取 API 令牌**
   - 访问 [Cloudflare API Tokens](https://dash.cloudflare.com/profile/api-tokens)
   - 点击 "Create Token"
   - 选择 "Custom token"
   - 设置权限：
     ```
     Zone - Zone Settings:Read
     Zone - Zone:Read  
     Account - Cloudflare Pages:Edit
     ```
   - 复制生成的令牌

2. **获取账户 ID**
   - 在 Cloudflare Dashboard 右侧边栏找到 "Account ID"
   - 复制账户 ID

### 第三步：Cloudflare Pages 项目设置

1. **创建 Pages 项目**
   - 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/)
   - 进入 Pages 部分
   - 点击 "Create a project"
   - 选择 "Connect to Git"
   - 连接你的 GitHub 仓库

2. **配置构建设置**
   ```
   Framework preset: Next.js
   Build command: npm run build
   Build output directory: out
   Root directory: /
   Environment variables: NODE_ENV=production
   ```

3. **设置自定义域名**
   - 在项目设置中添加自定义域名 `geministorybook.online`
   - 配置 DNS 记录指向 Cloudflare

### 第四步：DNS 配置

在你的域名注册商处设置 DNS：

```
类型    名称                    值
CNAME   geministorybook.online  YOUR_PROJECT.pages.dev
CNAME   www                     geministorybook.online
```

或者如果使用 Cloudflare 作为 DNS 提供商：

```
类型    名称    值                          代理状态
CNAME   @       YOUR_PROJECT.pages.dev      已代理
CNAME   www     geministorybook.online      已代理
```

## 🚀 自动化部署流程

### 工作流程

1. **代码推送** → GitHub 仓库
2. **GitHub Actions** → 自动触发构建
3. **构建过程**：
   - 安装依赖 (`npm ci`)
   - 测试国际化 (`npm run test:i18n`)
   - 构建项目 (`npm run build`)
   - 验证构建 (`npm run verify`)
4. **自动部署** → Cloudflare Pages
5. **域名访问** → https://geministorybook.online

### 触发条件

- ✅ 推送到 `main` 分支 → 生产环境部署
- ✅ 创建 Pull Request → 预览环境部署
- ✅ 手动触发 → 可在 GitHub Actions 页面手动运行

## 🔧 本地开发工作流

```bash
# 1. 克隆仓库
git clone https://github.com/YOUR_USERNAME/gemini-showcase.git
cd gemini-showcase

# 2. 安装依赖
npm install

# 3. 启动开发服务器
npm run dev

# 4. 本地测试构建
npm run build
npm run verify

# 5. 提交更改
git add .
git commit -m "feat: 添加新功能"
git push origin main
```

## 📊 监控和维护

### 构建状态监控

- **GitHub Actions**: 查看构建日志和状态
- **Cloudflare Pages**: 查看部署历史和性能指标
- **域名访问**: 使用 `npm run test:deployment` 测试

### 常用维护命令

```bash
# 测试国际化配置
npm run test:i18n

# 验证构建输出
npm run verify

# 测试部署后的网站
npm run test:deployment

# 完整部署流程（本地）
npm run deploy:full
```

## 🌐 访问地址

部署完成后，网站将在以下地址可用：

- **生产环境**: https://geministorybook.online
- **中文版**: https://geministorybook.online/
- **英文版**: https://geministorybook.online/en
- **预览环境**: https://COMMIT_HASH.geministorybook.pages.dev

## 🔍 故障排除

### 常见问题

1. **构建失败**
   - 检查 GitHub Actions 日志
   - 确认所有依赖正确安装
   - 验证 Node.js 版本兼容性

2. **部署失败**
   - 检查 Cloudflare API 令牌权限
   - 确认账户 ID 正确
   - 查看 Cloudflare Pages 部署日志

3. **域名访问问题**
   - 检查 DNS 配置
   - 确认 SSL 证书状态
   - 验证 _redirects 文件

4. **语言切换问题**
   - 检查翻译文件完整性
   - 验证路由配置
   - 测试 JavaScript 加载

### 调试工具

```bash
# 本地调试
npm run dev

# 构建调试
npm run build --verbose

# 部署测试
npm run test:deployment

# 国际化测试
npm run test:i18n
```

## 📞 支持

如果遇到问题：

1. 查看 [GitHub Issues](https://github.com/YOUR_USERNAME/gemini-showcase/issues)
2. 检查 [Cloudflare Pages 文档](https://developers.cloudflare.com/pages/)
3. 参考项目的 `DEPLOYMENT.md` 和 `README.md`

## 🎉 完成！

按照以上步骤，你的网站将实现：

- ✅ 自动化 CI/CD 流程
- ✅ 多环境部署（生产/预览）
- ✅ 自定义域名访问
- ✅ 全球 CDN 加速
- ✅ 自动 SSL 证书
- ✅ 双语支持
- ✅ 响应式设计