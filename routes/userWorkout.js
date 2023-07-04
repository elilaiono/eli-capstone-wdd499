const express = require('express')
const router = express.Router();
const userWorkoutController = require('../controllers/userWorkout')

router.get('/:userId', userWorkoutController.getWorkoutsByUser);

router.put('/:userId/:workoutId', userWorkoutController.updateWorkout);

router.post('/add', userWorkoutController.createWorkout);

router.delete('/:userId/:workoutId', userWorkoutController.deleteWorkout);

module.exports = router