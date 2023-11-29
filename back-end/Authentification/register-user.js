const express = require('express');
const router = express.Router();
const firestoreConnection = require('../firestore-connection');
const bcrypt = require('bcrypt');

router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if the username is already taken
    const userSnapshot = await firestoreConnection.firestore.collection('users').where('username', '==', username).get();

    if (!userSnapshot.empty) {
      return res.status(400).json({ error: 'Username is already taken' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user object
    const newUser = {
      username,
      password: hashedPassword,
    };

    // Save the user to Firestore
    await firestoreConnection.save('users', newUser);

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
