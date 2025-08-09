# Google服务集成设置

## 已集成的Google服务

### 1. Google Analytics (GA4)
- **跟踪ID**: `G-49WRVFC2QQ`
- **用途**: 网站访问统计和用户行为分析
- **实现位置**: `pages/_app.js`

### 2. Google AdSense
- **发布商ID**: `ca-pub-9886602787991072`
- **用途**: 网站广告展示和收益
- **实现位置**: `pages/_app.js`

## 技术实现

### 文件修改
1. **`pages/_app.js`**: 添加了Google Analytics和AdSense脚本
2. **`pages/_document.js`**: 设置了基础HTML结构和元数据

### 代码结构
```javascript
// Google Analytics初始化
useEffect(() => {
  if (typeof window !== 'undefined') {
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      window.dataLayer.push(arguments);
    }
    gtag('js', new Date());
    gtag('config', 'G-49WRVFC2QQ');
    window.gtag = gtag;
  }
}, []);

// 脚本加载
<Script
  src="https://www.googletagmanager.com/gtag/js?id=G-49WRVFC2QQ"
  strategy="afterInteractive"
/>

<Script
  src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9886602787991072"
  strategy="afterInteractive"
  crossOrigin="anonymous"
/>
```

## 优化特性

### 性能优化
- 使用Next.js的`Script`组件进行优化加载
- 设置`strategy="afterInteractive"`确保不阻塞页面渲染
- 脚本在页面交互后异步加载

### 兼容性
- 支持静态导出模式
- 兼容服务端渲染(SSR)和静态生成(SSG)
- 移动端和桌面端完全兼容

## 验证方法

### Google Analytics验证
1. 部署网站后访问页面
2. 在浏览器开发者工具中检查Network标签
3. 确认`gtag/js`请求成功
4. 在Google Analytics控制台查看实时数据

### Google AdSense验证
1. 确认`adsbygoogle.js`脚本加载成功
2. 检查浏览器控制台无错误信息
3. 在AdSense控制台查看广告状态

## 部署说明

### 自动部署
- 代码已集成到项目中
- 推送到GitHub会自动触发Cloudflare Pages部署
- 无需额外配置

### 手动验证
```bash
# 构建项目
npm run build

# 检查构建输出
# 确认脚本正确包含在HTML中
```

## 注意事项

1. **隐私政策**: 使用Google Analytics和AdSense需要在网站添加隐私政策
2. **GDPR合规**: 如有欧洲用户，需要添加Cookie同意横幅
3. **广告政策**: 确保网站内容符合Google AdSense政策
4. **性能监控**: 定期检查脚本加载对页面性能的影响

## 后续优化建议

1. **添加事件跟踪**: 为特定用户行为添加自定义事件
2. **A/B测试**: 使用Google Optimize进行页面优化测试
3. **广告位优化**: 根据用户行为优化广告位置
4. **隐私合规**: 添加Cookie同意管理器

现在Google Analytics和AdSense都已正确集成到网站中！