'use strict';

const http = require('http');
const through = require('through2');
const PORT = process.argv[2] || 3000;

let server = http.createServer((req, res) => {
  if (req.method === 'POST') {
    return req.pipe(through(function write(buffer, encoding, next) {
      this.push(buffer.toString().toUpperCase());
      next();
    })).pipe(res);
  }

  res.end();
});

server.listen(PORT);
