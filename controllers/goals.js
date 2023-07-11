const { db } = require('../db/firebase')
const admin = require('firebase-admin')

const createGoal = async (req, res) => {
    try {
      const {
        userId,
        title,
        description,
        startDate,
        targetDate,
        progress,
        completed,
        notes
      } = req.body;
  
      // Create a new document with a randomly generated ID in the 'goals' subcollection
      const newGoalRef = db.collection('users').doc(userId).collection('goals').doc();
  
      const goalId = newGoalRef.id; // Get the generated doc ID
  
      await newGoalRef.set({
        id: goalId,
        title,
        description,
        startDate: admin.firestore.Timestamp.fromDate(new Date(startDate)),
        targetDate: admin.firestore.Timestamp.fromDate(new Date(targetDate)),
        progress,
        completed,
        notes
      });
  
      res.status(200).json({ message: 'Goal created successfully.', id: goalId });
    } catch (error) {
      console.error('Error creating goal:', error);
      res.status(500).json({ error: 'Internal server error.' });
    }
  };

const getGoalsByUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const goalSnapshot = await db.collection('users').doc(userId).collection('goals').get();

    if (goalSnapshot.empty) {
      return res.status(404).json({ error: 'Workouts not found.' });
    }

    const goals = [];
    goalSnapshot.forEach((doc) => {
      const goalData = doc.data();
      goals.push({
        id: doc.id, // Add the document ID to each workout
        ...goalData
      });
    });

    res.status(200).json(goals);
  } catch (error) {
    console.error('Error retrieving goals:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
};

const updateGoal = async (req, res) => {
  try {
    const userId = req.params.userId;
    const goalId = req.params.goalId;

    const goalDoc = db.collection('users').doc(userId).collection('goals').doc(goalId);
    const goal = await goalDoc.get();

    if (!goal.exists) {
      return res.status(404).json({ error: 'Goal not found.' });
    }

    const updatedFields = req.body;
    await goalDoc.update(updatedFields);

    res.status(200).json({ message: 'Goal successfully updated.' });
  } catch (error) {
    console.error('Error updating Goal:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
};


const deleteGoal = async (req, res) => {
  try {
    const userId = req.params.userId;
    const goalId = req.params.goalId;

    const goalDoc = db.collection('users').doc(userId).collection('goals').doc(goalId);
    const goal = await goalDoc.get();

    if (!goal.exists) {
      return res.status(404).json({ error: 'Goal not found.' });
    }

    await goalDoc.delete();

    res.status(200).json({ message: 'Goal successfully deleted.' });
  } catch (error) {
    console.error('Error deleting goal:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
};

  module.exports = {
    createGoal,
    getGoalsByUser,
    updateGoal,
    deleteGoal
  }