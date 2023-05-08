import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";
const geofirestore = require("geofirestore");

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyAZdkMXohfAmV90VwfeYlVSSzQGqIYFYDk",
  authDomain: "gymmatecsc45600.firebaseapp.com",
  projectId: "gymmatecsc45600",
  storageBucket: "gymmatecsc45600.appspot.com",
  messagingSenderId: "978649796620",
  appId: "1:978649796620:web:e8756302c4d76788a71e29",
  measurementId: "G-YF3EB03XZX",
};

// Use this to initialize the firebase App
const firebaseApp = firebase.initializeApp(firebaseConfig);

// Use these for db & auth
const database = firebaseApp.firestore();
const GeoFirestore = geofirestore.initializeApp(database);
const geocollection = GeoFirestore.collection("users");
const auth = firebase.auth();
const storage = firebase.storage(); // add this line to initialize storage

const provider = new firebase.auth.GoogleAuthProvider();

export { auth, database, provider, storage, GeoFirestore, geocollection };
