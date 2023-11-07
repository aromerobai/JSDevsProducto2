const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  const url = req.url === '/' ? '/index.html' : req.url; // Redirige la URL raíz a index.html

  let filePath;
  let contentType;

  if (url.endsWith('.html')) {
    contentType = 'text/html';
    filePath = path.join(__dirname, 'html', url);
  } else if (url.endsWith('.js')) {
    contentType = 'text/javascript';
    filePath = path.join(__dirname, 'js', url);
  } else if (url.endsWith('.css')) {
    contentType = 'text/css';
    filePath = path.join(__dirname, 'css', url);
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('File not found');
    return;
  }

  fs.readFile(filePath, (error, content) => {
    if (error) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('File not found');
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    }
  });
});

const port = 3000;
server.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
