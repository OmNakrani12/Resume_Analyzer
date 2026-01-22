// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDiuGtr4Rr2ShVtLYeJt7q9oLYgA0jmyyU",
  authDomain: "resume-analyzer-b7199.firebaseapp.com",
  projectId: "resume-analyzer-b7199",
  storageBucket: "resume-analyzer-b7199.firebasestorage.app",
  messagingSenderId: "602207671287",
  appId: "1:602207671287:web:84c7f2775dbc3e9fc8d4f2",
  databaseURL: "https://resume-analyzer-b7199-default-rtdb.asia-southeast1.firebasedatabase.app/",
  measurementId: "G-9RKHLQ8DGT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const rtdb = getDatabase(app);