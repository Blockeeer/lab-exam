const Student = require('../models/Student');
const { validationResult } = require('express-validator');


exports.getAllStudents = async (req, res) => {
const students = await Student.find();
res.render('index', { students });
};


exports.addStudentForm = (req, res) => {
res.render('add', { errors: [], data: {} });
};


exports.createStudent = async (req, res) => {
const errors = validationResult(req);
if (!errors.isEmpty()) {
return res.render('add', { errors: errors.array(), data: req.body });
}


await Student.create(req.body);
res.redirect('/');
};


exports.editStudentForm = async (req, res) => {
const student = await Student.findById(req.params.id);
res.render('edit', { student, errors: [] });
};


exports.updateStudent = async (req, res) => {
const errors = validationResult(req);
if (!errors.isEmpty()) {
const student = await Student.findById(req.params.id);
return res.render('edit', { student, errors: errors.array() });
}


await Student.findByIdAndUpdate(req.params.id, req.body);
res.redirect('/');
};


exports.deleteStudent = async (req, res) => {
await Student.findByIdAndDelete(req.params.id);
res.redirect('/');
};