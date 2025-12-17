const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const controller = require('../controllers/studentControllers');


const studentValidation = [
body('name').notEmpty().withMessage('Name is required'),
body('email').isEmail().withMessage('Valid email required'),
body('age').isInt({ min: 1 }).withMessage('Age must be a number'),
body('course').notEmpty().withMessage('Course is required')
];


router.get('/', controller.getAllStudents);
router.get('/add', controller.addStudentForm);
router.post('/add', studentValidation, controller.createStudent);
router.get('/edit/:id', controller.editStudentForm);
router.post('/edit/:id', studentValidation, controller.updateStudent);
router.get('/delete/:id', controller.deleteStudent);


module.exports = router;