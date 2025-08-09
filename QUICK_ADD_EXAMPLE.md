# 🚀 快速添加新故事示例

## 方法一：使用自动化脚本（推荐）

### 1. 运行添加脚本
```bash
cd geministroybook/gemini-showcase
npm run add-story
```

### 2. 按提示输入信息
```
🎨 Gemini Storybook - 添加新故事工具

故事 ID (使用 kebab-case，如 my-new-story): the-magical-unicorn
英文标题: The Magical Unicorn
中文标题: 神奇的独角兽
英文作者名: Fantasy Creator
中文作者名: 奇幻创作者
封面图片文件名 (如 my-story.png): magical-unicorn.png
Gemini 分享链接: https://g.co/gemini/share/abc123
英文提示词: Create a heartwarming story about a magical unicorn who helps children overcome their fears.
中文提示词: 创作一个温暖人心的故事，讲述一只神奇独角兽帮助孩子们克服恐惧的经历。
```

### 3. 上传封面图片
```bash
# 将你的图片文件复制到 covers 目录
cp your-unicorn-image.png public/covers/magical-unicorn.png
```

### 4. 构建和部署
```bash
npm run build
npm run verify
# 然后将 out/ 文件夹内容上传到 Cloudflare Pages
```

## 方法二：手动添加

### 1. 编辑 data/stories.json
在数组开头添加新故事：

```json
[
  {
    "id": "the-magical-unicorn",
    "title": {
      "en": "The Magical Unicorn",
      "zh": "神奇的独角兽"
    },
    "author": {
      "en": "Fantasy Creator",
      "zh": "奇幻创作者"
    },
    "coverImageUrl": "/covers/magical-unicorn.png",
    "shareUrl": "https://g.co/gemini/share/abc123",
    "prompt": {
      "en": "Create a heartwarming story about a magical unicorn who helps children overcome their fears.",
      "zh": "创作一个温暖人心的故事，讲述一只神奇独角兽帮助孩子们克服恐惧的经历。"
    },
    "submissionDate": "2025-08-08T16:00:00Z"
  },
  // ... 其他现有故事
]
```

### 2. 更新 public/_redirects
在英文路由部分添加：
```
/en/story/the-magical-unicorn /en/story/the-magical-unicorn.html 200
```

### 3. 添加封面图片
```bash
cp magical-unicorn.png public/covers/magical-unicorn.png
```

### 4. 构建和部署
```bash
npm run build
npm run verify
```

## 📝 字段说明速查

| 字段 | 格式 | 示例 |
|------|------|------|
| `id` | kebab-case | `the-magical-unicorn` |
| `title.en/zh` | 字符串 | `"The Magical Unicorn"` |
| `author.en/zh` | 字符串 | `"Fantasy Creator"` |
| `coverImageUrl` | 路径 | `"/covers/magical-unicorn.png"` |
| `shareUrl` | URL | `"https://g.co/gemini/share/abc123"` |
| `prompt.en/zh` | 长文本 | `"Create a story about..."` |
| `submissionDate` | ISO 8601 | `"2025-08-08T16:00:00Z"` |

## ✅ 验证清单

添加新故事后检查：

- [ ] 故事 ID 唯一且使用 kebab-case 格式
- [ ] 封面图片文件存在于 `public/covers/` 目录
- [ ] 中英文标题和作者都已填写
- [ ] Gemini 分享链接有效
- [ ] 中英文提示词都已填写
- [ ] JSON 格式正确（无语法错误）
- [ ] 重定向规则已更新
- [ ] 构建成功 (`npm run build`)
- [ ] 验证通过 (`npm run verify`)

## 🌐 访问新故事

添加成功后，新故事将在以下 URL 可用：
- 中文版：`https://geministorybook.online/story/the-magical-unicorn`
- 英文版：`https://geministorybook.online/en/story/the-magical-unicorn`

## 🔧 故障排除

### 常见问题：

1. **JSON 语法错误**
   - 检查所有括号、引号、逗号是否正确
   - 使用 JSON 验证工具检查格式

2. **图片不显示**
   - 确认图片文件在 `public/covers/` 目录中
   - 检查文件名是否与 `coverImageUrl` 中的名称一致

3. **构建失败**
   - 检查故事 ID 是否唯一
   - 确认所有必填字段都已填写

4. **页面 404**
   - 检查重定向规则是否正确添加
   - 确认构建后重新部署了网站

使用自动化脚本可以避免大部分手动错误，推荐使用 `npm run add-story` 命令！