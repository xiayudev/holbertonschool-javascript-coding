#!/usr/bin/node

const argv = process.argv;
const request = require('request');
const url = argv[2];

request(url, function (error, response, body) {
  if (error) {
    console.error(error);
  } else {
    const results = JSON.parse(body);
    const todosDone = {};
    for (const result of results) {
      const id = result.userId.toString();
      if (!todosDone[id]) {
        todosDone[id] = 0;
      }
      if (result.completed) {
        todosDone[id]++;
      }
    }
    console.log(todosDone);
  }
});
