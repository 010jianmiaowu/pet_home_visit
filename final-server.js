const http = require('http');
const fs = require('fs');
const path = require('path');

console.log('Starting final server...');

const server = http.createServer((req, res) => {
    console.log('Request:', req.url);
    
    let filePath = '/workspace';
    
    if (req.url === '/') {
        filePath += '/test.html';
    } else if (req.url === '/index.html') {
        filePath += '/index.html';
    } else if (req.url === '/test.html') {
        filePath += '/test.html';
    } else {
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.end('Not Found');
        return;
    }
    
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error:', err);
            res.writeHead(500, {'Content-Type': 'text/plain'});
            res.end('Error: ' + err.message);
        } else {
            console.log('Serving:', filePath);
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
            res.end(data);
        }
    });
});

server.listen(9090, '0.0.0.0', () => {
    console.log('=== Server Running ===');
    console.log('Test page: http://localhost:9090/');
    console.log('Main app: http://localhost:9090/index.html');
    console.log('======================');
});
