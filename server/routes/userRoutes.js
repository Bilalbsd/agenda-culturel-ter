const router = require('express').Router()
const authController = require('../controllers/authController')
const userController = require('../controllers/userController')

// authentification
router.post('/register', authController.signUp)
router.post('/login', authController.signIn)

// user CRUD
router.get('/', userController.getAllUsers)
router.get('/:id', userController.getUser)
router.put('/:id', userController.updateUser)
router.delete('/:id', userController.deleteUser)

module.exports = router