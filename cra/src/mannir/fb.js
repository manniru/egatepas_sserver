import firebase from 'firebase'
 
var config = {
    apiKey: "AIzaSyDWuN-cax6Byfo03cgK9S-yOicRHRaArok",
    authDomain: "egatepas.firebaseapp.com",
    databaseURL: "https://egatepas.firebaseio.com",
    projectId: "egatepas",
    storageBucket: "egatepas.appspot.com",
    messagingSenderId: "867652815500"
  };
var fb = firebase.initializeApp(config);
 
export default fb;