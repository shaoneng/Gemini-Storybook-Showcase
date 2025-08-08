#!/bin/bash

# Cloudflare Pages 部署脚本
set -e

echo "🚀 开始部署到 Cloudflare Pages..."

# 1. 清理旧的构建文件
echo "🧹 清理旧的构建文件..."
rm -rf .next out

# 2. 安装依赖
echo "📦 安装依赖..."
npm ci

# 3. 构建项目
echo "🔨 构建项目..."
npm run build

# 4. 验证构建结果
echo "✅ 验证构建结果..."
npm run verify

# 5. 检查关键文件
echo "🔍 检查关键文件..."
if [ ! -f "out/_redirects" ]; then
    echo "❌ _redirects 文件缺失！"
    exit 1
fi

if [ ! -f "out/index.html" ]; then
    echo "❌ 首页文件缺失！"
    exit 1
fi

if [ ! -f "out/en/index.html" ]; then
    echo "❌ 英文首页文件缺失！"
    exit 1
fi

# 6. 显示部署信息
echo "📋 部署信息："
echo "  - 构建目录: out/"
echo "  - 文件总数: $(find out -type f | wc -l)"
echo "  - 总大小: $(du -sh out | cut -f1)"

echo ""
echo "🎉 构建完成！请将 out/ 目录的内容上传到 Cloudflare Pages"
echo ""
echo "📝 测试 URL："
echo "  - https://geministorybook.online/ (中文首页)"
echo "  - https://geministorybook.online/en (英文首页)"
echo "  - https://geministorybook.online/en/about (英文关于页面)"
echo ""