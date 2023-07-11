const express = require('express');
const router = express.Router();

router.use('/users', require('./users'));
router.use('/push', require('./push'));
router.use('/pull', require('./pull'));
router.use('/legs', require('./legs'));
router.use('/cardio', require('./cardio'));
// router.use('/userWorkout', require('./userWorkout'))
router.use('/users/workouts', require('./userWorkout'));

// Progress Page
router.use('/users/goals', require('./personalGoals'));
router.use('/users/personal-records', require('./personalRecords'));
router.use('/users/progress-pictures', require('./progressPicture'));
router.use('/users/weights', require('./weightTracker'));
router.use('/users/workout-logs', require('./workoutLogs'))

module.exports = router;