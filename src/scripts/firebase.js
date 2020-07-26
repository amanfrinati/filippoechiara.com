import firebaseConfig from "./firebaseConfig";
const firebase = require("firebase/app");

firebase.initializeApp(firebaseConfig);
module.exports = firebase;
