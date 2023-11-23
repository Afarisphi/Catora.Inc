const FirestoreClient = require('./firestoreClient');

const burgerHut = {
  docName: 'burgerHut',
  location: 'LA'
}

const save = async () => {
  await FirestoreClient.save('restaurant', burgerHut);
}

save();