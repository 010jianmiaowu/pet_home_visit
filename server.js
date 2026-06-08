const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8080;
const HOST = '0.0.0.0';

const server = http.createServer((req, res) => {
  console.log(`[${new Date().toLocaleTimeString()}] Request: ${req.url}`);
  
  let filePath = path.join(__dirname, req.url === '/' ? 'index.html' : req.url);
  
  fs.readFile(filePath, (err, content) => {
    if (err) {
      console.log(`  ❌ 404: ${req.url}`);
      res.writeHead(404);
      res.end('Not Found');
    } else {
      console.log(`  ✅ 200: ${req.url}`);
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(content);
    }
  });
});

server.listen(PORT, HOST, () => {
  console.log('\n========================================');
  console.log('🚀 服务器已启动成功！');
  console.log('========================================');
  console.log(`📱 在浏览器中打开: http://localhost:${PORT}`);
  console.log('========================================\n');
});