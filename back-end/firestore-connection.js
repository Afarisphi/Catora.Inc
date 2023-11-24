const Firestore = require('@google-cloud/firestore');
const path = require('path');
const { v4: uuidv4 } = require('uuid'); // Add this line at the top

class FirestoreConnection {
  constructor() {
    this.firestore = new Firestore({
      projectId: 'testing-prject-capstone',
      keyFilename: path.join(__dirname, '../my-key.json')
    });
  }

  async save(collection, data) {
    // Generate a unique ID for the document
    const docRef = this.firestore.collection(collection).doc(uuidv4());

    // Use the generated ID as the docName
    await docRef.set(data);
  }

  // Add other Firestore-related methods or configurations as needed
}

module.exports = new FirestoreConnection();
