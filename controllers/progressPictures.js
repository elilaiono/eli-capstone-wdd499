const { db } = require('../db/firebase')
const admin = require('firebase-admin')

const uploadProgressPicture = async (req, res) => {
    try {
      const {
        userId,
        imgUrl,
        picDate,
        notes
      } = req.body;
  
      // Create a new document with a randomly generated ID in the 'goals' subcollection
      const progressPicRef = db.collection('users').doc(userId).collection('progress-pictures').doc();
  
      const progressPicId = progressPicRef.id; // Get the generated doc ID
  
      await progressPicRef.set({
        id: progressPicId,
        imgUrl,
        picDate: admin.firestore.Timestamp.fromDate(new Date(picDate)),
        notes
      });
  
      res.status(200).json({ message: 'Progress Picture uploaded successfully.', id: progressPicId });
    } catch (error) {
      console.error('Error uploading Progress Picture:', error);
      res.status(500).json({ error: 'Internal server error.' });
    }
  };

const getProgressPicByUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const progressPicSnapshot = await db.collection('users').doc(userId).collection('progress-pictures').get();

    if (progressPicSnapshot.empty) {
      return res.status(404).json({ error: 'Progress Picture not found.' });
    }

    const progressPics = [];
    progressPicSnapshot.forEach((doc) => {
      const progressPicData = doc.data();
      progressPics.push({
        id: doc.id, // Add the document ID to each workout
        ...progressPicData
      });
    });

    res.status(200).json(progressPics);
  } catch (error) {
    console.error('Error retrieving progress pictures:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
};

const updateProgressPicture = async (req, res) => {
  try {
    const userId = req.params.userId;
    const progressPicId = req.params.progressPicId;

    const progressPicDoc = db.collection('users').doc(userId).collection('progress-pictures').doc(progressPicId);
    const progressPic = await progressPicDoc.get();

    if (!progressPic.exists) {
      return res.status(404).json({ error: 'Progress Picture not found.' });
    }

    const updatedFields = req.body;
    await progressPicDoc.update(updatedFields);

    res.status(200).json({ message: 'Progress Picture successfully updated.' });
  } catch (error) {
    console.error('Error updating Progress picture:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
};


const deleteProgressPicture = async (req, res) => {
  try {
    const userId = req.params.userId;
    const progressPicId = req.params.progressPicId;

    const ProgressPicDoc = db.collection('users').doc(userId).collection('progress-pictures').doc(progressPicId);
    const progressPic = await ProgressPicDoc.get();

    if (!progressPic.exists) {
      return res.status(404).json({ error: 'Progress Picture not found.' });
    }

    await ProgressPicDoc.delete();

    res.status(200).json({ message: 'Progress Picture successfully deleted.' });
  } catch (error) {
    console.error('Error deleting Progress Picture:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
};

  module.exports = {
   uploadProgressPicture,
   getProgressPicByUser,
   updateProgressPicture,
   deleteProgressPicture
  }