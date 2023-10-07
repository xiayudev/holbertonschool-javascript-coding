const fs = require('fs');

function countStudents(fileName) {
  if (fs.existsSync(fileName)) {
    fs.readFile(fileName, (error, data) => {
      if (error) {
        console.log(error);
      } else {
        let students = data.toString().split('\n').map((elem) => elem.split(','));
        students = students.slice(1, students.length - 1); // Array of array of students
        const fields = {}; // All fields availables
        students.forEach((student) => {
          fields[student[student.length - 1]] = (fields[student[student.length - 1]] || 0) + 1;
        });

        console.log(`Number of students: ${students.length}`);
        for (const field in fields) {
          if (field) {
            // Filter just the firts names of the students
            const result = students
              .filter((std) => std[std.length - 1] === field)
              .map((el) => el[0]);
            console.log(`Number of students in ${field}: ${result.length}. List: ${result.join(', ')}`);
          }
        }
      }
    });
  } else {
    throw new Error('Cannot load the database');
  }
}

module.exports = countStudents;
