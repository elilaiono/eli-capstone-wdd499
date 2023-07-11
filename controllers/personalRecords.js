const { db } = require('../db/firebase')
const admin = require('firebase-admin')

const createPersonalRecord = async (req, res) => {
    try {
      const {
        userId,
        title,
        previousRecord,
        newRecord,
        recordDate,
        notes
      } = req.body;
  
      // Create a new document with a randomly generated ID in the 'goals' subcollection
      const recordRef = db.collection('users').doc(userId).collection('personal-records').doc();
  
      const recordId = recordRef.id; // Get the generated doc ID
  
      await recordRef.set({
        id: recordId,
        title,
        previousRecord,
        newRecord,
        recordDate: admin.firestore.Timestamp.fromDate(new Date(recordDate)),
        // recordDate: recordDate,
        notes
      });
  
      res.status(200).json({ message: 'Personal Record created successfully.', id: recordId });
    } catch (error) {
      console.error('Error creating Personal Record:', error);
      res.status(500).json({ error: 'Internal server error.' });
    }
  };

const getPersonalRecordsByUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const recordSnapshot = await db.collection('users').doc(userId).collection('personal-records').get();

    if (recordSnapshot.empty) {
      return res.status(404).json({ error: 'Personal Record not found.' });
    }

    const records = [];
    recordSnapshot.forEach((doc) => {
      const recordData = doc.data();
      records.push({
        id: doc.id, // Add the document ID to each workout
        ...recordData
      });
    });

    res.status(200).json(records);
  } catch (error) {
    console.error('Error retrieving records:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
};

const updatePersonalRecord = async (req, res) => {
  try {
    const userId = req.params.userId;
    const recordId = req.params.recordId;

    const recordDoc = db.collection('users').doc(userId).collection('personal-records').doc(recordId);
    const record = await recordDoc.get();

    if (!record.exists) {
      return res.status(404).json({ error: 'Personal Record not found.' });
    }

    const updatedFields = req.body;
    await recordDoc.update(updatedFields);

    res.status(200).json({ message: 'Personal Record successfully updated.' });
  } catch (error) {
    console.error('Error updating Personal Record:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
};


const deletePersonalRecord = async (req, res) => {
  try {
    const userId = req.params.userId;
    const recordId = req.params.recordId;

    const recordDoc = db.collection('users').doc(userId).collection('personal-records').doc(recordId);
    const record = await recordDoc.get();

    if (!record.exists) {
      return res.status(404).json({ error: 'Personal Record not found.' });
    }

    await recordDoc.delete();

    res.status(200).json({ message: 'Personal Record successfully deleted.' });
  } catch (error) {
    console.error('Error deleting Personal Record:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
};

  module.exports = {
    createPersonalRecord,
    getPersonalRecordsByUser,
    updatePersonalRecord,
    deletePersonalRecord
  }