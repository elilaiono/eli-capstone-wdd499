const { db } = require('../db/firebase')
const admin = require('firebase-admin')

const createWeight = async (req, res) => {
    try {
      const {
        userId,
        weight,
        weightDate
      } = req.body;
  
      // Create a new document with a randomly generated ID in the 'weights' subcollection
      const weightRef = db.collection('users').doc(userId).collection('weights').doc();
  
      const weightId = weightRef.id; // Get the generated doc ID
  
    //   console.log('weightDate:', weightDate);
    //   console.log('new Date(weightDate):', new Date(weightDate));
      await weightRef.set({
        id: weightId,
        weight,
        weightDate: admin.firestore.Timestamp.fromDate(new Date(weightDate))
      });
  
      res.status(200).json({ message: 'Weight logged successfully.', id: weightId });
    } catch (error) {
      console.error('Error logging weight:', error);
      res.status(500).json({ error: 'Internal server error.' });
    }
};


const getWeightsByUser = async (req, res) => {
    try {
      const userId = req.params.userId;
      const weightSnapshot = await db.collection('users').doc(userId).collection('weights').get();
  
      if (weightSnapshot.empty) {
        return res.status(404).json({ error: 'Weight entries not found.' });
      }
  
      const weights = [];
      weightSnapshot.forEach((doc) => {
        const weightData = doc.data();
        weights.push({
          id: doc.id,
          ...weightData
        });
      });
  
      res.status(200).json(weights);
    } catch (error) {
      console.error('Error retrieving weights:', error);
      res.status(500).json({ error: 'Internal server error.' });
    }
  };
  
  const updateWeight = async (req, res) => {
    try {
      const userId = req.params.userId;
      const weightId = req.params.weightId;
  
      const weightDoc = db.collection('users').doc(userId).collection('weights').doc(weightId);
      const weight = await weightDoc.get();
  
      if (!weight.exists) {
        return res.status(404).json({ error: 'Weight entry not found.' });
      }
  
      const updatedFields = req.body;
      await weightDoc.update(updatedFields);
  
      res.status(200).json({ message: 'Weight successfully updated.' });
    } catch (error) {
      console.error('Error updating weight:', error);
      res.status(500).json({ error: 'Internal server error.' });
    }
  };
  
  const deleteWeight = async (req, res) => {
    try {
      const userId = req.params.userId;
      const weightId = req.params.weightId;
  
      const weightDoc = db.collection('users').doc(userId).collection('weights').doc(weightId);
      const weight = await weightDoc.get();
  
      if (!weight.exists) {
        return res.status(404).json({ error: 'Weight entry not found.' });
      }
  
      await weightDoc.delete();
  
      res.status(200).json({ message: 'Weight successfully deleted.' });
    } catch (error) {
      console.error('Error deleting weight:', error);
      res.status(500).json({ error: 'Internal server error.' });
    }
  };
  
  module.exports = {
    createWeight,
    getWeightsByUser,
    updateWeight,
    deleteWeight
  }