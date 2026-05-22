const http = require('http');
const fs = require('fs');

console.log('Starting server...');

const server = http.createServer((req, res) => {
    console.log('Got request:', req.url);
    
    if (req.url === '/' || req.url === '/index.html') {
        fs.readFile('/workspace/index.html', 'utf8', (err, data) => {
            if (err) {
                console.error('Error reading file:', err);
                res.writeHead(500, {'Content-Type': 'text/plain'});
                res.end('Error loading file');
            } else {
                console.log('Serving index.html');
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                res.end(data);
            }
        });
    } else {
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.end('Not Found');
    }
});

server.listen(9000, '0.0.0.0', () => {
    console.log('Server running at http://localhost:9000/');
    console.log('Ready to serve index.html');
});
