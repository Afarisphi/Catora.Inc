// firebase-config.js
const admin = require('firebase-admin');
const serviceAccount = require('../my-key.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'gs://catora_gallery',
  // Add other configurations if needed
});

module.exports = admin;
