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
    for (const key in todosDone) {
      if (!todosDone[key]) {
        delete todosDone[key];
      }
    }
    console.log(todosDone);
  }
});
