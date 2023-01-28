const router = require('express').Router()
const eventController = require('../controllers/eventController')
const multer = require('multer');


// On upload les images dans le fichier uploads/
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../client/public/uploads/')
  },
  filename: function (req, file, cb) {
      cb(null, file.originalname)
}
})

const upload = multer({ storage: storage })

// event CRUD
router.post('/', upload.single('image'), eventController.createEvent)
router.get('/', eventController.getAllEvents)
router.get('/:id', eventController.getEvent)
router.put('/:id', eventController.updateEvent)
router.delete('/:id', eventController.deleteEvent)

module.exports = router