import AppController from '../controllers/AppController';
import StudentsController from '../controllers/StudentsController';

const express = require('express');

const router = express.Router();

// Routes
router.get('/', (request, response) => AppController.getHomepage(request, response));
router.get('/students', (request, response) => StudentsController.getAllStudents(request, response));
router.get('/students/:major', (request, response) => StudentsController.getAllStudentsByMajor(request, response));

export default router;
