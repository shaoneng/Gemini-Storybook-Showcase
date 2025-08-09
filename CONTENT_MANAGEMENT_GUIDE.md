# 📝 内容管理指南：如何添加新故事

## 🎯 概述

这个指南将详细说明如何向 Gemini Storybook Showcase 网站添加新的故事内容。

## 📋 添加新故事的完整流程

### 第一步：准备故事信息

在添加之前，确保你有以下信息：

1. **故事 ID**：唯一标识符（使用 kebab-case 格式）
2. **中英文标题**
3. **中英文作者名**
4. **封面图片**
5. **Gemini 分享链接**
6. **中英文提示词**
7. **提交日期**

### 第二步：添加封面图片

1. **准备图片文件**：
   - 格式：PNG 或 JPG
   - 建议尺寸：800x600 像素或更高
   - 文件名：使用故事 ID，如 `my-new-story.png`

2. **上传图片**：
   ```bash
   # 将图片文件放入 public/covers/ 目录
   cp your-image.png geministroybook/gemini-showcase/public/covers/my-new-story.png
   ```

### 第三步：编辑故事数据文件

打开 `data/stories.json` 文件，在数组中添加新的故事对象：

```json
{
  "id": "my-new-story",
  "title": {
    "en": "My Amazing New Story",
    "zh": "我的精彩新故事"
  },
  "author": {
    "en": "Creative Writer",
    "zh": "创意作家"
  },
  "coverImageUrl": "/covers/my-new-story.png",
  "shareUrl": "https://g.co/gemini/share/your-share-id",
  "prompt": {
    "en": "Your English prompt here...",
    "zh": "你的中文提示词在这里..."
  },
  "submissionDate": "2025-08-08T12:00:00Z"
}
```

### 第四步：更新重定向规则

如果你的故事 ID 不在现有的重定向规则中，需要更新 `public/_redirects` 文件：

```bash
# 在 _redirects 文件中添加新的重定向规则
/en/story/my-new-story /en/story/my-new-story.html 200
/zh/story/my-new-story /story/my-new-story 302
/story/my-new-story /story/my-new-story.html 200
```

### 第五步：构建和部署

1. **构建项目**：
   ```bash
   cd geministroybook/gemini-showcase
   npm run build
   ```

2. **验证构建**：
   ```bash
   npm run verify
   ```

3. **部署到 Cloudflare Pages**：
   - 将 `out/` 文件夹的内容上传到 Cloudflare Pages

## 📝 详细的数据字段说明

### 必填字段

| 字段 | 类型 | 说明 | 示例 |
|------|------|------|------|
| `id` | string | 唯一标识符，使用 kebab-case | `"magical-forest-adventure"` |
| `title.en` | string | 英文标题 | `"The Magical Forest Adventure"` |
| `title.zh` | string | 中文标题 | `"神奇森林大冒险"` |
| `author.en` | string | 英文作者名 | `"Fantasy Writer"` |
| `author.zh` | string | 中文作者名 | `"奇幻作家"` |
| `coverImageUrl` | string | 封面图片路径 | `"/covers/magical-forest.png"` |
| `shareUrl` | string | Gemini 分享链接 | `"https://g.co/gemini/share/abc123"` |
| `prompt.en` | string | 英文提示词 | `"Create a story about..."` |
| `prompt.zh` | string | 中文提示词 | `"创作一个关于...的故事"` |
| `submissionDate` | string | ISO 8601 格式的日期 | `"2025-08-08T12:00:00Z"` |

### 字段规则

1. **ID 规则**：
   - 只能包含小写字母、数字和连字符
   - 不能以连字符开头或结尾
   - 必须是唯一的

2. **图片规则**：
   - 路径必须以 `/covers/` 开头
   - 文件必须存在于 `public/covers/` 目录中

3. **日期格式**：
   - 使用 ISO 8601 格式：`YYYY-MM-DDTHH:mm:ssZ`
   - 时区使用 UTC (Z)

## 🛠️ 实际操作示例

假设你要添加一个名为 "The Space Explorer" 的新故事：

### 1. 准备数据
```json
{
  "id": "the-space-explorer",
  "title": {
    "en": "The Space Explorer",
    "zh": "太空探险家"
  },
  "author": {
    "en": "Sci-Fi Enthusiast",
    "zh": "科幻爱好者"
  },
  "coverImageUrl": "/covers/space-explorer.png",
  "shareUrl": "https://g.co/gemini/share/xyz789",
  "prompt": {
    "en": "Create an exciting space adventure story for children about a young astronaut who discovers a friendly alien civilization on a distant planet.",
    "zh": "为孩子们创作一个激动人心的太空冒险故事，讲述一位年轻宇航员在遥远星球上发现友好外星文明的经历。"
  },
  "submissionDate": "2025-08-08T14:30:00Z"
}
```

### 2. 添加到 stories.json
```bash
# 编辑 data/stories.json 文件
# 在数组的开头添加新故事（最新的故事会显示在前面）
```

### 3. 上传封面图片
```bash
# 将图片文件复制到正确位置
cp space-explorer.png public/covers/space-explorer.png
```

### 4. 更新重定向规则
在 `public/_redirects` 文件中添加：
```
/en/story/the-space-explorer /en/story/the-space-explorer.html 200
```

### 5. 构建和测试
```bash
npm run build
npm run verify
```

## 🔍 验证清单

添加新故事后，请检查：

- [ ] 故事 ID 是唯一的
- [ ] 封面图片文件存在且路径正确
- [ ] 中英文内容都已填写
- [ ] JSON 格式正确（没有语法错误）
- [ ] 构建成功
- [ ] 验证脚本通过
- [ ] 在本地可以访问新故事页面

## 🚨 常见错误和解决方案

### 1. JSON 语法错误
**错误**：构建失败，提示 JSON 解析错误
**解决**：检查 JSON 格式，确保所有括号、引号、逗号都正确

### 2. 图片不显示
**错误**：故事页面显示但图片不加载
**解决**：检查图片文件是否存在于 `public/covers/` 目录中

### 3. 重复的故事 ID
**错误**：页面显示错误的故事内容
**解决**：确保每个故事的 ID 都是唯一的

### 4. 日期格式错误
**错误**：故事排序不正确
**解决**：使用正确的 ISO 8601 日期格式

## 📊 批量添加故事

如果需要添加多个故事，可以：

1. **准备所有数据**：创建一个包含所有新故事的 JSON 数组
2. **批量上传图片**：将所有封面图片放入 `public/covers/` 目录
3. **一次性更新**：将所有新故事添加到 `stories.json` 文件中
4. **更新重定向规则**：为所有新故事添加重定向规则
5. **构建和部署**：一次性构建和部署所有更改

## 🎉 完成

按照这个指南，你就可以成功地向网站添加新的故事内容了！记住每次添加内容后都要重新构建和部署网站。