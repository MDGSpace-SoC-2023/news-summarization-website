import firebase from "firebase/compat/app";
import "firebase/auth"
import "firebase/firestore"
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "${process.env.FIREBASE_API_KEY}",
  authDomain: "${process.env.news-summarization-website.firebaseapp.com}",
  projectId: "news-summarization-website",
  storageBucket: "news-summarization-website.appspot.com",
  messagingSenderId: "725895260432",
  appId: "1:725895260432:web:2def6b396d852c82dc9d95"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
