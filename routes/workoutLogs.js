const express = require('express');
const router = express.Router();
const workoutLogController = require('../controllers/workoutLog');

router.post('/add', workoutLogController.createWorkoutLog);

router.get('/:userId', workoutLogController.getWorkoutLogsByUser);

router.put('/:userId/:workoutLogId', workoutLogController.updateWorkoutLog);

router.delete('/:userId/:workoutLogId', workoutLogController.deleteWorkoutLog);

module.exports = router;
