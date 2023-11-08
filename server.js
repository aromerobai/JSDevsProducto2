const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true); // El segundo argumento "true" analiza los parámetros de la URL como objetos

  if (parsedUrl.pathname === '/' || parsedUrl.pathname === '/index.html') {
    // Redirige la URL raíz a index.html
    const filePath = path.join(__dirname, 'html', 'index.html');
    const contentType = 'text/html';

    fs.readFile(filePath, (error, content) => {
      if (error) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('File not found');
      } else {
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(content);
      }
    });
  } else if (parsedUrl.pathname === '/detalle.html' && parsedUrl.query.index === '0') {
    // Maneja la ruta /detalle.html?index=0
    const filePath = path.join(__dirname, 'html', 'detalle.html');
    const contentType = 'text/html';

    fs.readFile(filePath, (error, content) => {
      if (error) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('File not found');
      } else {
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(content);
      }
    });
  } else if (parsedUrl.pathname.endsWith('.html')) {
    // Maneja rutas que terminan en .html
    const filePath = path.join(__dirname, 'html', parsedUrl.pathname);
    const contentType = 'text/html';

    fs.readFile(filePath, (error, content) => {
      if (error) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('File not found');
      } else {
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(content);
      }
    });
  } else if (parsedUrl.pathname.endsWith('.js')) {
    // Maneja archivos JavaScript
    const filePath = path.join(__dirname, 'js', parsedUrl.pathname);
    const contentType = 'text/javascript';

    fs.readFile(filePath, (error, content) => {
      if (error) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('File not found');
      } else {
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(content);
      }
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('File type not found');
  }
});

server.listen(3000, () => {
  console.log('Server is running on port 3000');
});