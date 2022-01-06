import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-analytics.js";

// TODO: Replace the following with your app's Firebase project configuration
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCiYf__dK_2gD61QGmNBw1LJaj_-S2PzEM",
    authDomain: "super-qr-38b86.firebaseapp.com",
    projectId: "super-qr-38b86",
    storageBucket: "super-qr-38b86.appspot.com",
    messagingSenderId: "783046485607",
    appId: "1:783046485607:web:91f7d32e0c961a6f4f96c2",
    measurementId: "G-RR8R4J6SEQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);