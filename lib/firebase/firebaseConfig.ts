// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBVQUcue5DSpf9npjSBKfSVzBhQrDGuILs",
  authDomain: "project-337f8.firebaseapp.com",
  projectId: "project-337f8",
  storageBucket: "project-337f8.firebasestorage.app",
  messagingSenderId: "406446196813",
  appId: "1:406446196813:web:e0247a77c60d86dd2ab404",
  measurementId: "G-B58Q0GBQB9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
