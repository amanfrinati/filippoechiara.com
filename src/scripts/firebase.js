const firebase = require("firebase/app");

const firebaseConfig = {
  apiKey: "AIzaSyBPD4PuXZGxSOe2KrRdc7iQ45yQ1ni96WM",
  authDomain: "wedding-list-e14d1.firebaseapp.com",
  databaseURL: "https://wedding-list-e14d1.firebaseio.com",
  projectId: "wedding-list-e14d1",
  storageBucket: "wedding-list-e14d1.appspot.com",
  messagingSenderId: "51632127564",
  appId: "1:51632127564:web:c5dc8a54e077d99a7bfee9"
};

firebase.initializeApp(firebaseConfig);
module.exports = firebase;
