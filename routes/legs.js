const express = require('express')
const router = express.Router();
const legsController = require('../controllers/legs')

router.get('/', legsController.getAll)
router.post('/add', legsController.createWorkout);

module.exports = router