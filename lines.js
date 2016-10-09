'use strict';

const split = require('split');
const through = require('through2');
let tr = through(write);
let toggle = true;

process.stdin
  .pipe(split())
  .pipe(tr)
  .pipe(process.stdout);

function write(buffer, encoding, next) {
  this.push((toggle = !toggle) ?
    buffer.toString().toUpperCase() + '\n' :
    buffer.toString().toLowerCase() + '\n');
  next();
}
