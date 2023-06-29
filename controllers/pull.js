const { db } = require('../db/firebase')

const createWorkout = async (req, res) => {
    try {
      // Extract user data from the request body
      const { 
        exerciseName,
        description,
        equipment, 
        difficultyLevel, 
        duration, 
        additionalNotes } = req.body; //add back userId when ready
  
      // Create a new document with a randomly generated ID
      const newUserRef = db.collection('pull').doc(); 
      await newUserRef.set({
        exerciseName,
        description,
        equipment,
        difficultyLevel,
        duration,
        additionalNotes,
      });
  
      res.status(200).json({ message: 'workout created successfully.' });
    } catch (error) {
      console.error('Error creating workout:', error);
      res.status(500).json({ error: 'Internal server error.' });
    }
  };

  const getAll = async (req, res) => {
    try {
      const usersSnapshot = await db.collection('pull').get();
      const exercies = [];
      usersSnapshot.forEach((doc) => {
        exercies.push({
          id: doc.id,
          ...doc.data()
        });
      });
  
      res.status(200).json(exercies);
    } catch (error) {
      console.error('Error retrieving users:', error);
      res.status(500).json({ error: 'Internal server error.' });
    }
  };

  module.exports = {
    createWorkout,
    getAll
  }