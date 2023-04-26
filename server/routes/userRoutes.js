const router = require('express').Router()
const authController = require('../controllers/authController')
const userController = require('../controllers/userController')
const multer = require('multer');

// authentification
router.post('/register', authController.signUp)
router.post('/login', authController.signIn)

// On upload les images dans le fichier uploads/
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../client/public/uploads/avatar/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

const upload = multer({ storage: storage })

// user CRUD
router.get('/', userController.getAllUsers)
router.get('/:id', userController.getUser)
router.put('/:id', upload.single('picture'), userController.updateUser)
router.delete('/:id', userController.deleteUser)

module.exports = router