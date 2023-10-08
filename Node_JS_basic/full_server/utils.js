import * as fs from 'fs';

export default function readDatabase(filePath) {
  return new Promise((resolve, reject) => {
    if (fs.existsSync(filePath)) {
      fs.readFile(filePath, (error, data) => {
        if (error) {
          reject(error);
        } else {
          const studentsByMajor = {};
          let students = data.toString().split('\n').map((elem) => elem.split(','));
          students = students.slice(1, students.length - 1); // Array of array of students
          const fields = {}; // All fields availables
          students.forEach((student) => {
            fields[student[student.length - 1]] = (fields[student[student.length - 1]] || 0) + 1;
          });
          for (const field in fields) {
            if (field) {
              // Filter just the firts names of the students
              const result = students
                .filter((std) => std[std.length - 1] === field)
                .map((el) => el[0]);
              studentsByMajor[field] = result;
            }
          }
          resolve(studentsByMajor);
        }
      });
    } else {
      throw new Error('Cannot load the database');
    }
  });
}
