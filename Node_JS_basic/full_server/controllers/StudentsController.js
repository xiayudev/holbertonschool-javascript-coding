import readDatabase from "../utils";
import * as fs from 'fs';

const database = process.argv[2];
export class StudentsController {
  static getAllStudents(request, response) {
    if (fs.existsSync(database)) {
      readDatabase(database).then((data) => {
        response.statusCode = 200;
        response.setHeader('Content-Type', 'text/plain');
        let totalStudents = 0;
        const out = [];

        for (const field in data) {
          if (field) {
            totalStudents += data[field].length;
            out.push(`Number of students in ${field}: ${data[field].length}. List: ${data[field].join(', ')}`);
          }
        }
        out.unshift(`Number of students: ${totalStudents}`);
        out.unshift('This is the list of our students');
        response.send(`${out.join('\n')}`);
      }).catch((error) => {
        response.statusCode = 500;
        response.setHeader('Content-Type', 'text/plain');
        response.send(error.message);
      });
    } else {
      response.setHeader('Content-Type', 'text/plain');
      response.status(500).send('Cannot load the database');
    }
  }

  static getAllStudentsByMajor(request, response) {
    const majors = ['CS', 'SWE'];
    if (majors.includes(request.params.major)) {
      response.statusCode = 200;
      response.setHeader('Content-Type', 'text/plain');
      if (fs.existsSync(database)) {
        readDatabase(database).then((data) => {
          const show = data[request.params.major].join(', ');
          response.send(`List: ${show}`);
        }).catch((error) => {
          response.statusCode = 500;
          response.setHeader('Content-Type', 'text/plain');
          response.send(error.message);
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
