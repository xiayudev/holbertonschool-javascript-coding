const http = require('http');
const fs = require('fs');

const hostname = '127.0.0.1';
const port = 1245;

const app = http.createServer((req, res) => {
  if (req.url === '/') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello Holberton School!');
  } else if (req.url === '/students') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    let students = [];
    const out = [];
    fs.readFile(process.argv.length === 2 ? 'database.csv' : process.argv[2], (error, data) => {
      if (error) {
        console.log(error);
      } else {
        students = data.toString().split('\n').map((elem) => elem.split(','));
        students = students.slice(1, students.length - 1); // Array of array of students
        const fields = {}; // All fields availables
        students.forEach((student) => {
          fields[student[student.length - 1]] = (fields[student[student.length - 1]] || 0) + 1;
        });
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
      }
      res.write(`${out.join('\n')}`);
      res.end();
    });
  } else {
    res.end('Invalid Request!');
  }
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

module.exports = app;
