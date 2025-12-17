const express = require('express')
const router = express.Router()
const controller = require('../controllers/studentController')


router.get('/', (req, res) => res.redirect('/students'))
router.get('/students', controller.index)
router.get('/students/new', controller.showCreate)
router.post('/students', controller.create)
router.get('/students/:id', controller.show)
router.get('/students/:id/edit', controller.showEdit)
router.post('/students/:id', controller.update)
router.post('/students/:id/delete', controller.delete)


module.exports = router