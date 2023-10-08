const http = require('http');
const fs = require('fs');
const countStudents = require('./3-read_file_async');

const hostname = '127.0.0.1';
const port = 1245;

const app = http.createServer((req, res) => {
  if (req.url === '/') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello Holberton School!');
  } else if (req.url === '/students') {
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
          res.end(`${out.join('\n')}`);
        }).catch((error) => {
          res.statusCode = 500;
          res.setHeader('Content-Type', 'text/plain');
          res.end(`Internal Server Error: ${error.message}`);
        });
    } else {
      res.end('This is the list of our students Cannot load the database');
    }
  } else {
    res.statusCode = 500;
    res.setHeader('Content-Type', 'text/plain');
    res.end('This endpoint does not exists');
  }
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

module.exports = app;
