#!/usr/bin/env node

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3001;

const server = http.createServer((req, res) => {
  console.log(`请求: ${req.method} ${req.url}`);
  
  let filePath = path.join(__dirname, '../out', req.url === '/' ? 'index.html' : req.url);
  
  // 处理静态文件
  if (req.url.startsWith('/covers/')) {
    filePath = path.join(__dirname, '../public', req.url);
  }
  
  // 检查文件是否存在
  if (!fs.existsSync(filePath)) {
    console.log(`文件不存在: ${filePath}`);
    res.writeHead(404);
    res.end('Not Found');
    return;
  }
  
  // 设置正确的Content-Type
  const ext = path.extname(filePath);
  let contentType = 'text/html';
  
  switch (ext) {
    case '.js':
      contentType = 'application/javascript';
      break;
    case '.css':
      contentType = 'text/css';
      break;
    case '.png':
      contentType = 'image/png';
      break;
    case '.jpg':
    case '.jpeg':
      contentType = 'image/jpeg';
      break;
  }
  
  res.writeHead(200, { 'Content-Type': contentType });
  fs.createReadStream(filePath).pipe(res);
});

server.listen(PORT, () => {
  console.log(`🚀 本地服务器启动: http://localhost:${PORT}`);
  console.log(`📁 静态文件目录: ${path.join(__dirname, '../out')}`);
  console.log(`🖼️  图片目录: ${path.join(__dirname, '../public/covers')}`);
});

// 检查图片文件
const coversDir = path.join(__dirname, '../public/covers');
console.log('\n📸 检查图片文件:');
fs.readdirSync(coversDir).forEach(file => {
  const filePath = path.join(coversDir, file);
  const stats = fs.statSync(filePath);
  console.log(`  ✅ ${file} (${(stats.size / 1024).toFixed(2)} KB)`);
});