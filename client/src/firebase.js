// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "mern-blog-39d26.firebaseapp.com",
    projectId: "mern-blog-39d26",
    storageBucket: "mern-blog-39d26.appspot.com",
    messagingSenderId: "853374433062",
    appId: "1:853374433062:web:91975925b4d18c622db3e7",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
