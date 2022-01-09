// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDgFyCLY7sk5WcXp6SikpWQ_o5lvMqtz-0",
  authDomain: "code-creator-1.firebaseapp.com",
  projectId: "code-creator-1",
  storageBucket: "code-creator-1.appspot.com",
  messagingSenderId: "267716616595",
  appId: "1:267716616595:web:6083f8d6e4ccf7c5458866",
  measurementId: "G-JVME6NY3C3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);