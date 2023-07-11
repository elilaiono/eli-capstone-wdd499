const { db } = require('../db/firebase')
const admin = require('firebase-admin')

const createWorkoutLog = async (req, res) => {
    try {
      const {
        userId,
        workout,
        workoutDate,
        notes
      } = req.body;
  
      const workoutLogRef = db.collection('users').doc(userId).collection('workout-logs').doc();
      const workoutLogId = workoutLogRef.id;
  
      await workoutLogRef.set({
        id: workoutLogId,
        workout,
        workoutDate: admin.firestore.Timestamp.fromDate(new Date(workoutDate)),
        notes
      });
  
      res.status(200).json({ message: 'Workout logged successfully.', id: workoutLogId });
    } catch (error) {
      console.error('Error logging workout:', error);
      res.status(500).json({ error: 'Internal server error.' });
    }
};

const getWorkoutLogsByUser = async (req, res) => {
    try {
      const userId = req.params.userId;
      const workoutLogSnapshot = await db.collection('users').doc(userId).collection('workout-logs').get();
  
      if (workoutLogSnapshot.empty) {
        return res.status(404).json({ error: 'Workout logs not found.' });
      }
  
      const workoutLogs = [];
      workoutLogSnapshot.forEach((doc) => {
        const workoutLogData = doc.data();
        workoutLogs.push({
          id: doc.id,
          ...workoutLogData
        });
      });
  
      res.status(200).json(workoutLogs);
    } catch (error) {
      console.error('Error retrieving workout logs:', error);
      res.status(500).json({ error: 'Internal server error.' });
    }
};

const updateWorkoutLog = async (req, res) => {
    try {
      const userId = req.params.userId;
      const workoutLogId = req.params.workoutLogId;
  
      const workoutLogDoc = db.collection('users').doc(userId).collection('workout-logs').doc(workoutLogId);
      const workoutLog = await workoutLogDoc.get();
  
      if (!workoutLog.exists) {
        return res.status(404).json({ error: 'Workout log not found.' });
      }
  
      const updatedFields = req.body;
      await workoutLogDoc.update(updatedFields);
  
      res.status(200).json({ message: 'Workout log successfully updated.' });
    } catch (error) {
      console.error('Error updating workout log:', error);
      res.status(500).json({ error: 'Internal server error.' });
    }
};

const deleteWorkoutLog = async (req, res) => {
    try {
      const userId = req.params.userId;
      const workoutLogId = req.params.workoutLogId;
  
      const workoutLogDoc = db.collection('users').doc(userId).collection('workout-logs').doc(workoutLogId);
      const workoutLog = await workoutLogDoc.get();
  
      if (!workoutLog.exists) {
        return res.status(404).json({ error: 'Workout log not found.' });
      }
  
      await workoutLogDoc.delete();
  
      res.status(200).json({ message: 'Workout log successfully deleted.' });
    } catch (error) {
      console.error('Error deleting workout log:', error);
      res.status(500).json({ error: 'Internal server error.' });
    }
};

module.exports = {
    createWorkoutLog,
    getWorkoutLogsByUser,
    updateWorkoutLog,
    deleteWorkoutLog
}
