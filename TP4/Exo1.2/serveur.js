'use strict';
const http = require('node:http');

const hostname = '127.0.0.1';
const port = 8080;

const server = http.createServer(callback);

const fs = require('fs');

let content = fs.readFileSync('index.html', 'utf8');

function callback(request, response) {
  // Default to code 405 and Content-Type 'text/plain'
  let code = 405;
  let type = 'text/html; charset=utf-8';

  if (request.method == "GET") {
    code = 200;
  }

  content = content.replace("%path%", request.url.split('?')[0]);
  content = content.replace("%args%", request.url.split('?')[1]);

  response.writeHead(
    code,
    {
      'Content-Length': Buffer.byteLength(content),
      'Content-Type': type,
    }
  )
  response.write(content);
  response.end();
}

server.listen(port, hostname);
