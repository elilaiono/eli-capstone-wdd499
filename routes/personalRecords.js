const express = require('express')
const router = express.Router();
const personalRecordsController = require('../controllers/personalRecords')

router.get('/:userId', personalRecordsController.getPersonalRecordsByUser)

router.post('/add', personalRecordsController.createPersonalRecord);

router.put('/:userId/:recordId', personalRecordsController.updatePersonalRecord);

router.delete('/:userId/:recordId', personalRecordsController.deletePersonalRecord)

module.exports = router