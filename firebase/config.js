// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Authentication
import { getAuth } from "@firebase/auth";

// Firestore
import { getFirestore } from "@firebase/firestore";

// Storage
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCI9WbbJ564C2QGRouoUJQXzEX1n7-5nDE",
    authDomain: "shopix-673af.firebaseapp.com",
    projectId: "shopix-673af",
    storageBucket: "shopix-673af.appspot.com",
    messagingSenderId: "408693223069",
    appId: "1:408693223069:web:fa6c8eed711a7bc25b2e74"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Authentication
export const auth = getAuth(app)

// Firestore
export const db = getFirestore(app)

// Storage
export const storageDB = getStorage(app)

