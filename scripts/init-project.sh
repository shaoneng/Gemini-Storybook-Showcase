#!/bin/bash

# 项目初始化脚本
set -e

echo "🚀 初始化 Gemini Storybook Showcase 项目..."

# 检查 Node.js 版本
NODE_VERSION=$(node --version)
echo "📦 Node.js 版本: $NODE_VERSION"

if [[ ! "$NODE_VERSION" =~ ^v1[8-9]\. ]] && [[ ! "$NODE_VERSION" =~ ^v2[0-9]\. ]]; then
    echo "❌ 需要 Node.js 18+ 版本"
    exit 1
fi

# 安装依赖
echo "📦 安装依赖..."
npm install

# 创建环境变量文件
if [ ! -f ".env.local" ]; then
    echo "📝 创建环境变量文件..."
    cp .env.example .env.local
    echo "请编辑 .env.local 文件并填入实际配置"
fi

# 测试构建
echo "🔨 测试构建..."
npm run build

# 验证构建结果
echo "✅ 验证构建结果..."
npm run verify

# 测试国际化
echo "🌐 测试国际化配置..."
npm run test:i18n

echo ""
echo "🎉 项目初始化完成！"
echo ""
echo "📋 下一步："
echo "1. 编辑 .env.local 文件"
echo "2. 运行 npm run dev 启动开发服务器"
echo "3. 访问 http://localhost:3000 查看网站"
echo "4. 按照 GITHUB_CLOUDFLARE_SETUP.md 设置部署"
echo ""