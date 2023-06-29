const { db } = require('../db/firebase')

const createWorkout = async (req, res) => {
    try {
      // Extract user data from the request body
      const {
        type,
        exerciseName,
        description,
        equipment, 
        difficultyLevel, 
        duration, 
        additionalNotes,
        userId } = req.body; //add back userId when ready
  
      // Create a new document with a randomly generated ID
      const newUserRef = db.collection('userWorkout').doc(userId); 
      await newUserRef.set({
        type,
        exerciseName,
        description,
        equipment,
        difficultyLevel,
        duration,
        additionalNotes,
        userId
      });
  
      res.status(200).json({ message: 'workout created successfully.' });
    } catch (error) {
      console.error('Error creating workout:', error);
      res.status(500).json({ error: 'Internal server error.' });
    }
  };

  const getAll = async (req, res) => {
    try {
      const usersSnapshot = await db.collection('userWorkout').get();
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

  const getById = async (req, res) => {
    try {
      const userId = req.params.id;
      console.log('userId:', userId);
  
      const userWorkoutsSnapshot = await db.collection('userWorkout').where('userId', '==', userId).get();
      console.log('user workouts:', userWorkoutsSnapshot);
  
      if (userWorkoutsSnapshot.empty) {
        return res.status(404).json({ error: 'Workouts not found.' });
      }
  
      const userWorkouts = [];
      userWorkoutsSnapshot.forEach((doc) => {
        const workoutData = doc.data();
        const workout = {
          id: doc.id,
          ...workoutData
        };
        userWorkouts.push(workout);
      });
  
      res.status(200).json(userWorkouts);
    } catch (error) {
      console.error('Error retrieving user workouts:', error);
      res.status(500).json({ error: 'Internal server error.' });
    }
  };
  

  module.exports = {
    createWorkout,
    getAll,
    getById
  }