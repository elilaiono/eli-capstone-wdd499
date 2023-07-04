const { db } = require('../db/firebase')

const createWorkout = async (req, res) => {
  try {
    const {
      type,
      exerciseName,
      description,
      equipment, 
      difficultyLevel, 
      duration, 
      additionalNotes,
      imgUrl,
      userId 
    } = req.body;

    // Create a new document with a randomly generated ID in the 'workouts' subcollection
    const newWorkoutRef = db.collection('users').doc(userId).collection('workouts').doc();

    const workoutId = newWorkoutRef.id; // Get the generated doc ID

    await newWorkoutRef.set({
      id: workoutId,
      type,
      exerciseName,
      description,
      equipment,
      difficultyLevel,
      duration,
      additionalNotes,
      imgUrl
    });

    res.status(200).json({ message: 'Workout created successfully.', id: workoutId });
  } catch (error) {
    console.error('Error creating workout:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
};

const getWorkoutsByUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const workoutsSnapshot = await db.collection('users').doc(userId).collection('workouts').get();

    if (workoutsSnapshot.empty) {
      return res.status(404).json({ error: 'Workouts not found.' });
    }

    const workouts = [];
    workoutsSnapshot.forEach((doc) => {
      const workoutData = doc.data();
      workouts.push({
        id: doc.id, // Add the document ID to each workout
        ...workoutData
      });
    });

    res.status(200).json(workouts);
  } catch (error) {
    console.error('Error retrieving workouts:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
};

const updateWorkout = async (req, res) => {
  try {
    const userId = req.params.userId;
    const workoutId = req.params.workoutId;

    const workoutDoc = db.collection('users').doc(userId).collection('workouts').doc(workoutId);
    const workout = await workoutDoc.get();

    if (!workout.exists) {
      return res.status(404).json({ error: 'Workout not found.' });
    }

    const updatedFields = req.body;
    await workoutDoc.update(updatedFields);

    res.status(200).json({ message: 'Workout successfully updated.' });
  } catch (error) {
    console.error('Error updating workout:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
};


const deleteWorkout = async (req, res) => {
  try {
    const userId = req.params.userId;
    const workoutId = req.params.workoutId;

    const workoutDoc = db.collection('users').doc(userId).collection('workouts').doc(workoutId);
    const workout = await workoutDoc.get();

    if (!workout.exists) {
      return res.status(404).json({ error: 'Workout not found.' });
    }

    await workoutDoc.delete();

    res.status(200).json({ message: 'Workout successfully deleted.' });
  } catch (error) {
    console.error('Error deleting workout:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
};



  module.exports = {
    createWorkout,
    getWorkoutsByUser,
    updateWorkout,
    deleteWorkout
  }