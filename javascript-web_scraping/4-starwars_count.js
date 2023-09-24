#!/usr/bin/node

const argv = process.argv;
const request = require('request');
const url = argv[2];

request(url, function (error, response, body) {
  if (error) {
    console.log(error);
  } else {
    const results = JSON.parse(body).results;
    let counter = 0;
    for (const result of results) {
      const characters = result.characters;
      for (const character of characters) {
        const id = character.indexOf('18');
        if (id !== -1) {
          counter++;
        }
      }
    }
    console.log(counter);
  }
});
