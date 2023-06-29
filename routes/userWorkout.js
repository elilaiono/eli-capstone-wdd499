const express = require('express')
const router = express.Router();
const userWorkoutController = require('../controllers/userWorkout')

router.get('/', userWorkoutController.getAll)
router.get('/:id', userWorkoutController.getById)
router.post('/add', userWorkoutController.createWorkout);

module.exports = router