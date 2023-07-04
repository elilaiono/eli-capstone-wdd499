const firebase = require('firebase-admin');
const serviceAccount = require('serviceAccount.js');

// firebase.initializeApp(firebaseConfig) 
firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount)
})

const db = firebase.firestore()
const User = db.collection("users");


module.exports = User;