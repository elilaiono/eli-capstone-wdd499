const express = require('express')
const router = express.Router();
const progressPictureController = require('../controllers/progressPictures')

router.get('/:userId', progressPictureController.getProgressPicByUser)

router.post('/add', progressPictureController.uploadProgressPicture);

router.put('/:userId/:progressPicId', progressPictureController.updateProgressPicture);

router.delete('/:userId/:progressPicId', progressPictureController.deleteProgressPicture)

module.exports = router