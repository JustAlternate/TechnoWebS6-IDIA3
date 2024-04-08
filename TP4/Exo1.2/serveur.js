'use strict';

const http = require('node:http');

const hostname = '127.0.0.1';
const port = 8080;

const server = http.createServer(callback);

function callback(request, response) {
  // Default to code 405 and Content-Type 'text/plain'
  let code = 405;
  let type = 'text/plain';
  let message = "Bonjour tout le monde";

  if (request.method == "GET") {
    code = 200;
  }

  console.log(request.url.split('/'));
  if (JSON.stringify(request.url.split('/')) === JSON.stringify(['', 'un', 'repertoire', 'index.html?arg1=12&arg2=23'])) {
    type = 'text/html; charset=utf-8';
  }

  response.writeHead(
    code,
    {
      'Content-Length': Buffer.byteLength(message),
      'Content-Type': type,
    }
  )
  response.write(message);
  response.end();
}

server.listen(port, hostname);
