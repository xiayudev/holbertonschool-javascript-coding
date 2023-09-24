#!/usr/bin/node

const argv = process.argv;
const request = require('request');
const fs = require('fs');
const url = argv[2];
const filename = argv[3];

request(url, function (error, response, body) {
  if (error) {
    console.error(error);
  } else {
    fs.writeFile(filename, body, function (error) {
      if (error) {
        console.error(error);
      }
    });
  }
});
