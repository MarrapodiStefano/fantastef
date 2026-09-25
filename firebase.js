// FantaStef - Firebase
// Configurazione pubblica dell'app Web Firebase.
// La protezione dei dati avviene tramite Firebase Authentication e Firestore Security Rules.

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.17.0/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.17.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.17.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDf6p2cVy-WsJIrG2aePmJeuv0nTRyQM64",
  authDomain: "fantastef-24e1d.firebaseapp.com",
  projectId: "fantastef-24e1d",
  storageBucket: "fantastef-24e1d.firebasestorage.app",
  messagingSenderId: "1016760740705",
  appId: "1:1016760740705:web:6f7701aeb787216b0b320",
  measurementId: "G-SPG1KHVNM0"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

export {
  app,
  auth,
  db,
  googleProvider,
  signInWithPopup,
  signInWithRedirect,
  signOut,
  onAuthStateChanged
};
