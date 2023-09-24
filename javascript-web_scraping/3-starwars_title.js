#!/usr/bin/node

const argv = process.argv;
const request = require('request');
const url = 'https://swapi-api.hbtn.io/api/films';
const id = argv[2];

request(url + '/' + id, function (error, response, body) {
  if (error) {
    console.log(error);
  } else {
    const title = JSON.parse(body).title;
    console.log(title);
  }
});
