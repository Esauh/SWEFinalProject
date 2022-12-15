// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAt6N1fk1DUWREw8owmNtbAfG30nHp7cCg",
  authDomain: "trophyroad-80b35.firebaseapp.com",
  projectId: "trophyroad-80b35",
  storageBucket: "trophyroad-80b35.appspot.com",
  messagingSenderId: "61765250507",
  appId: "1:61765250507:web:215b29d74c0f37ee19da4e"
};

// Initialize Firebase
initializeApp(firebaseConfig);

const db = getFirestore();
const auth = getAuth();

export { db, auth };