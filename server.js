const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  const filePath = path.join(__dirname, req.url);
  const fileStream = fs.createReadStream(filePath);

  fileStream.on('error', (err) => {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('File not found');
  });

  res.writeHead(200, { 'Content-Type': 'text/html' });
  fileStream.pipe(res);
});

const port = 3000;
server.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});