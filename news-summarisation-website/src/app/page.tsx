'use client'
import 'firebase/compat/firestore';
import React, { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import firebase from "firebase/compat/app"; 
import { collection, addDoc } from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "${process.env.FIREBASE_API_KEY}",
  authDomain: "${process.env.REACT_APP_AUTH_DOMAIN}",
  projectId: "news-summarization-website",
  storageBucket: "news-summarization-website.appspot.com",
  messagingSenderId: "725895260432",
  appId: "1:725895260432:web:2def6b396d852c82dc9d95"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


export default function LoginPage() {
  const [user, setUser] = useState({ un: '', pw: '' });
  let router = useRouter();

  // Function to handle form submission.
  async function submit() {
    if (user.un === "" || user.pw === "") return;
    try {
      await addDoc(collection(db, "users"), { username: user.un, password: user.pw });
      alert("User created successfully!");
      console.log(`Document added`);
      router.push("/");
    } catch (error) {
      alert("Error creating user: " + error.message);
    }
  }

  return (
    <div className="container">
      <h1>Sign up</h1>
      <label htmlFor="username">Username: </label>
      <input type="text" id="username" name="username" value={user.un} onChange={e => setUser(prevState => ({ ...prevState, un: e.target.value }))} /><br/>
      <label htmlFor="password">Password: </label>
      <input type="password" name="password" id="password" value={user.pw} onChange={e => setUser(prevState => ({ ...prevState, pw: e.target.value }))} /><br/>
      <button onClick={submit}>Sign up</button>
    </div>
  );
}