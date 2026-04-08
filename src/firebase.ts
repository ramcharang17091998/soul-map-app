// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBFFKeWPwfY8O_sHkyMnBZJZXHYaUhxq5c",
  authDomain: "project-f1552.firebaseapp.com",
  databaseURL: "https://project-f1552-default-rtdb.firebaseio.com",
  projectId: "project-f1552",
  storageBucket: "project-f1552.firebasestorage.app",
  messagingSenderId: "520973339051",
  appId: "1:520973339051:web:0328f38f1c4c3a7bc7aaee",
  measurementId: "G-VLSDMCBN3Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Exporting these constants allows them to be used elsewhere 
// and prevents the TypeScript "unused variable" error.
export const analytics = getAnalytics(app);
export const db = getFirestore(app);
export default app;