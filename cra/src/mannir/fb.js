import firebase from 'firebase'
 
var config = {
    apiKey: "AIzaSyDWuN-cax6Byfo03cgK9S-yOicRHRaArok",
    authDomain: "egatepas.firebaseapp.com",
    databaseURL: "https://egatepas.firebaseio.com",
    projectId: "egatepas",
    storageBucket: "egatepas.appspot.com",
    messagingSenderId: "867652815500"
  };
const fb = firebase.initializeApp(config);
const db = firebase.firestore();


firebase.firestore().enablePersistence()
  .catch(function(err) {
      if (err.code == 'failed-precondition') {
          // Multiple tabs open, persistence can only be enabled
          // in one tab at a a time.
          // ...
          console.log('failed-precondition')
      } else if (err.code == 'unimplemented') {
          // The current browser does not support all of the
          // features required to enable persistence
          // ...
          console.log('The current browser does not support')
      }
});

// const st = firebase.storage();

// export default fb;
export {fb, db};