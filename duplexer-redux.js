'use strict';

const duplexer = require('duplexer2');
const through = require('through2').obj;

module.exports = counter => {

  let countryLookup = {};
  let input = through(write, end);

  return duplexer({ objectMode: true }, input, counter);

  function write(row, charset, next) {
    countryLookup[row.country] = ++countryLookup[row.country] || 1;
    next();
  }

  function end(done) {
    counter.setCounts(countryLookup);
    done();
  }

};
