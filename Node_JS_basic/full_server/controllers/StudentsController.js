import readDatabase from "../utils";
import * as fs from 'fs';

const database = process.argv[2];
export class StudentsController {
  static getAllStudents(request, response) {
    if (fs.existsSync(database)) {
      readDatabase(database).then((data) => {
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
        response.setHeader('Content-Type', 'text/plain');
        response.status(200).send(`${out.join('\n')}`);
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
