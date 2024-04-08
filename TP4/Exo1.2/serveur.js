'use strict';
const http = require('node:http');

const hostname = '127.0.0.1';
const port = 8080;

const server = http.createServer(callback);

const fs = require('fs');

fs.readFile('index.html', 'utf8', (err, data) => {
  const content = data;
  process(content);
});

function callback(request, response) {
  // Default to code 405 and Content-Type 'text/plain'
  let code = 405;
  let type = 'text/html; charset=utf-8';

  if (request.method == "GET") {
    code = 200;
  }

  content.replace("%path%", request.url.split('?')[0]);
  content.replace("%args%", request.url.split('?')[1]);

  response.writeHead(
    code,
    {
      'Content-Length': Buffer.byteLength(htmlContent),
      'Content-Type': type,
    }
  )
  response.write(htmlContent);
  response.end();
}

server.listen(port, hostname);
