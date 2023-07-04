const { db } = require('../db/firebase')
const { getAuth } = require('firebase-admin/auth');

const createUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const auth = getAuth();

    const userCredential = await auth.createUser({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    });

    const userId = userCredential.uid;

    await db.collection('users').doc(userId).set({
      userId: userId,
      email: email,
      firstName: firstName,
      lastName: lastName,
    });

    res.status(200).json({ message: 'User created successfully.' });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
};

  const getAll = async (req, res) => {
    try {
      const usersSnapshot = await db.collection('users').get();
      const users = [];
      usersSnapshot.forEach((doc) => {
        users.push({
          id: doc.id,
          ...doc.data()
        });
      });
  
      res.status(200).json(users);
      console.log('ur a hoe');
    } catch (error) {
      console.error('Error retrieving users:', error);
      res.status(500).json({ error: 'Internal server error.' });
    }
  };

  const getById = async (req, res) => {
    try {
      const userId = req.params.id;
      const userDoc = await db.collection('users').doc(userId).get();
      // console.log('user doc:', userDoc)

  
      if (!userDoc.exists) {
        return res.status(404).json({ error: 'User not found.' });
      }
  
      const userData = userDoc.data();
      const user = {
        id: userDoc.id,
        ...userData
      };
  
      res.status(200).json(user);
    } catch (error) {
      console.error('Error retrieving user:', error);
      res.status(500).json({ error: 'Internal server error.' });
    }
  };

  module.exports = { 
    createUser,
    getAll,
    getById,
  }
    
    
      