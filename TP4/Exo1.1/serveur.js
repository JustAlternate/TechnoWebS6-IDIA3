'use strict';

const http = require('node:http');

const hostname = '127.0.0.1';
const port = 8080;

const server = http.createServer(callback);

function callback(request, response){
  response.writeHead(
    200,
    {
      'Content-Type': 'text/plain',
    }
  )
  response.write("Bonjour tout le monde !");
  response.end();
}

server.listen(port, hostname);
