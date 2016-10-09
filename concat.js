'use strict';

const concat = require('concat-stream');

process
  .stdin
  .pipe(concat(function concatStream(body) {
    process.stdout.write(body.toString().split('').reverse().join('') + '\n');
  }));
