// /pages/api/stories.js
import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  const filePath = path.join(process.cwd(), 'data', 'stories.json');  // 确保路径正确
  try {
    const jsonData = fs.readFileSync(filePath, 'utf-8');  // 读取 stories.json 文件
    const stories = JSON.parse(jsonData);  // 解析为 JSON 数据
    res.status(200).json(stories);  // 返回 JSON 数据
  } catch (error) {
    console.error('Error reading stories.json:', error);
    res.status(500).json({ error: 'Unable to load stories' });  // 错误时返回 500
  }
}
