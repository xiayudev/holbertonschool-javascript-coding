const express = require('express');
const fs = require('fs');
const countStudents = require('./3-read_file_async');

const app = express();
const port = 1245;

app.get('/', (req, res) => {
  res.send('Hello Holberton School!');
});

app.get('/students', (req, res) => {
  if (process.argv.length > 2 && fs.existsSync(process.argv[2])) {
    countStudents(process.argv[2])
      .then((data) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        const students = data;
        const out = [];
        const fields = {}; // All fields availables
        students.forEach((student) => {
          fields[student[student.length - 1]] = (fields[student[student.length - 1]] || 0) + 1;
        });
        // out.push('This is the list of our students');
        out.push('This is the list of our students');
        out.push(`Number of students: ${students.length}`);
        for (const field in fields) {
          if (field) {
            // Filter just the firts names of the students
            const result = students
              .filter((std) => std[std.length - 1] === field)
              .map((el) => el[0]);
            out.push(`Number of students in ${field}: ${result.length}. List: ${result.join(', ')}`);
          }
        }
        res.send(`${out.join('\n')}`);
      }).catch((error) => {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'text/plain');
        res.send(`Internal Server Error: ${error.message}`);
      });
  } else {
    res.send('This is the list of our students\nCannot load the database');
  }
});

app.listen(port, () => {
  console.log(`My app is listening on port ${port}`);
});

module.exports = app;
