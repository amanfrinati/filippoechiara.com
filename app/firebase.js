import firebaseConfig from "./firebaseConfig";
const firebase = require("firebase/app");

firebase.initializeApp(firebaseConfig);

export default firebase;
