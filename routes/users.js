const express = require('express');
const router = express.Router();

const userController = require('../controllers/users');

router.post('/register', userController.registerUser);

module.exports = router;