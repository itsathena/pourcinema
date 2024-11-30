// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAV52P42Sf5ZvhC-0uHjxqZBdBU9K4psK8",
  authDomain: "pourcinema-5cae6.firebaseapp.com",
  databaseURL: "https://pourcinema-5cae6-default-rtdb.firebaseio.com",
  projectId: "pourcinema-5cae6",
  storageBucket: "pourcinema-5cae6.firebasestorage.app",
  messagingSenderId: "222534364746",
  appId: "1:222534364746:web:44d70f43f259f426e2c0b3",
  measurementId: "G-QXVPLFWHVN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);