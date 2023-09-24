#!/usr/bin/node

const fs = require('fs');
const argv = process.argv;

fs.readFile(argv[2], function (error, data) {
  if (error) {
    console.log(error);
  } else {
    console.log(data.toString());
  }
});
