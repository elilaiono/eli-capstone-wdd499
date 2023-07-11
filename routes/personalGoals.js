const express = require('express')
const router = express.Router();
const goalController = require('../controllers/goals')

router.get('/:userId', goalController.getGoalsByUser)

router.post('/add', goalController.createGoal);

router.put('/:userId/:goalId', goalController.updateGoal);

router.delete('/:userId/:goalId', goalController.deleteGoal)

module.exports = router