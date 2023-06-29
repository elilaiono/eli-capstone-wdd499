const express = require('express')
const router = express.Router();
const pushController = require('../controllers/push')

router.get('/', pushController.getAll)
router.post('/add', pushController.createWorkout);

module.exports = router