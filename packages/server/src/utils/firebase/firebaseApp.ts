import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "REPLACEME",
  appId: "REPLACEME",
  authDomain: "REPLACEME",
  measurementId: "REPLACEME",
  messagingSenderId: "REPLACEME",
  projectId: "REPLACEME",
  storageBucket: "REPLACEME",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export default firebaseApp;
