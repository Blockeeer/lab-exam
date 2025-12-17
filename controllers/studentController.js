const Student = require('../models/Student')


exports.index = async (req, res) => {
const { search = '', sort = 'name', order = 'asc', page = 1 } = req.query
const limit = 5


const query = {
$or: [
{ name: new RegExp(search, 'i') },
{ course: new RegExp(search, 'i') }
]
}


const students = await Student.find(query)
.sort({ [sort]: order === 'asc' ? 1 : -1 })
.skip((page - 1) * limit)
.limit(limit)


const count = await Student.countDocuments(query)


res.render('index', {
students,
search,
sort,
order,
currentPage: Number(page),
totalPages: Math.ceil(count / limit)
})
}


exports.showCreate = (req, res) => res.render('create', { error: null })


exports.create = async (req, res) => {
try {
await Student.create(req.body)
res.redirect('/students')
} catch (err) {
res.render('create', { error: 'All fields are required' })
}
}


exports.show = async (req, res) => {
const student = await Student.findById(req.params.id)
res.render('show', { student })
}


exports.showEdit = async (req, res) => {
const student = await Student.findById(req.params.id)
res.render('edit', { student, error: null })
}


exports.update = async (req, res) => {
try {
await Student.findByIdAndUpdate(req.params.id, req.body)
res.redirect('/students')
} catch (err) {
const student = await Student.findById(req.params.id)
res.render('edit', { student, error: 'Invalid input' })
}
}


exports.delete = async (req, res) => {
await Student.findByIdAndDelete(req.params.id)
res.redirect('/students')
}