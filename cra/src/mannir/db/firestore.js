// import firebase from 'firebase'
 
// var config = {
//     apiKey: "AIzaSyDWuN-cax6Byfo03cgK9S-yOicRHRaArok",
//     authDomain: "egatepas.firebaseapp.com",
//     databaseURL: "https://egatepas.firebaseio.com",
//     projectId: "egatepas",
//     storageBucket: "egatepas.appspot.com",
//     messagingSenderId: "867652815500"
// };

// var fb = firebase.initializeApp(config);

// // const st = firebase.storage();

const firebase = require("firebase");
// require("firebase/firestore");
firebase.initializeApp({
    apiKey: "AIzaSyDWuN-cax6Byfo03cgK9S-yOicRHRaArok",
    authDomain: "egatepas.firebaseapp.com",
    databaseURL: "https://egatepas.firebaseio.com",
    projectId: "egatepas",
    storageBucket: "egatepas.appspot.com",
    messagingSenderId: "867652815500"
});
  
var db = firebase.firestore();

const addFS = (data) => {
    db.collection("users").add({
        first: "Ada",
        last: "Lovelace",
        born: 1815
    })
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
}

export default addFS;


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

const test1 = () => {
    db.collection("cities").where("state", "==", "CA")
  .onSnapshot({ includeMetadataChanges: true }, function(snapshot) {
      snapshot.docChanges().forEach(function(change) {
          if (change.type === "added") {
              console.log("New city: ", change.doc.data());
          }

          var source = snapshot.metadata.fromCache ? "local cache" : "server";
          console.log("Data came from " + source);
      });
  });
}

 
// export default fb;