// login-user.js

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const firestoreConnection = require('../firestore-connection'); // Adjust the relative path

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the user by username in the Firestore collection
    const userSnapshot = await firestoreConnection.firestore.collection('users').where('username', '==', username).get();

    // Check if the user exists
    if (userSnapshot.empty) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Retrieve the user data
    const userData = userSnapshot.docs[0].data();

    // Check if the password is correct
    const passwordMatch = await bcrypt.compare(password, userData.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Send a success message without generating a token
    res.json({ message: 'Login successful' });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
