const express = require('express')
const router = express.Router();
const cardioController = require('../controllers/cardio')

router.get('/', cardioController.getAll)
router.post('/add', cardioController.createWorkout);

module.exports = router