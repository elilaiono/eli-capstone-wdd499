const express = require('express');
const router = express.Router();

router.use('/users', require('./users'));
router.use('/push', require('./push'));
router.use('/pull', require('./pull'));
router.use('/legs', require('./legs'));
router.use('/cardio', require('./cardio'));
// router.use('/userWorkout', require('./userWorkout'))
router.use('/users/workouts', require('./userWorkout'))

module.exports = router;