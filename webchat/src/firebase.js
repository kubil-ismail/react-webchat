// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBuie2rXE0KGDX6CErrNsvqiaQU8s8m0_s",
  authDomain: "react-webchat-d1f05.firebaseapp.com",
  projectId: "react-webchat-d1f05",
  storageBucket: "react-webchat-d1f05.appspot.com",
  messagingSenderId: "402798180842",
  appId: "1:402798180842:web:b3b0713dece228651bda93",
  measurementId: "G-H03LY5R678",
};

// Initialize Firebase
export const app = firebase.initializeApp(firebaseConfig);
