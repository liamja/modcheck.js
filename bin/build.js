#!/usr/bin/env node

let fs = require('fs')
  , through = require('through2')
  , byline = require('byline');

let input = byline(fs.createReadStream(__dirname+'/../assets/valacdos.txt', {encoding: 'utf8'}))
  , output = fs.createWriteStream(__dirname+'/../build/valacdos.json', {encoding: 'utf8'});

let table = [];

input
  .pipe(through.obj(function (chunk, enc, callback) {
    let fields = chunk.split(/\s+/);

    let row = {
      'sortCodeRange': {
        'start': fields[0],
        'end': fields[1]
      },
      'algorithm': fields[2],
      'weight': {
        'u': parseInt(fields[3]),
        'v': parseInt(fields[4]),
        'w': parseInt(fields[5]),
        'x': parseInt(fields[6]),
        'y': parseInt(fields[7]),
        'z': parseInt(fields[8]),
        'a': parseInt(fields[9]),
        'b': parseInt(fields[10]),
        'c': parseInt(fields[11]),
        'd': parseInt(fields[12]),
        'e': parseInt(fields[13]),
        'f': parseInt(fields[14]),
        'g': parseInt(fields[15]),
        'h': parseInt(fields[16]),
      },
      'exception': fields[17] ? parseInt(fields[17]) : null,
    };

    callback(null, row);
  }))
  .on('data', function (row) {
    table.push(row)
  })
  .on('end', function () {
    output.write(JSON.stringify({table}, null, '  '));
  });
