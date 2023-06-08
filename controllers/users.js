const admin = require('firebase-admin')
const { db } = require('../db/firebase')

const registerUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userRecord = await admin.auth().createUser({
            email,
            password
        });

        await db.collection('users').doc(userRecord.uid).set({
            email,
            password
        });

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error during user registration:', error);
        res.status(500).json({ message: 'User registration failed' });
        
    }
}

module.exports = { registerUser };