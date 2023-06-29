const express = require('express')
const router = express.Router();
const pullController = require('../controllers/pull')

router.get('/', pullController.getAll)
router.post('/add', pullController.createWorkout);

module.exports = router