// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore/lite'
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAXsA2gw7zYVpQswFFFMDqjVSh1kISejpE",
  authDomain: "my-travels-9cf17.firebaseapp.com",
  projectId: "my-travels-9cf17",
  storageBucket: "my-travels-9cf17.appspot.com",
  messagingSenderId: "517105542891",
  appId: "1:517105542891:web:43dfc84ac9afd541d180ae",
  measurementId: "G-WW8KSTCF72"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);

export {
  db,
  analytics,
  auth
}