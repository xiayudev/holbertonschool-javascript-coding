import readDatabase from '../utils';

const fs = require('fs');

const database = process.argv[2];
class StudentsController {
  static getAllStudents(request, response) {
    if (fs.existsSync(database)) {
      readDatabase(database).then((data) => {
        const out = [];

        out.push('This is the list of our students');
        for (const field in data) {
          if (field) {
            out.push(`Number of students in ${field}: ${data[field].length}. List: ${data[field].join(', ')}`);
          }
        }
        response.setHeader('Content-Type', 'text/plain');
        response.status(200).send(`${out.join('\n')}`);
      }).catch((error) => {
        response.setHeader('Content-Type', 'text/plain');
        response.status(500).send(error.message);
      });
    } else {
      response.setHeader('Content-Type', 'text/plain');
      response.status(500).send('Cannot load the database');
    }
  }

  static getAllStudentsByMajor(request, response) {
    const majors = ['CS', 'SWE'];
    if (majors.includes(request.params.major)) {
      if (fs.existsSync(database)) {
        readDatabase(database).then((data) => {
          const show = data[request.params.major].join(', ');
          response.setHeader('Content-Type', 'text/plain');
          response.status(200).send(`List: ${show}`);
        }).catch((error) => {
          response.setHeader('Content-Type', 'text/plain');
          response.status(500).send(error.message);
        });
      } else {
        response.setHeader('Content-Type', 'text/plain');
        response.status(500).send('Cannot load the database');
      }
    } else {
      response.statusCode = 500;
      response.setHeader('Content-Type', 'text/plain');
      response.send('Major parameter must be CS or SWE');
    }
  }
}

module.exports = StudentsController;
