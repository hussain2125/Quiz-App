// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD0DAxxNZgt2sjaJ245U-tVGnf0Zegnzbs",
  authDomain: "quiz-app-48eac.firebaseapp.com",
  projectId: "quiz-app-48eac",
  storageBucket: "quiz-app-48eac.firebasestorage.app",
  messagingSenderId: "716953397105",
  appId: "1:716953397105:web:874dbc0359c9358b4bb8d0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);
