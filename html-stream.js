'use strict';

/**
 * Trumpet is a stream, the .loud selector is piped through the handler
 * and then piped back into trumpet, which pipes to stdout
 */

const trumpet = require('trumpet');
const through = require('through2');

let tr = trumpet();
let loud = tr.select('.loud').createStream();

loud.pipe(through((buffer, charset, next) => {
  this.push(buffer.toString().toUpperCase());
  next();
})).pipe(loud);

process.stdin
  .pipe(tr)
  .pipe(process.stdout);
