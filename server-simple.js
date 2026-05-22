const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    console.log(`Request for: ${req.url}`);
    
    let filePath = './index.html';
    
    fs.readFile(filePath, (error, content) => {
        if (error) {
            console.error('Error:', error);
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Server Error: ' + error.code);
        } else {
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end(content, 'utf-8');
        }
    });
});

const PORT = 8080;
server.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});
