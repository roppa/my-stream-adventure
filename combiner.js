'use strict';

const combine = require('stream-combiner');
const through = require('through2');
const split = require('split');
const zlib = require('zlib');

module.exports = function () {

  let current;
  let grouper = through(write, end);

  function write(buffer, charset, next) {

    if (buffer.length === 0) {
      return next();
    }

    let row = JSON.parse(buffer);

    if (row.type === 'genre') {

      if (current) {
        this.push(JSON.stringify(current) + '\n');
      }

      current = { name: row.name, books: [] };

    } else if (row.type === 'book') {
      current.books.push(row.name);
    }

    next();
  }

  function end(next) {
    if (current) {
      this.push(JSON.stringify(current) + '\n');
    }

    next();
  }

  return combine(
    split(),
    grouper,
    zlib.createGzip()
  );

};
