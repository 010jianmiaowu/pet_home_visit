const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  console.log(`Request: ${req.url}`);
  
  let filePath = path.join(__dirname, req.url === '/' ? 'index.html' : req.url);
  
  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(404);
      res.end('Not Found');
    } else {
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(content);
    }
  });
});

server.listen(0, '0.0.0.0', () => {
  const port = server.address().port;
  console.log(`✅ Server is running!`);
  console.log(`📱 You can access on your phone at:`);
  console.log(`   http://localhost:${port}`);
  console.log(`\n💡 Tip: Find your computer's local IP address and replace 'localhost' with it to access from your phone!`);
});