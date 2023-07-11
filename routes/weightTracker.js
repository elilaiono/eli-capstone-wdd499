const express = require('express')
const router = express.Router();
const weightTrackerController = require('../controllers/weightTracker')

router.get('/:userId', weightTrackerController.getWeightsByUser)

router.post('/add', weightTrackerController.createWeight);

router.put('/:userId/:weightId', weightTrackerController.updateWeight);

router.delete('/:userId/:weightId', weightTrackerController.deleteWeight)

module.exports = router