// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDc45NxbnZx1ntibrbj0zYReoj6521oNRQ",
  authDomain: "adminuser-86ea5.firebaseapp.com",
  projectId: "adminuser-86ea5",
  storageBucket: "adminuser-86ea5.appspot.com",
  messagingSenderId: "207632943024",
  appId: "1:207632943024:web:ffbf1d3660bfbcf31fb875",
  measurementId: "G-KE1CX5YM1Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export {auth, db};
